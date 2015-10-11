(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/search.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Search                                              //
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
  $.fn.search = function (parameters) {                                // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $(this).each(function () {                                         // 33
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.search.settings, parameters) : $.extend({}, $.fn.search.settings),
          className = settings.className,                              //
          metadata = settings.metadata,                                //
          regExp = settings.regExp,                                    //
          fields = settings.fields,                                    //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          namespace = settings.namespace,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = namespace + '-module',                     //
          $module = $(this),                                           //
          $prompt = $module.find(selector.prompt),                     //
          $searchButton = $module.find(selector.searchButton),         //
          $results = $module.find(selector.results),                   //
          $result = $module.find(selector.result),                     //
          $category = $module.find(selector.category),                 //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 64
                                                                       //
        initialize: function () {                                      // 66
          module.verbose('Initializing module');                       // 67
          module.determine.searchFields();                             // 68
          module.bind.events();                                        // 69
          module.set.type();                                           // 70
          module.create.results();                                     // 71
          module.instantiate();                                        // 72
        },                                                             //
        instantiate: function () {                                     // 74
          module.verbose('Storing instance of module', module);        // 75
          instance = module;                                           // 76
          $module.data(moduleNamespace, module);                       // 77
        },                                                             //
        destroy: function () {                                         // 81
          module.verbose('Destroying instance');                       // 82
          $module.off(eventNamespace).removeData(moduleNamespace);     // 83
        },                                                             //
                                                                       //
        bind: {                                                        // 89
          events: function () {                                        // 90
            module.verbose('Binding events to search');                // 91
            if (settings.automatic) {                                  // 92
              $module.on(module.get.inputEvent() + eventNamespace, selector.prompt, module.event.input);
              $prompt.attr('autocomplete', 'off');                     // 96
            }                                                          //
            $module                                                    // 100
            // prompt                                                  //
            .on('focus' + eventNamespace, selector.prompt, module.event.focus).on('blur' + eventNamespace, selector.prompt, module.event.blur).on('keydown' + eventNamespace, selector.prompt, module.handleKeyboard)
            // search button                                           //
            .on('click' + eventNamespace, selector.searchButton, module.query)
            // results                                                 //
            .on('mousedown' + eventNamespace, selector.results, module.event.result.mousedown).on('mouseup' + eventNamespace, selector.results, module.event.result.mouseup).on('click' + eventNamespace, selector.result, module.event.result.click);
          }                                                            //
        },                                                             //
                                                                       //
        determine: {                                                   // 115
          searchFields: function () {                                  // 116
            // this makes sure $.extend does not add specified search fields to default fields
            // this is the only setting which should not extend defaults
            if (parameters && parameters.searchFields !== undefined) {
              settings.searchFields = parameters.searchFields;         // 120
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 125
          input: function () {                                         // 126
            clearTimeout(module.timer);                                // 127
            module.timer = setTimeout(module.query, settings.searchDelay);
          },                                                           //
          focus: function () {                                         // 130
            module.set.focus();                                        // 131
            if (module.has.minimumCharacters()) {                      // 132
              module.query();                                          // 133
              if (module.can.show()) {                                 // 134
                module.showResults();                                  // 135
              }                                                        //
            }                                                          //
          },                                                           //
          blur: function (event) {                                     // 139
            var pageLostFocus = document.activeElement === this;       // 140
            if (!pageLostFocus && !module.resultsClicked) {            // 143
              module.cancel.query();                                   // 144
              module.remove.focus();                                   // 145
              module.timer = setTimeout(module.hideResults, settings.hideDelay);
            }                                                          //
          },                                                           //
          result: {                                                    // 149
            mousedown: function () {                                   // 150
              module.resultsClicked = true;                            // 151
            },                                                         //
            mouseup: function () {                                     // 153
              module.resultsClicked = false;                           // 154
            },                                                         //
            click: function (event) {                                  // 156
              module.debug('Search result selected');                  // 157
              var $result = $(this),                                   // 158
                  $title = $result.find(selector.title).eq(0),         //
                  $link = $result.find('a[href]').eq(0),               //
                  href = $link.attr('href') || false,                  //
                  target = $link.attr('target') || false,              //
                  title = $title.html(),                               //
                                                                       //
              // title is used for result lookup                       //
              value = $title.length > 0 ? $title.text() : false,       // 166
                  results = module.get.results(),                      //
                  result = $result.data(metadata.result) || module.get.result(value, results),
                  returnedValue;                                       //
              if ($.isFunction(settings.onSelect)) {                   // 173
                if (settings.onSelect.call(element, result, results) === false) {
                  module.debug('Custom onSelect callback cancelled default select action');
                  return;                                              // 176
                }                                                      //
              }                                                        //
              module.hideResults();                                    // 179
              if (value) {                                             // 180
                module.set.value(value);                               // 181
              }                                                        //
              if (href) {                                              // 183
                module.verbose('Opening search link found in result', $link);
                if (target == '_blank' || event.ctrlKey) {             // 185
                  window.open(href);                                   // 186
                } else {                                               //
                  window.location.href = href;                         // 189
                }                                                      //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
        handleKeyboard: function (event) {                             // 195
          var                                                          // 196
          // force selector refresh                                    //
          $result = $module.find(selector.result),                     // 198
              $category = $module.find(selector.category),             //
              currentIndex = $result.index($result.filter('.' + className.active)),
              resultSize = $result.length,                             //
              keyCode = event.which,                                   //
              keys = {                                                 //
            backspace: 8,                                              // 205
            enter: 13,                                                 // 206
            escape: 27,                                                // 207
            upArrow: 38,                                               // 208
            downArrow: 40                                              // 209
          },                                                           //
              newIndex;                                                //
          // search shortcuts                                          //
          if (keyCode == keys.escape) {                                // 214
            module.verbose('Escape key pressed, blurring search field');
            $prompt.trigger('blur');                                   // 216
          }                                                            //
          if (module.is.visible()) {                                   // 220
            if (keyCode == keys.enter) {                               // 221
              module.verbose('Enter key pressed, selecting active result');
              if ($result.filter('.' + className.active).length > 0) {
                module.event.result.click.call($result.filter('.' + className.active), event);
                event.preventDefault();                                // 225
                return false;                                          // 226
              }                                                        //
            } else if (keyCode == keys.upArrow) {                      //
              module.verbose('Up key pressed, changing active result');
              newIndex = currentIndex - 1 < 0 ? currentIndex : currentIndex - 1;
              $category.removeClass(className.active);                 // 235
              $result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);
              event.preventDefault();                                  // 245
            } else if (keyCode == keys.downArrow) {                    //
              module.verbose('Down key pressed, changing active result');
              newIndex = currentIndex + 1 >= resultSize ? currentIndex : currentIndex + 1;
              $category.removeClass(className.active);                 // 253
              $result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);
              event.preventDefault();                                  // 263
            }                                                          //
          } else {                                                     //
            // query shortcuts                                         //
            if (keyCode == keys.enter) {                               // 268
              module.verbose('Enter key pressed, executing query');    // 269
              module.query();                                          // 270
              module.set.buttonPressed();                              // 271
              $prompt.one('keyup', module.remove.buttonFocus);         // 272
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setup: {                                                       // 277
          api: function () {                                           // 278
            var apiSettings = {                                        // 279
              debug: settings.debug,                                   // 281
              on: false,                                               // 282
              cache: 'local',                                          // 283
              action: 'search',                                        // 284
              onError: module.error                                    // 285
            },                                                         //
                searchHTML;                                            //
            module.verbose('First request, initializing API');         // 289
            $module.api(apiSettings);                                  // 290
          }                                                            //
        },                                                             //
                                                                       //
        can: {                                                         // 294
          useAPI: function () {                                        // 295
            return $.fn.api !== undefined;                             // 296
          },                                                           //
          show: function () {                                          // 298
            return module.is.focused() && !module.is.visible() && !module.is.empty();
          },                                                           //
          transition: function () {                                    // 301
            return settings.transition && $.fn.transition !== undefined && $module.transition('is supported');
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 306
          empty: function () {                                         // 307
            return $results.html() === '';                             // 308
          },                                                           //
          visible: function () {                                       // 310
            return $results.filter(':visible').length > 0;             // 311
          },                                                           //
          focused: function () {                                       // 313
            return $prompt.filter(':focus').length > 0;                // 314
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 318
          inputEvent: function () {                                    // 319
            var prompt = $prompt[0],                                   // 320
                inputEvent = prompt !== undefined && prompt.oninput !== undefined ? 'input' : prompt !== undefined && prompt.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            return inputEvent;                                         // 328
          },                                                           //
          value: function () {                                         // 330
            return $prompt.val();                                      // 331
          },                                                           //
          results: function () {                                       // 333
            var results = $module.data(metadata.results);              // 334
            return results;                                            // 337
          },                                                           //
          result: function (value, results) {                          // 339
            var lookupFields = ['title', 'id'],                        // 340
                result = false;                                        //
            value = value !== undefined ? value : module.get.value();  // 344
            results = results !== undefined ? results : module.get.results();
            if (settings.type === 'category') {                        // 352
              module.debug('Finding result that matches', value);      // 353
              $.each(results, function (index, category) {             // 354
                if ($.isArray(category.results)) {                     // 355
                  result = module.search.object(value, category.results, lookupFields)[0];
                  // don't continue searching if a result is found     //
                  if (result) {                                        // 358
                    return false;                                      // 359
                  }                                                    //
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.debug('Finding result in results object', value);
              result = module.search.object(value, results, lookupFields)[0];
            }                                                          //
            return result || false;                                    // 368
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 372
          focus: function () {                                         // 373
            $module.addClass(className.focus);                         // 374
          },                                                           //
          loading: function () {                                       // 376
            $module.addClass(className.loading);                       // 377
          },                                                           //
          value: function (value) {                                    // 379
            module.verbose('Setting search input value', value);       // 380
            $prompt.val(value);                                        // 381
          },                                                           //
          type: function (type) {                                      // 385
            type = type || settings.type;                              // 386
            if (settings.type == 'category') {                         // 387
              $module.addClass(settings.type);                         // 388
            }                                                          //
          },                                                           //
          buttonPressed: function () {                                 // 391
            $searchButton.addClass(className.pressed);                 // 392
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 396
          loading: function () {                                       // 397
            $module.removeClass(className.loading);                    // 398
          },                                                           //
          focus: function () {                                         // 400
            $module.removeClass(className.focus);                      // 401
          },                                                           //
          buttonPressed: function () {                                 // 403
            $searchButton.removeClass(className.pressed);              // 404
          }                                                            //
        },                                                             //
                                                                       //
        query: function () {                                           // 408
          var searchTerm = module.get.value(),                         // 409
              cache = module.read.cache(searchTerm);                   //
          if (module.has.minimumCharacters()) {                        // 413
            if (cache) {                                               // 414
              module.debug('Reading result from cache', searchTerm);   // 415
              module.save.results(cache.results);                      // 416
              module.addResults(cache.html);                           // 417
              module.inject.id(cache.results);                         // 418
            } else {                                                   //
              module.debug('Querying for', searchTerm);                // 421
              if ($.isPlainObject(settings.source) || $.isArray(settings.source)) {
                module.search.local(searchTerm);                       // 423
              } else if (module.can.useAPI()) {                        //
                module.search.remote(searchTerm);                      // 426
              } else {                                                 //
                module.error(error.source);                            // 429
              }                                                        //
              settings.onSearchQuery.call(element, searchTerm);        // 431
            }                                                          //
          } else {                                                     //
            module.hideResults();                                      // 435
          }                                                            //
        },                                                             //
                                                                       //
        search: {                                                      // 439
          local: function (searchTerm) {                               // 440
            var results = module.search.object(searchTerm, settings.content),
                searchHTML;                                            //
            module.set.loading();                                      // 445
            module.save.results(results);                              // 446
            module.debug('Returned local search results', results);    // 447
                                                                       //
            searchHTML = module.generateResults({                      // 449
              results: results                                         // 450
            });                                                        //
            module.remove.loading();                                   // 452
            module.addResults(searchHTML);                             // 453
            module.inject.id(results);                                 // 454
            module.write.cache(searchTerm, {                           // 455
              html: searchHTML,                                        // 456
              results: results                                         // 457
            });                                                        //
          },                                                           //
          remote: function (searchTerm) {                              // 460
            var apiSettings = {                                        // 461
              onSuccess: function (response) {                         // 463
                module.parse.response.call(element, response, searchTerm);
              },                                                       //
              onFailure: function () {                                 // 466
                module.displayMessage(error.serverError);              // 467
              },                                                       //
              urlData: {                                               // 469
                query: searchTerm                                      // 470
              }                                                        //
            };                                                         //
            if (!$module.api('get request')) {                         // 474
              module.setup.api();                                      // 475
            }                                                          //
            $.extend(true, apiSettings, settings.apiSettings);         // 477
            module.debug('Executing search', apiSettings);             // 478
            module.cancel.query();                                     // 479
            $module.api('setting', apiSettings).api('query');          // 480
          },                                                           //
          object: function (searchTerm, source, searchFields) {        // 485
            var results = [],                                          // 486
                fuzzyResults = [],                                     //
                searchExp = searchTerm.toString().replace(regExp.escape, '\\$&'),
                matchRegExp = new RegExp(regExp.beginsWith + searchExp, 'i'),
                                                                       //
            // avoid duplicates when pushing results                   //
            addResult = function (array, result) {                     // 493
              var notResult = $.inArray(result, results) == -1,        // 494
                  notFuzzyResult = $.inArray(result, fuzzyResults) == -1;
              if (notResult && notFuzzyResult) {                       // 498
                array.push(result);                                    // 499
              }                                                        //
            };                                                         //
            source = source || settings.source;                        // 503
            searchFields = searchFields !== undefined ? searchFields : settings.searchFields;
                                                                       //
            // search fields should be array to loop correctly         //
            if (!$.isArray(searchFields)) {                            // 510
              searchFields = [searchFields];                           // 511
            }                                                          //
                                                                       //
            // exit conditions if no source                            //
            if (source === undefined || source === false) {            // 515
              module.error(error.source);                              // 516
              return [];                                               // 517
            }                                                          //
                                                                       //
            // iterate through search fields looking for matches       //
            $.each(searchFields, function (index, field) {             // 521
              $.each(source, function (label, content) {               // 522
                var fieldExists = typeof content[field] == 'string';   // 523
                if (fieldExists) {                                     // 526
                  if (content[field].search(matchRegExp) !== -1) {     // 527
                    // content starts with value (first in results)    //
                    addResult(results, content);                       // 529
                  } else if (settings.searchFullText && module.fuzzySearch(searchTerm, content[field])) {
                    // content fuzzy matches (last in results)         //
                    addResult(fuzzyResults, content);                  // 533
                  }                                                    //
                }                                                      //
              });                                                      //
            });                                                        //
            return $.merge(results, fuzzyResults);                     // 538
          }                                                            //
        },                                                             //
                                                                       //
        fuzzySearch: function (query, term) {                          // 542
          var termLength = term.length,                                // 543
              queryLength = query.length;                              //
          if (typeof query !== 'string') {                             // 547
            return false;                                              // 548
          }                                                            //
          query = query.toLowerCase();                                 // 550
          term = term.toLowerCase();                                   // 551
          if (queryLength > termLength) {                              // 552
            return false;                                              // 553
          }                                                            //
          if (queryLength === termLength) {                            // 555
            return query === term;                                     // 556
          }                                                            //
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);     // 559
            while (nextCharacterIndex < termLength) {                  // 562
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;                                       // 564
              }                                                        //
            }                                                          //
            return false;                                              // 567
          }                                                            //
          return true;                                                 // 569
        },                                                             //
                                                                       //
        parse: {                                                       // 572
          response: function (response, searchTerm) {                  // 573
            var searchHTML = module.generateResults(response);         // 574
            module.verbose('Parsing server response', response);       // 577
            if (response !== undefined) {                              // 578
              if (searchTerm !== undefined && response[fields.results] !== undefined) {
                module.addResults(searchHTML);                         // 580
                module.inject.id(response[fields.results]);            // 581
                module.write.cache(searchTerm, {                       // 582
                  html: searchHTML,                                    // 583
                  results: response[fields.results]                    // 584
                });                                                    //
                module.save.results(response[fields.results]);         // 586
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        cancel: {                                                      // 592
          query: function () {                                         // 593
            if (module.can.useAPI()) {                                 // 594
              $module.api('abort');                                    // 595
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 600
          minimumCharacters: function () {                             // 601
            var searchTerm = module.get.value(),                       // 602
                numCharacters = searchTerm.length;                     //
            return numCharacters >= settings.minCharacters;            // 606
          }                                                            //
        },                                                             //
                                                                       //
        clear: {                                                       // 610
          cache: function (value) {                                    // 611
            var cache = $module.data(metadata.cache);                  // 612
            if (!value) {                                              // 615
              module.debug('Clearing cache', value);                   // 616
              $module.removeData(metadata.cache);                      // 617
            } else if (value && cache && cache[value]) {               //
              module.debug('Removing value from cache', value);        // 620
              delete cache[value];                                     // 621
              $module.data(metadata.cache, cache);                     // 622
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 627
          cache: function (name) {                                     // 628
            var cache = $module.data(metadata.cache);                  // 629
            if (settings.cache) {                                      // 632
              module.verbose('Checking cache for generated html for query', name);
              return typeof cache == 'object' && cache[name] !== undefined ? cache[name] : false;
            }                                                          //
            return false;                                              // 639
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 643
          id: function (resultIndex, categoryIndex) {                  // 644
            var resultID = resultIndex + 1,                            // 645
                // not zero indexed                                    //
            categoryID = categoryIndex + 1,                            // 647
                firstCharCode,                                         //
                letterID,                                              //
                id;                                                    //
            if (categoryIndex !== undefined) {                         // 652
              // start char code for "A"                               //
              letterID = String.fromCharCode(97 + categoryIndex);      // 654
              id = letterID + resultID;                                // 655
              module.verbose('Creating category result id', id);       // 656
            } else {                                                   //
              id = resultID;                                           // 659
              module.verbose('Creating result id', id);                // 660
            }                                                          //
            return id;                                                 // 662
          },                                                           //
          results: function () {                                       // 664
            if ($results.length === 0) {                               // 665
              $results = $('<div />').addClass(className.results).appendTo($module);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        inject: {                                                      // 674
          result: function (result, resultIndex, categoryIndex) {      // 675
            module.verbose('Injecting result into results');           // 676
            var $selectedResult = categoryIndex !== undefined ? $results.children().eq(categoryIndex).children(selector.result).eq(resultIndex) : $results.children(selector.result).eq(resultIndex);
            module.verbose('Injecting results metadata', $selectedResult);
            $selectedResult.data(metadata.result, result);             // 686
          },                                                           //
          id: function (results) {                                     // 690
            module.debug('Injecting unique ids into results');         // 691
            var                                                        // 692
            // since results may be object, we must use counters       //
            categoryIndex = 0,                                         // 694
                resultIndex = 0;                                       //
            if (settings.type === 'category') {                        // 697
              // iterate through each category result                  //
              $.each(results, function (index, category) {             // 699
                resultIndex = 0;                                       // 700
                $.each(category.results, function (index, value) {     // 701
                  var result = category.results[index];                // 702
                  if (result.id === undefined) {                       // 705
                    result.id = module.create.id(resultIndex, categoryIndex);
                  }                                                    //
                  module.inject.result(result, resultIndex, categoryIndex);
                  resultIndex++;                                       // 709
                });                                                    //
                categoryIndex++;                                       // 711
              });                                                      //
            } else {                                                   //
              // top level                                             //
              $.each(results, function (index, value) {                // 716
                var result = results[index];                           // 717
                if (result.id === undefined) {                         // 720
                  result.id = module.create.id(resultIndex);           // 721
                }                                                      //
                module.inject.result(result, resultIndex);             // 723
                resultIndex++;                                         // 724
              });                                                      //
            }                                                          //
            return results;                                            // 727
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 731
          results: function (results) {                                // 732
            module.verbose('Saving current search results to metadata', results);
            $module.data(metadata.results, results);                   // 734
          }                                                            //
        },                                                             //
                                                                       //
        write: {                                                       // 738
          cache: function (name, value) {                              // 739
            var cache = $module.data(metadata.cache) !== undefined ? $module.data(metadata.cache) : {};
            if (settings.cache) {                                      // 745
              module.verbose('Writing generated html to cache', name, value);
              cache[name] = value;                                     // 747
              $module.data(metadata.cache, cache);                     // 748
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        addResults: function (html) {                                  // 755
          if ($.isFunction(settings.onResultsAdd)) {                   // 756
            if (settings.onResultsAdd.call($results, html) === false) {
              module.debug('onResultsAdd callback cancelled default action');
              return false;                                            // 759
            }                                                          //
          }                                                            //
          $results.html(html);                                         // 762
          if (module.can.show()) {                                     // 765
            module.showResults();                                      // 766
          }                                                            //
        },                                                             //
                                                                       //
        showResults: function () {                                     // 770
          if (!module.is.visible()) {                                  // 771
            if (module.can.transition()) {                             // 772
              module.debug('Showing results with css animations');     // 773
              $results.transition({                                    // 774
                animation: settings.transition + ' in',                // 776
                debug: settings.debug,                                 // 777
                verbose: settings.verbose,                             // 778
                duration: settings.duration,                           // 779
                queue: true                                            // 780
              });                                                      //
            } else {                                                   //
              module.debug('Showing results with javascript');         // 785
              $results.stop().fadeIn(settings.duration, settings.easing);
            }                                                          //
            settings.onResultsOpen.call($results);                     // 791
          }                                                            //
        },                                                             //
        hideResults: function () {                                     // 794
          if (module.is.visible()) {                                   // 795
            if (module.can.transition()) {                             // 796
              module.debug('Hiding results with css animations');      // 797
              $results.transition({                                    // 798
                animation: settings.transition + ' out',               // 800
                debug: settings.debug,                                 // 801
                verbose: settings.verbose,                             // 802
                duration: settings.duration,                           // 803
                queue: true                                            // 804
              });                                                      //
            } else {                                                   //
              module.debug('Hiding results with javascript');          // 809
              $results.stop().fadeOut(settings.duration, settings.easing);
            }                                                          //
            settings.onResultsClose.call($results);                    // 815
          }                                                            //
        },                                                             //
                                                                       //
        generateResults: function (response) {                         // 819
          module.debug('Generating html from response', response);     // 820
          var template = settings.templates[settings.type],            // 821
              isProperObject = $.isPlainObject(response[fields.results]) && !$.isEmptyObject(response[fields.results]),
              isProperArray = $.isArray(response[fields.results]) && response[fields.results].length > 0,
              html = '';                                               //
          if (isProperObject || isProperArray) {                       // 827
            if (settings.maxResults > 0) {                             // 828
              if (isProperObject) {                                    // 829
                if (settings.type == 'standard') {                     // 830
                  module.error(error.maxResults);                      // 831
                }                                                      //
              } else {                                                 //
                response[fields.results] = response[fields.results].slice(0, settings.maxResults);
              }                                                        //
            }                                                          //
            if ($.isFunction(template)) {                              // 838
              html = template(response, fields);                       // 839
            } else {                                                   //
              module.error(error.noTemplate, false);                   // 842
            }                                                          //
          } else {                                                     //
            html = module.displayMessage(error.noResults, 'empty');    // 846
          }                                                            //
          settings.onResults.call(element, response);                  // 848
          return html;                                                 // 849
        },                                                             //
                                                                       //
        displayMessage: function (text, type) {                        // 852
          type = type || 'standard';                                   // 853
          module.debug('Displaying message', text, type);              // 854
          module.addResults(settings.templates.message(text, type));   // 855
          return settings.templates.message(text, type);               // 856
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 859
          if ($.isPlainObject(name)) {                                 // 860
            $.extend(true, settings, name);                            // 861
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 864
          } else {                                                     //
            return settings[name];                                     // 867
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 870
          if ($.isPlainObject(name)) {                                 // 871
            $.extend(true, module, name);                              // 872
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 875
          } else {                                                     //
            return module[name];                                       // 878
          }                                                            //
        },                                                             //
        debug: function () {                                           // 881
          if (settings.debug) {                                        // 882
            if (settings.performance) {                                // 883
              module.performance.log(arguments);                       // 884
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 888
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 892
          if (settings.verbose && settings.debug) {                    // 893
            if (settings.performance) {                                // 894
              module.performance.log(arguments);                       // 895
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 899
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 903
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 905
        },                                                             //
        performance: {                                                 // 907
          log: function (message) {                                    // 908
            var currentTime, executionTime, previousTime;              // 909
            if (settings.performance) {                                // 914
              currentTime = new Date().getTime();                      // 915
              previousTime = time || currentTime;                      // 916
              executionTime = currentTime - previousTime;              // 917
              time = currentTime;                                      // 918
              performance.push({                                       // 919
                'Name': message[0],                                    // 920
                'Arguments': [].slice.call(message, 1) || '',          // 921
                'Element': element,                                    // 922
                'Execution Time': executionTime                        // 923
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 926
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 929
            var title = settings.name + ':',                           // 930
                totalTime = 0;                                         //
            time = false;                                              // 934
            clearTimeout(module.performance.timer);                    // 935
            $.each(performance, function (index, data) {               // 936
              totalTime += data['Execution Time'];                     // 937
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 939
            if (moduleSelector) {                                      // 940
              title += ' \'' + moduleSelector + '\'';                  // 941
            }                                                          //
            if ($allModules.length > 1) {                              // 943
              title += ' ' + '(' + $allModules.length + ')';           // 944
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 947
              if (console.table) {                                     // 948
                console.table(performance);                            // 949
              } else {                                                 //
                $.each(performance, function (index, data) {           // 952
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 956
            }                                                          //
            performance = [];                                          // 958
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 961
          var object = instance,                                       // 962
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 968
          context = element || context;                                // 969
          if (typeof query == 'string' && object !== undefined) {      // 970
            query = query.split(/[\. ]/);                              // 971
            maxDepth = query.length - 1;                               // 972
            $.each(query, function (depth, value) {                    // 973
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 979
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 982
                return false;                                          // 983
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 986
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 989
                return false;                                          // 990
              } else {                                                 //
                return false;                                          // 993
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 997
            response = found.apply(context, passedArguments);          // 998
          } else if (found !== undefined) {                            //
            response = found;                                          // 1001
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1003
            returnedValue.push(response);                              // 1004
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1007
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1010
          }                                                            //
          return found;                                                // 1012
        }                                                              //
      };                                                               //
      if (methodInvoked) {                                             // 1015
        if (instance === undefined) {                                  // 1016
          module.initialize();                                         // 1017
        }                                                              //
        module.invoke(query);                                          // 1019
      } else {                                                         //
        if (instance !== undefined) {                                  // 1022
          instance.invoke('destroy');                                  // 1023
        }                                                              //
        module.initialize();                                           // 1025
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1031
  };                                                                   //
                                                                       //
  $.fn.search.settings = {                                             // 1037
                                                                       //
    name: 'Search',                                                    // 1039
    namespace: 'search',                                               // 1040
                                                                       //
    debug: false,                                                      // 1042
    verbose: false,                                                    // 1043
    performance: true,                                                 // 1044
                                                                       //
    type: 'standard',                                                  // 1046
    // template to use (specified in settings.templates)               //
                                                                       //
    minCharacters: 1,                                                  // 1049
    // minimum characters required to search                           //
                                                                       //
    apiSettings: false,                                                // 1052
    // API config                                                      //
                                                                       //
    source: false,                                                     // 1055
    // object to search                                                //
                                                                       //
    searchFields: ['title', 'description'],                            // 1058
    // fields to search                                                //
                                                                       //
    displayField: '',                                                  // 1064
    // field to display in standard results template                   //
                                                                       //
    searchFullText: true,                                              // 1067
    // whether to include fuzzy results in local search                //
                                                                       //
    automatic: true,                                                   // 1070
    // whether to add events to prompt automatically                   //
                                                                       //
    hideDelay: 0,                                                      // 1073
    // delay before hiding menu after blur                             //
                                                                       //
    searchDelay: 200,                                                  // 1076
    // delay before searching                                          //
                                                                       //
    maxResults: 7,                                                     // 1079
    // maximum results returned from local                             //
                                                                       //
    cache: true,                                                       // 1082
    // whether to store lookups in local cache                         //
                                                                       //
    // transition settings                                             //
    transition: 'scale',                                               // 1086
    duration: 200,                                                     // 1087
    easing: 'easeOutExpo',                                             // 1088
                                                                       //
    // callbacks                                                       //
    onSelect: false,                                                   // 1091
    onResultsAdd: false,                                               // 1092
                                                                       //
    onSearchQuery: function (query) {},                                // 1094
    onResults: function (response) {},                                 // 1095
                                                                       //
    onResultsOpen: function () {},                                     // 1097
    onResultsClose: function () {},                                    // 1098
                                                                       //
    className: {                                                       // 1100
      active: 'active',                                                // 1101
      empty: 'empty',                                                  // 1102
      focus: 'focus',                                                  // 1103
      loading: 'loading',                                              // 1104
      results: 'results',                                              // 1105
      pressed: 'down'                                                  // 1106
    },                                                                 //
                                                                       //
    error: {                                                           // 1109
      source: 'Cannot search. No source used, and Semantic API module was not included',
      noResults: 'Your search returned no results',                    // 1111
      logging: 'Error in debug logging, exiting.',                     // 1112
      noEndpoint: 'No search endpoint was specified',                  // 1113
      noTemplate: 'A valid template name was not specified.',          // 1114
      serverError: 'There was an issue querying the server.',          // 1115
      maxResults: 'Results must be an array to use maxResults setting',
      method: 'The method you called is not defined.'                  // 1117
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1120
      cache: 'cache',                                                  // 1121
      results: 'results',                                              // 1122
      result: 'result'                                                 // 1123
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1126
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,                   // 1127
      beginsWith: '(?:\s|^)'                                           // 1128
    },                                                                 //
                                                                       //
    // maps api response attributes to internal representation         //
    fields: {                                                          // 1132
      categories: 'results', // array of categories (category view)    // 1133
      categoryName: 'name', // name of category (category view)        // 1134
      categoryResults: 'results', // array of results (category view)  // 1135
      description: 'description', // result description                // 1136
      image: 'image', // result image                                  // 1137
      price: 'price', // result price                                  // 1138
      results: 'results', // array of results (standard)               // 1139
      title: 'title', // result title                                  // 1140
      action: 'action', // "view more" object name                     // 1141
      actionText: 'text', // "view more" text                          // 1142
      actionURL: 'url' // "view more" url                              // 1143
    },                                                                 //
                                                                       //
    selector: {                                                        // 1146
      prompt: '.prompt',                                               // 1147
      searchButton: '.search.button',                                  // 1148
      results: '.results',                                             // 1149
      category: '.category',                                           // 1150
      result: '.result',                                               // 1151
      title: '.title, .name'                                           // 1152
    },                                                                 //
                                                                       //
    templates: {                                                       // 1155
      escape: function (string) {                                      // 1156
        var badChars = /[&<>"'`]/g,                                    // 1157
            shouldEscape = /[&<>"'`]/,                                 //
            escape = {                                                 //
          "&": "&amp;",                                                // 1161
          "<": "&lt;",                                                 // 1162
          ">": "&gt;",                                                 // 1163
          '"': "&quot;",                                               // 1164
          "'": "&#x27;",                                               // 1165
          "`": "&#x60;"                                                // 1166
        },                                                             //
            escapedChar = function (chr) {                             //
          return escape[chr];                                          // 1169
        };                                                             //
        if (shouldEscape.test(string)) {                               // 1172
          return string.replace(badChars, escapedChar);                // 1173
        }                                                              //
        return string;                                                 // 1175
      },                                                               //
      message: function (message, type) {                              // 1177
        var html = '';                                                 // 1178
        if (message !== undefined && type !== undefined) {             // 1181
          html += '' + '<div class="message ' + type + '">';           // 1182
          // message type                                              //
          if (type == 'empty') {                                       // 1186
            html += '' + '<div class="header">No Results</div class="header">' + '<div class="description">' + message + '</div class="description">';
          } else {                                                     //
            html += ' <div class="description">' + message + '</div>';
          }                                                            //
          html += '</div>';                                            // 1195
        }                                                              //
        return html;                                                   // 1197
      },                                                               //
      category: function (response, fields) {                          // 1199
        var html = '',                                                 // 1200
            escape = $.fn.search.settings.templates.escape;            //
        if (response[fields.categoryResults] !== undefined) {          // 1204
                                                                       //
          // each category                                             //
          $.each(response[fields.categoryResults], function (index, category) {
            if (category[fields.results] !== undefined && category.results.length > 0) {
                                                                       //
              html += '<div class="category">';                        // 1210
                                                                       //
              if (category[fields.categoryName] !== undefined) {       // 1212
                html += '<div class="name">' + category[fields.categoryName] + '</div>';
              }                                                        //
                                                                       //
              // each item inside category                             //
              $.each(category.results, function (index, result) {      // 1217
                if (response[fields.url]) {                            // 1218
                  html += '<a class="result" href="' + response[fields.url] + '">';
                } else {                                               //
                  html += '<a class="result">';                        // 1222
                }                                                      //
                if (result[fields.image] !== undefined) {              // 1224
                  html += '' + '<div class="image">' + ' <img src="' + result[fields.image] + '">' + '</div>';
                }                                                      //
                html += '<div class="content">';                       // 1231
                if (result[fields.price] !== undefined) {              // 1232
                  html += '<div class="price">' + result[fields.price] + '</div>';
                }                                                      //
                if (result[fields.title] !== undefined) {              // 1235
                  html += '<div class="title">' + result[fields.title] + '</div>';
                }                                                      //
                if (result[fields.description] !== undefined) {        // 1238
                  html += '<div class="description">' + result[fields.description] + '</div>';
                }                                                      //
                html += '' + '</div>';                                 // 1241
                html += '</a>';                                        // 1244
              });                                                      //
              html += '' + '</div>';                                   // 1246
            }                                                          //
          });                                                          //
          if (response[fields.action]) {                               // 1251
            html += '' + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">' + response[fields.action][fields.actionText] + '</a>';
          }                                                            //
          return html;                                                 // 1257
        }                                                              //
        return false;                                                  // 1259
      },                                                               //
      standard: function (response, fields) {                          // 1261
        var html = '';                                                 // 1262
        if (response[fields.results] !== undefined) {                  // 1265
                                                                       //
          // each result                                               //
          $.each(response[fields.results], function (index, result) {  // 1268
            if (response[fields.url]) {                                // 1269
              html += '<a class="result" href="' + response[fields.url] + '">';
            } else {                                                   //
              html += '<a class="result">';                            // 1273
            }                                                          //
            if (result[fields.image] !== undefined) {                  // 1275
              html += '' + '<div class="image">' + ' <img src="' + result[fields.image] + '">' + '</div>';
            }                                                          //
            html += '<div class="content">';                           // 1282
            if (result[fields.price] !== undefined) {                  // 1283
              html += '<div class="price">' + result[fields.price] + '</div>';
            }                                                          //
            if (result[fields.title] !== undefined) {                  // 1286
              html += '<div class="title">' + result[fields.title] + '</div>';
            }                                                          //
            if (result[fields.description] !== undefined) {            // 1289
              html += '<div class="description">' + result[fields.description] + '</div>';
            }                                                          //
            html += '' + '</div>';                                     // 1292
            html += '</a>';                                            // 1295
          });                                                          //
                                                                       //
          if (response[fields.action]) {                               // 1298
            html += '' + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">' + response[fields.action][fields.actionText] + '</a>';
          }                                                            //
          return html;                                                 // 1304
        }                                                              //
        return false;                                                  // 1306
      }                                                                //
    }                                                                  //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
