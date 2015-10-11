(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/behaviors/api.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - API                                                 //
 * http://github.com/semantic-org/semantic-ui/                         //
 *                                                                     //
 *                                                                     //
 * Copyright 2015 Contributors                                         //
 * Released under the MIT license                                      //
 * http://opensource.org/licenses/MIT                                  //
 *                                                                     //
 */                                                                    //
                                                                       //
;(function ($, window, document, undefined) {                          // 16
                                                                       //
  "use strict";                                                        // 18
                                                                       //
  $.api = $.fn.api = function (parameters) {                           // 20
                                                                       //
    var                                                                // 22
    // use window context if none specified                            //
    $allModules = $.isFunction(this) ? $(window) : $(this),            // 24
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 38
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.api.settings, parameters) : $.extend({}, $.fn.api.settings),
                                                                       //
      // internal aliases                                              //
      namespace = settings.namespace,                                  // 46
          metadata = settings.metadata,                                //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          className = settings.className,                              //
                                                                       //
      // define namespaces for modules                                 //
      eventNamespace = '.' + namespace,                                // 53
          moduleNamespace = 'module-' + namespace,                     //
                                                                       //
      // element that creates request                                  //
      $module = $(this),                                               // 57
          $form = $module.closest(selector.form),                      //
                                                                       //
      // context used for state                                        //
      $context = settings.stateContext ? $(settings.stateContext) : $module,
                                                                       //
      // request details                                               //
      ajaxSettings,                                                    // 66
          requestSettings,                                             //
          url,                                                         //
          data,                                                        //
          requestStartTime,                                            //
                                                                       //
      // standard module                                               //
      element = this,                                                  // 73
          context = $context[0],                                       //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 79
                                                                       //
        initialize: function () {                                      // 81
          if (!methodInvoked) {                                        // 82
            module.bind.events();                                      // 83
          }                                                            //
          module.instantiate();                                        // 85
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 88
          module.verbose('Storing instance of module', module);        // 89
          instance = module;                                           // 90
          $module.data(moduleNamespace, instance);                     // 91
        },                                                             //
                                                                       //
        destroy: function () {                                         // 96
          module.verbose('Destroying previous module for', element);   // 97
          $module.removeData(moduleNamespace).off(eventNamespace);     // 98
        },                                                             //
                                                                       //
        bind: {                                                        // 104
          events: function () {                                        // 105
            var triggerEvent = module.get.event();                     // 106
            if (triggerEvent) {                                        // 109
              module.verbose('Attaching API events to element', triggerEvent);
              $module.on(triggerEvent + eventNamespace, module.event.trigger);
            } else if (settings.on == 'now') {                         //
              module.debug('Querying API endpoint immediately');       // 116
              module.query();                                          // 117
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        decode: {                                                      // 122
          json: function (response) {                                  // 123
            if (response !== undefined && typeof response == 'string') {
              try {                                                    // 125
                response = JSON.parse(response);                       // 126
              } catch (e) {                                            //
                // isnt json string                                    //
              }                                                        //
            }                                                          //
            return response;                                           // 132
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 136
          cachedResponse: function (url) {                             // 137
            var response;                                              // 138
            if (window.Storage === undefined) {                        // 141
              module.error(error.noStorage);                           // 142
              return;                                                  // 143
            }                                                          //
            response = sessionStorage.getItem(url);                    // 145
            module.debug('Using cached response', url, response);      // 146
            response = module.decode.json(response);                   // 147
            return false;                                              // 148
          }                                                            //
        },                                                             //
        write: {                                                       // 151
          cachedResponse: function (url, response) {                   // 152
            if (response && response === '') {                         // 153
              module.debug('Response empty, not caching', response);   // 154
              return;                                                  // 155
            }                                                          //
            if (window.Storage === undefined) {                        // 157
              module.error(error.noStorage);                           // 158
              return;                                                  // 159
            }                                                          //
            if ($.isPlainObject(response)) {                           // 161
              response = JSON.stringify(response);                     // 162
            }                                                          //
            sessionStorage.setItem(url, response);                     // 164
            module.verbose('Storing cached response for url', url, response);
          }                                                            //
        },                                                             //
                                                                       //
        query: function () {                                           // 169
                                                                       //
          if (module.is.disabled()) {                                  // 171
            module.debug('Element is disabled API request aborted');   // 172
            return;                                                    // 173
          }                                                            //
                                                                       //
          if (module.is.loading()) {                                   // 176
            if (settings.interruptRequests) {                          // 177
              module.debug('Interrupting previous request');           // 178
              module.abort();                                          // 179
            } else {                                                   //
              module.debug('Cancelling request, previous request is still pending');
              return;                                                  // 183
            }                                                          //
          }                                                            //
                                                                       //
          // pass element metadata to url (value, text)                //
          if (settings.defaultData) {                                  // 188
            $.extend(true, settings.urlData, module.get.defaultData());
          }                                                            //
                                                                       //
          // Add form content                                          //
          if (settings.serializeForm) {                                // 193
            settings.data = module.add.formData(settings.data);        // 194
          }                                                            //
                                                                       //
          // call beforesend and get any settings changes              //
          requestSettings = module.get.settings();                     // 198
                                                                       //
          // check if before send cancelled request                    //
          if (requestSettings === false) {                             // 201
            module.cancelled = true;                                   // 202
            module.error(error.beforeSend);                            // 203
            return;                                                    // 204
          } else {                                                     //
            module.cancelled = false;                                  // 207
          }                                                            //
                                                                       //
          // get url                                                   //
          url = module.get.templatedURL();                             // 211
                                                                       //
          if (!url && !module.is.mocked()) {                           // 213
            module.error(error.missingURL);                            // 214
            return;                                                    // 215
          }                                                            //
                                                                       //
          // replace variables                                         //
          url = module.add.urlData(url);                               // 219
                                                                       //
          // missing url parameters                                    //
          if (!url && !module.is.mocked()) {                           // 222
            return;                                                    // 223
          }                                                            //
                                                                       //
          // look for jQuery ajax parameters in settings               //
          ajaxSettings = $.extend(true, {}, settings, {                // 228
            type: settings.method || settings.type,                    // 229
            data: data,                                                // 230
            url: settings.base + url,                                  // 231
            beforeSend: settings.beforeXHR,                            // 232
            success: function () {},                                   // 233
            failure: function () {},                                   // 234
            complete: function () {}                                   // 235
          });                                                          //
                                                                       //
          module.debug('Querying URL', ajaxSettings.url);              // 238
          module.verbose('Using AJAX settings', ajaxSettings);         // 239
                                                                       //
          if (settings.cache === 'local' && module.read.cachedResponse(url)) {
            module.debug('Response returned from local cache');        // 242
            module.request = module.create.request();                  // 243
            module.request.resolveWith(context, [module.read.cachedResponse(url)]);
            return;                                                    // 245
          }                                                            //
                                                                       //
          if (!settings.throttle) {                                    // 248
            module.debug('Sending request', data, ajaxSettings.method);
            module.send.request();                                     // 250
          } else {                                                     //
            if (!settings.throttleFirstRequest && !module.timer) {     // 253
              module.debug('Sending request', data, ajaxSettings.method);
              module.send.request();                                   // 255
              module.timer = setTimeout(function () {}, settings.throttle);
            } else {                                                   //
              module.debug('Throttling request', settings.throttle);   // 259
              clearTimeout(module.timer);                              // 260
              module.timer = setTimeout(function () {                  // 261
                if (module.timer) {                                    // 262
                  delete module.timer;                                 // 263
                }                                                      //
                module.debug('Sending throttled request', data, ajaxSettings.method);
                module.send.request();                                 // 266
              }, settings.throttle);                                   //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        should: {                                                      // 273
          removeError: function () {                                   // 274
            return settings.hideError === true || settings.hideError === 'auto' && !module.is.form();
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 279
          disabled: function () {                                      // 280
            return $module.filter(selector.disabled).length > 0;       // 281
          },                                                           //
          form: function () {                                          // 283
            return $module.is('form') || $context.is('form');          // 284
          },                                                           //
          mocked: function () {                                        // 286
            return settings.mockResponse || settings.mockResponseAsync;
          },                                                           //
          input: function () {                                         // 289
            return $module.is('input');                                // 290
          },                                                           //
          loading: function () {                                       // 292
            return module.request && module.request.state() == 'pending';
          },                                                           //
          abortedRequest: function (xhr) {                             // 295
            if (xhr && xhr.readyState !== undefined && xhr.readyState === 0) {
              module.verbose('XHR request determined to be aborted');  // 297
              return true;                                             // 298
            } else {                                                   //
              module.verbose('XHR request was not aborted');           // 301
              return false;                                            // 302
            }                                                          //
          },                                                           //
          validResponse: function (response) {                         // 305
            if (settings.dataType !== 'json' && settings.dataType !== 'jsonp' || !$.isFunction(settings.successTest)) {
              module.verbose('Response is not JSON, skipping validation', settings.successTest, response);
              return true;                                             // 308
            }                                                          //
            module.debug('Checking JSON returned success', settings.successTest, response);
            if (settings.successTest(response)) {                      // 311
              module.debug('Response passed success test', response);  // 312
              return true;                                             // 313
            } else {                                                   //
              module.debug('Response failed success test', response);  // 316
              return false;                                            // 317
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        was: {                                                         // 322
          cancelled: function () {                                     // 323
            return module.cancelled || false;                          // 324
          },                                                           //
          succesful: function () {                                     // 326
            return module.request && module.request.state() == 'resolved';
          },                                                           //
          failure: function () {                                       // 329
            return module.request && module.request.state() == 'rejected';
          },                                                           //
          complete: function () {                                      // 332
            return module.request && (module.request.state() == 'resolved' || module.request.state() == 'rejected');
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 337
          urlData: function (url, urlData) {                           // 338
            var requiredVariables, optionalVariables;                  // 339
            if (url) {                                                 // 343
              requiredVariables = url.match(settings.regExp.required);
              optionalVariables = url.match(settings.regExp.optional);
              urlData = urlData || settings.urlData;                   // 346
              if (requiredVariables) {                                 // 347
                module.debug('Looking for required URL variables', requiredVariables);
                $.each(requiredVariables, function (index, templatedString) {
                  var                                                  // 350
                  // allow legacy {$var} style                         //
                  variable = templatedString.indexOf('$') !== -1 ? templatedString.substr(2, templatedString.length - 3) : templatedString.substr(1, templatedString.length - 2),
                      value = $.isPlainObject(urlData) && urlData[variable] !== undefined ? urlData[variable] : $module.data(variable) !== undefined ? $module.data(variable) : $context.data(variable) !== undefined ? $context.data(variable) : urlData[variable];
                  // remove value                                      //
                  if (value === undefined) {                           // 364
                    module.error(error.requiredParameter, variable, url);
                    url = false;                                       // 366
                    return false;                                      // 367
                  } else {                                             //
                    module.verbose('Found required variable', variable, value);
                    value = settings.encodeParameters ? module.get.urlEncodedValue(value) : value;
                    url = url.replace(templatedString, value);         // 375
                  }                                                    //
                });                                                    //
              }                                                        //
              if (optionalVariables) {                                 // 379
                module.debug('Looking for optional URL variables', requiredVariables);
                $.each(optionalVariables, function (index, templatedString) {
                  var                                                  // 382
                  // allow legacy {/$var} style                        //
                  variable = templatedString.indexOf('$') !== -1 ? templatedString.substr(3, templatedString.length - 4) : templatedString.substr(2, templatedString.length - 3),
                      value = $.isPlainObject(urlData) && urlData[variable] !== undefined ? urlData[variable] : $module.data(variable) !== undefined ? $module.data(variable) : $context.data(variable) !== undefined ? $context.data(variable) : urlData[variable];
                  // optional replacement                              //
                  if (value !== undefined) {                           // 396
                    module.verbose('Optional variable Found', variable, value);
                    url = url.replace(templatedString, value);         // 398
                  } else {                                             //
                    module.verbose('Optional variable not found', variable);
                    // remove preceding slash if set                   //
                    if (url.indexOf('/' + templatedString) !== -1) {   // 403
                      url = url.replace('/' + templatedString, '');    // 404
                    } else {                                           //
                      url = url.replace(templatedString, '');          // 407
                    }                                                  //
                  }                                                    //
                });                                                    //
              }                                                        //
            }                                                          //
            return url;                                                // 413
          },                                                           //
          formData: function (data) {                                  // 415
            var canSerialize = $.fn.serializeObject !== undefined,     // 416
                formData = canSerialize ? $form.serializeObject() : $form.serialize(),
                hasOtherData;                                          //
            data = data || settings.data;                              // 423
            hasOtherData = $.isPlainObject(data);                      // 424
                                                                       //
            if (hasOtherData) {                                        // 426
              if (canSerialize) {                                      // 427
                module.debug('Extending existing data with form data', data, formData);
                data = $.extend(true, {}, data, formData);             // 429
              } else {                                                 //
                module.error(error.missingSerialize);                  // 432
                module.debug('Cant extend data. Replacing data with form data', data, formData);
                data = formData;                                       // 434
              }                                                        //
            } else {                                                   //
              module.debug('Adding form data', formData);              // 438
              data = formData;                                         // 439
            }                                                          //
            return data;                                               // 441
          }                                                            //
        },                                                             //
                                                                       //
        send: {                                                        // 445
          request: function () {                                       // 446
            module.set.loading();                                      // 447
            module.request = module.create.request();                  // 448
            if (module.is.mocked()) {                                  // 449
              module.mockedXHR = module.create.mockedXHR();            // 450
            } else {                                                   //
              module.xhr = module.create.xhr();                        // 453
            }                                                          //
            settings.onRequest.call(context, module.request, module.xhr);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 459
          trigger: function (event) {                                  // 460
            module.query();                                            // 461
            if (event.type == 'submit' || event.type == 'click') {     // 462
              event.preventDefault();                                  // 463
            }                                                          //
          },                                                           //
          xhr: {                                                       // 466
            always: function () {                                      // 467
              // nothing special                                       //
            },                                                         //
            done: function (response, textStatus, xhr) {               // 470
              var context = this,                                      // 471
                  elapsedTime = new Date().getTime() - requestStartTime,
                  timeLeft = settings.loadingDuration - elapsedTime,   //
                  translatedResponse = $.isFunction(settings.onResponse) ? settings.onResponse.call(context, $.extend(true, {}, response)) : false;
              timeLeft = timeLeft > 0 ? timeLeft : 0;                  // 479
              if (translatedResponse) {                                // 483
                module.debug('Modified API response in onResponse callback', settings.onResponse, translatedResponse, response);
                response = translatedResponse;                         // 485
              }                                                        //
              if (timeLeft > 0) {                                      // 487
                module.debug('Response completed early delaying state change by', timeLeft);
              }                                                        //
              setTimeout(function () {                                 // 490
                if (module.is.validResponse(response)) {               // 491
                  module.request.resolveWith(context, [response, xhr]);
                } else {                                               //
                  module.request.rejectWith(context, [xhr, 'invalid']);
                }                                                      //
              }, timeLeft);                                            //
            },                                                         //
            fail: function (xhr, status, httpMessage) {                // 499
              var context = this,                                      // 500
                  elapsedTime = new Date().getTime() - requestStartTime,
                  timeLeft = settings.loadingDuration - elapsedTime;   //
              timeLeft = timeLeft > 0 ? timeLeft : 0;                  // 505
              if (timeLeft > 0) {                                      // 509
                module.debug('Response completed early delaying state change by', timeLeft);
              }                                                        //
              setTimeout(function () {                                 // 512
                if (module.is.abortedRequest(xhr)) {                   // 513
                  module.request.rejectWith(context, [xhr, 'aborted', httpMessage]);
                } else {                                               //
                  module.request.rejectWith(context, [xhr, 'error', status, httpMessage]);
                }                                                      //
              }, timeLeft);                                            //
            }                                                          //
          },                                                           //
          request: {                                                   // 522
            done: function (response, xhr) {                           // 523
              module.debug('Successful API Response', response);       // 524
              if (settings.cache === 'local' && url) {                 // 525
                module.write.cachedResponse(url, response);            // 526
                module.debug('Saving server response locally', module.cache);
              }                                                        //
              settings.onSuccess.call(context, response, $module, xhr);
            },                                                         //
            complete: function (firstParameter, secondParameter) {     // 531
              var xhr, response;                                       // 532
              // have to guess callback parameters based on request success
              if (module.was.succesful()) {                            // 537
                response = firstParameter;                             // 538
                xhr = secondParameter;                                 // 539
              } else {                                                 //
                xhr = firstParameter;                                  // 542
                response = module.get.responseFromXHR(xhr);            // 543
              }                                                        //
              module.remove.loading();                                 // 545
              settings.onComplete.call(context, response, $module, xhr);
            },                                                         //
            fail: function (xhr, status, httpMessage) {                // 548
              var                                                      // 549
              // pull response from xhr if available                   //
              response = module.get.responseFromXHR(xhr),              // 551
                  errorMessage = module.get.errorFromRequest(response, status, httpMessage);
              if (status == 'aborted') {                               // 554
                module.debug('XHR Aborted (Most likely caused by page navigation or CORS Policy)', status, httpMessage);
                settings.onAbort.call(context, status, $module, xhr);  // 556
              } else if (status == 'invalid') {                        //
                module.debug('JSON did not pass success test. A server-side error has most likely occurred', response);
              } else if (status == 'error') {                          //
                if (xhr !== undefined) {                               // 562
                  module.debug('XHR produced a server error', status, httpMessage);
                  // make sure we have an error to display to console  //
                  if (xhr.status != 200 && httpMessage !== undefined && httpMessage !== '') {
                    module.error(error.statusMessage + httpMessage, ajaxSettings.url);
                  }                                                    //
                  settings.onError.call(context, errorMessage, $module, xhr);
                }                                                      //
              }                                                        //
                                                                       //
              if (settings.errorDuration && status !== 'aborted') {    // 572
                module.debug('Adding error state');                    // 573
                module.set.error();                                    // 574
                if (module.should.removeError()) {                     // 575
                  setTimeout(module.remove.error, settings.errorDuration);
                }                                                      //
              }                                                        //
              module.debug('API Request failed', errorMessage, xhr);   // 579
              settings.onFailure.call(context, response, $module, xhr);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 585
                                                                       //
          request: function () {                                       // 587
            // api request promise                                     //
            return $.Deferred().always(module.event.request.complete).done(module.event.request.done).fail(module.event.request.fail);
          },                                                           //
                                                                       //
          mockedXHR: function () {                                     // 596
            var                                                        // 597
            // xhr does not simulate these properties of xhr but must return them
            textStatus = false,                                        // 599
                status = false,                                        //
                httpMessage = false,                                   //
                asyncCallback,                                         //
                response,                                              //
                mockedXHR;                                             //
                                                                       //
            mockedXHR = $.Deferred().always(module.event.xhr.complete).done(module.event.xhr.done).fail(module.event.xhr.fail);
                                                                       //
            if (settings.mockResponse) {                               // 613
              if ($.isFunction(settings.mockResponse)) {               // 614
                module.debug('Using mocked callback returning response', settings.mockResponse);
                response = settings.mockResponse.call(context, settings);
              } else {                                                 //
                module.debug('Using specified response', settings.mockResponse);
                response = settings.mockResponse;                      // 620
              }                                                        //
              // simulating response                                   //
              mockedXHR.resolveWith(context, [response, textStatus, { responseText: response }]);
            } else if ($.isFunction(settings.mockResponseAsync)) {     //
              asyncCallback = function (response) {                    // 626
                module.debug('Async callback returned response', response);
                                                                       //
                if (response) {                                        // 629
                  mockedXHR.resolveWith(context, [response, textStatus, { responseText: response }]);
                } else {                                               //
                  mockedXHR.rejectWith(context, [{ responseText: response }, status, httpMessage]);
                }                                                      //
              };                                                       //
              module.debug('Using async mocked response', settings.mockResponseAsync);
              settings.mockResponseAsync.call(context, settings, asyncCallback);
            }                                                          //
            return mockedXHR;                                          // 639
          },                                                           //
                                                                       //
          xhr: function () {                                           // 642
            var xhr;                                                   // 643
            // ajax request promise                                    //
            xhr = $.ajax(ajaxSettings).always(module.event.xhr.always).done(module.event.xhr.done).fail(module.event.xhr.fail);
            module.verbose('Created server request', xhr);             // 652
            return xhr;                                                // 653
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 657
          error: function () {                                         // 658
            module.verbose('Adding error state to element', $context);
            $context.addClass(className.error);                        // 660
          },                                                           //
          loading: function () {                                       // 662
            module.verbose('Adding loading state to element', $context);
            $context.addClass(className.loading);                      // 664
            requestStartTime = new Date().getTime();                   // 665
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 669
          error: function () {                                         // 670
            module.verbose('Removing error state from element', $context);
            $context.removeClass(className.error);                     // 672
          },                                                           //
          loading: function () {                                       // 674
            module.verbose('Removing loading state from element', $context);
            $context.removeClass(className.loading);                   // 676
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 680
          responseFromXHR: function (xhr) {                            // 681
            return $.isPlainObject(xhr) ? settings.dataType == 'json' || settings.dataType == 'jsonp' ? module.decode.json(xhr.responseText) : xhr.responseText : false;
          },                                                           //
          errorFromRequest: function (response, status, httpMessage) {
            return $.isPlainObject(response) && response.error !== undefined ? response.error // use json error message
            : settings.error[status] !== undefined ? // use server error message
            settings.error[status] : httpMessage;                      // 693
          },                                                           //
          request: function () {                                       // 697
            return module.request || false;                            // 698
          },                                                           //
          xhr: function () {                                           // 700
            return module.xhr || false;                                // 701
          },                                                           //
          settings: function () {                                      // 703
            var runSettings;                                           // 704
            runSettings = settings.beforeSend.call(context, settings);
            if (runSettings) {                                         // 708
              if (runSettings.success !== undefined) {                 // 709
                module.debug('Legacy success callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.success);
                runSettings.onSuccess = runSettings.success;           // 712
              }                                                        //
              if (runSettings.failure !== undefined) {                 // 714
                module.debug('Legacy failure callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.failure);
                runSettings.onFailure = runSettings.failure;           // 717
              }                                                        //
              if (runSettings.complete !== undefined) {                // 719
                module.debug('Legacy complete callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.complete);
                runSettings.onComplete = runSettings.complete;         // 722
              }                                                        //
            }                                                          //
            if (runSettings === undefined) {                           // 725
              module.error(error.noReturnedValue);                     // 726
            }                                                          //
            return runSettings !== undefined ? runSettings : settings;
          },                                                           //
          urlEncodedValue: function (value) {                          // 733
            var decodedValue = window.decodeURIComponent(value),       // 734
                encodedValue = window.encodeURIComponent(value),       //
                alreadyEncoded = decodedValue !== value;               //
            if (alreadyEncoded) {                                      // 739
              module.debug('URL value is already encoded, avoiding double encoding', value);
              return value;                                            // 741
            }                                                          //
            module.verbose('Encoding value using encodeURIComponent', value, encodedValue);
            return encodedValue;                                       // 744
          },                                                           //
          defaultData: function () {                                   // 746
            var data = {};                                             // 747
            if (!$.isWindow(element)) {                                // 750
              if (module.is.input()) {                                 // 751
                data.value = $module.val();                            // 752
              } else if (!module.is.form()) {} else {                  //
                data.text = $module.text();                            // 758
              }                                                        //
            }                                                          //
            return data;                                               // 761
          },                                                           //
          event: function () {                                         // 763
            if ($.isWindow(element) || settings.on == 'now') {         // 764
              module.debug('API called without element, no events attached');
              return false;                                            // 766
            } else if (settings.on == 'auto') {                        //
              if ($module.is('input')) {                               // 769
                return element.oninput !== undefined ? 'input' : element.onpropertychange !== undefined ? 'propertychange' : 'keyup';
              } else if ($module.is('form')) {                         //
                return 'submit';                                       // 778
              } else {                                                 //
                return 'click';                                        // 781
              }                                                        //
            } else {                                                   //
              return settings.on;                                      // 785
            }                                                          //
          },                                                           //
          templatedURL: function (action) {                            // 788
            action = action || $module.data(metadata.action) || settings.action || false;
            url = $module.data(metadata.url) || settings.url || false;
            if (url) {                                                 // 791
              module.debug('Using specified url', url);                // 792
              return url;                                              // 793
            }                                                          //
            if (action) {                                              // 795
              module.debug('Looking up url for action', action, settings.api);
              if (settings.api[action] === undefined && !module.is.mocked()) {
                module.error(error.missingAction, settings.action, settings.api);
                return;                                                // 799
              }                                                        //
              url = settings.api[action];                              // 801
            } else if (module.is.form()) {                             //
              url = $module.attr('action') || $context.attr('action') || false;
              module.debug('No url or action specified, defaulting to form action', url);
            }                                                          //
            return url;                                                // 807
          }                                                            //
        },                                                             //
                                                                       //
        abort: function () {                                           // 811
          var xhr = module.get.xhr();                                  // 812
          if (xhr && xhr.state() !== 'resolved') {                     // 815
            module.debug('Cancelling API request');                    // 816
            xhr.abort();                                               // 817
          }                                                            //
        },                                                             //
                                                                       //
        // reset state                                                 //
        reset: function () {                                           // 822
          module.remove.error();                                       // 823
          module.remove.loading();                                     // 824
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 827
          module.debug('Changing setting', name, value);               // 828
          if ($.isPlainObject(name)) {                                 // 829
            $.extend(true, settings, name);                            // 830
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 833
          } else {                                                     //
            return settings[name];                                     // 836
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 839
          if ($.isPlainObject(name)) {                                 // 840
            $.extend(true, module, name);                              // 841
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 844
          } else {                                                     //
            return module[name];                                       // 847
          }                                                            //
        },                                                             //
        debug: function () {                                           // 850
          if (settings.debug) {                                        // 851
            if (settings.performance) {                                // 852
              module.performance.log(arguments);                       // 853
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 857
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 861
          if (settings.verbose && settings.debug) {                    // 862
            if (settings.performance) {                                // 863
              module.performance.log(arguments);                       // 864
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 868
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 872
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 874
        },                                                             //
        performance: {                                                 // 876
          log: function (message) {                                    // 877
            var currentTime, executionTime, previousTime;              // 878
            if (settings.performance) {                                // 883
              currentTime = new Date().getTime();                      // 884
              previousTime = time || currentTime;                      // 885
              executionTime = currentTime - previousTime;              // 886
              time = currentTime;                                      // 887
              performance.push({                                       // 888
                'Name': message[0],                                    // 889
                'Arguments': [].slice.call(message, 1) || '',          // 890
                //'Element'        : element,                          //
                'Execution Time': executionTime                        // 892
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 895
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 898
            var title = settings.name + ':',                           // 899
                totalTime = 0;                                         //
            time = false;                                              // 903
            clearTimeout(module.performance.timer);                    // 904
            $.each(performance, function (index, data) {               // 905
              totalTime += data['Execution Time'];                     // 906
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 908
            if (moduleSelector) {                                      // 909
              title += ' \'' + moduleSelector + '\'';                  // 910
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 913
              if (console.table) {                                     // 914
                console.table(performance);                            // 915
              } else {                                                 //
                $.each(performance, function (index, data) {           // 918
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 922
            }                                                          //
            performance = [];                                          // 924
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 927
          var object = instance,                                       // 928
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 934
          context = element || context;                                // 935
          if (typeof query == 'string' && object !== undefined) {      // 936
            query = query.split(/[\. ]/);                              // 937
            maxDepth = query.length - 1;                               // 938
            $.each(query, function (depth, value) {                    // 939
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 945
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 948
                return false;                                          // 949
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 952
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 955
                return false;                                          // 956
              } else {                                                 //
                module.error(error.method, query);                     // 959
                return false;                                          // 960
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 964
            response = found.apply(context, passedArguments);          // 965
          } else if (found !== undefined) {                            //
            response = found;                                          // 968
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 970
            returnedValue.push(response);                              // 971
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 974
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 977
          }                                                            //
          return found;                                                // 979
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 983
        if (instance === undefined) {                                  // 984
          module.initialize();                                         // 985
        }                                                              //
        module.invoke(query);                                          // 987
      } else {                                                         //
        if (instance !== undefined) {                                  // 990
          instance.invoke('destroy');                                  // 991
        }                                                              //
        module.initialize();                                           // 993
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 998
  };                                                                   //
                                                                       //
  $.api.settings = {                                                   // 1004
                                                                       //
    name: 'API',                                                       // 1006
    namespace: 'api',                                                  // 1007
                                                                       //
    debug: false,                                                      // 1009
    verbose: false,                                                    // 1010
    performance: true,                                                 // 1011
                                                                       //
    // object containing all templates endpoints                       //
    api: {},                                                           // 1014
                                                                       //
    // whether to cache responses                                      //
    cache: true,                                                       // 1017
                                                                       //
    // whether new requests should abort previous requests             //
    interruptRequests: true,                                           // 1020
                                                                       //
    // event binding                                                   //
    on: 'auto',                                                        // 1023
                                                                       //
    // context for applying state classes                              //
    stateContext: false,                                               // 1026
                                                                       //
    // duration for loading state                                      //
    loadingDuration: 0,                                                // 1029
                                                                       //
    // whether to hide errors after a period of time                   //
    hideError: 'auto',                                                 // 1032
                                                                       //
    // duration for error state                                        //
    errorDuration: 2000,                                               // 1035
                                                                       //
    // whether parameters should be encoded with encodeURIComponent    //
    encodeParameters: true,                                            // 1038
                                                                       //
    // API action to use                                               //
    action: false,                                                     // 1041
                                                                       //
    // templated URL to use                                            //
    url: false,                                                        // 1044
                                                                       //
    // base URL to apply to all endpoints                              //
    base: '',                                                          // 1047
                                                                       //
    // data that will                                                  //
    urlData: {},                                                       // 1050
                                                                       //
    // whether to add default data to url data                         //
    defaultData: true,                                                 // 1053
                                                                       //
    // whether to serialize closest form                               //
    serializeForm: false,                                              // 1056
                                                                       //
    // how long to wait before request should occur                    //
    throttle: 0,                                                       // 1059
                                                                       //
    // whether to throttle first request or only repeated              //
    throttleFirstRequest: true,                                        // 1062
                                                                       //
    // standard ajax settings                                          //
    method: 'get',                                                     // 1065
    data: {},                                                          // 1066
    dataType: 'json',                                                  // 1067
                                                                       //
    // mock response                                                   //
    mockResponse: false,                                               // 1070
    mockResponseAsync: false,                                          // 1071
                                                                       //
    // callbacks before request                                        //
    beforeSend: function (settings) {                                  // 1074
      return settings;                                                 // 1074
    },                                                                 //
    beforeXHR: function (xhr) {},                                      // 1075
    onRequest: function (promise, xhr) {},                             // 1076
                                                                       //
    // after request                                                   //
    onResponse: false, // function(response) { },                      // 1079
                                                                       //
    // response was successful, if JSON passed validation              //
    onSuccess: function (response, $module) {},                        // 1082
                                                                       //
    // request finished without aborting                               //
    onComplete: function (response, $module) {},                       // 1085
                                                                       //
    // failed JSON success test                                        //
    onFailure: function (response, $module) {},                        // 1088
                                                                       //
    // server error                                                    //
    onError: function (errorMessage, $module) {},                      // 1091
                                                                       //
    // request aborted                                                 //
    onAbort: function (errorMessage, $module) {},                      // 1094
                                                                       //
    successTest: false,                                                // 1096
                                                                       //
    // errors                                                          //
    error: {                                                           // 1099
      beforeSend: 'The before send function has aborted the request',  // 1100
      error: 'There was an error with your request',                   // 1101
      exitConditions: 'API Request Aborted. Exit conditions met',      // 1102
      JSONParse: 'JSON could not be parsed during error handling',     // 1103
      legacyParameters: 'You are using legacy API success callback names',
      method: 'The method you called is not defined',                  // 1105
      missingAction: 'API action used but no url was defined',         // 1106
      missingSerialize: 'jquery-serialize-object is required to add form data to an existing data object',
      missingURL: 'No URL specified for api event',                    // 1108
      noReturnedValue: 'The beforeSend callback must return a settings object, beforeSend ignored.',
      noStorage: 'Caching responses locally requires session storage',
      parseError: 'There was an error parsing your request',           // 1111
      requiredParameter: 'Missing a required URL parameter: ',         // 1112
      statusMessage: 'Server gave an error: ',                         // 1113
      timeout: 'Your request timed out'                                // 1114
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1117
      required: /\{\$*[A-z0-9]+\}/g,                                   // 1118
      optional: /\{\/\$*[A-z0-9]+\}/g                                  // 1119
    },                                                                 //
                                                                       //
    className: {                                                       // 1122
      loading: 'loading',                                              // 1123
      error: 'error'                                                   // 1124
    },                                                                 //
                                                                       //
    selector: {                                                        // 1127
      disabled: '.disabled',                                           // 1128
      form: 'form'                                                     // 1129
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1132
      action: 'action',                                                // 1133
      url: 'url'                                                       // 1134
    }                                                                  //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
