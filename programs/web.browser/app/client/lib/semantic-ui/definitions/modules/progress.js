(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/progress.js              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Progress                                            //
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
  $.fn.progress = function (parameters) {                              // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 36
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.progress.settings, parameters) : $.extend({}, $.fn.progress.settings),
          className = settings.className,                              //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $bar = $(this).find(selector.bar),                           //
          $progress = $(this).find(selector.progress),                 //
          $label = $(this).find(selector.label),                       //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          animating = false,                                           //
          transitionEnd,                                               //
          module;                                                      //
                                                                       //
      module = {                                                       // 65
                                                                       //
        initialize: function () {                                      // 67
          module.debug('Initializing progress bar', settings);         // 68
                                                                       //
          module.set.duration();                                       // 70
          module.set.transitionEvent();                                // 71
                                                                       //
          module.read.metadata();                                      // 73
          module.read.settings();                                      // 74
                                                                       //
          module.instantiate();                                        // 76
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 79
          module.verbose('Storing instance of progress', module);      // 80
          instance = module;                                           // 81
          $module.data(moduleNamespace, module);                       // 82
        },                                                             //
        destroy: function () {                                         // 86
          module.verbose('Destroying previous progress for', $module);
          clearInterval(instance.interval);                            // 88
          module.remove.state();                                       // 89
          $module.removeData(moduleNamespace);                         // 90
          instance = undefined;                                        // 91
        },                                                             //
                                                                       //
        reset: function () {                                           // 94
          module.set.percent(0);                                       // 95
        },                                                             //
                                                                       //
        complete: function () {                                        // 98
          if (module.percent === undefined || module.percent < 100) {  // 99
            module.set.percent(100);                                   // 100
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 104
          metadata: function () {                                      // 105
            var data = {                                               // 106
              percent: $module.data(metadata.percent),                 // 108
              total: $module.data(metadata.total),                     // 109
              value: $module.data(metadata.value)                      // 110
            };                                                         //
            if (data.percent) {                                        // 113
              module.debug('Current percent value set from metadata', data.percent);
              module.set.percent(data.percent);                        // 115
            }                                                          //
            if (data.total) {                                          // 117
              module.debug('Total value set from metadata', data.total);
              module.set.total(data.total);                            // 119
            }                                                          //
            if (data.value) {                                          // 121
              module.debug('Current value set from metadata', data.value);
              module.set.value(data.value);                            // 123
              module.set.progress(data.value);                         // 124
            }                                                          //
          },                                                           //
          settings: function () {                                      // 127
            if (settings.total !== false) {                            // 128
              module.debug('Current total set in settings', settings.total);
              module.set.total(settings.total);                        // 130
            }                                                          //
            if (settings.value !== false) {                            // 132
              module.debug('Current value set in settings', settings.value);
              module.set.value(settings.value);                        // 134
              module.set.progress(module.value);                       // 135
            }                                                          //
            if (settings.percent !== false) {                          // 137
              module.debug('Current percent set in settings', settings.percent);
              module.set.percent(settings.percent);                    // 139
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        increment: function (incrementValue) {                         // 144
          var maxValue, startValue, newValue;                          // 145
          if (module.has.total()) {                                    // 150
            startValue = module.get.value();                           // 151
            incrementValue = incrementValue || 1;                      // 152
                                                                       //
            newValue = startValue + incrementValue;                    // 154
            maxValue = module.get.total();                             // 155
                                                                       //
            module.debug('Incrementing value', startValue, newValue, maxValue);
            if (newValue > maxValue) {                                 // 158
              module.debug('Value cannot increment above total', maxValue);
              newValue = maxValue;                                     // 160
            }                                                          //
          } else {                                                     //
            startValue = module.get.percent();                         // 164
            incrementValue = incrementValue || module.get.randomValue();
                                                                       //
            newValue = startValue + incrementValue;                    // 167
            maxValue = 100;                                            // 168
                                                                       //
            module.debug('Incrementing percentage by', startValue, newValue);
            if (newValue > maxValue) {                                 // 171
              module.debug('Value cannot increment above 100 percent');
              newValue = maxValue;                                     // 173
            }                                                          //
          }                                                            //
          module.set.progress(newValue);                               // 176
        },                                                             //
        decrement: function (decrementValue) {                         // 178
          var total = module.get.total(),                              // 179
              startValue,                                              //
              newValue;                                                //
          if (total) {                                                 // 184
            startValue = module.get.value();                           // 185
            decrementValue = decrementValue || 1;                      // 186
            newValue = startValue - decrementValue;                    // 187
            module.debug('Decrementing value by', decrementValue, startValue);
          } else {                                                     //
            startValue = module.get.percent();                         // 191
            decrementValue = decrementValue || module.get.randomValue();
            newValue = startValue - decrementValue;                    // 193
            module.debug('Decrementing percentage by', decrementValue, startValue);
          }                                                            //
                                                                       //
          if (newValue < 0) {                                          // 197
            module.debug('Value cannot decrement below 0');            // 198
            newValue = 0;                                              // 199
          }                                                            //
          module.set.progress(newValue);                               // 201
        },                                                             //
                                                                       //
        has: {                                                         // 204
          total: function () {                                         // 205
            return module.get.total() !== false;                       // 206
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 210
          text: function (templateText) {                              // 211
            var value = module.value || 0,                             // 212
                total = module.total || 0,                             //
                percent = animating ? module.get.displayPercent() : module.percent || 0,
                left = module.total > 0 ? total - value : 100 - percent;
            templateText = templateText || '';                         // 222
            templateText = templateText.replace('{value}', value).replace('{total}', total).replace('{left}', left).replace('{percent}', percent);
            module.debug('Adding variables to progress bar text', templateText);
            return templateText;                                       // 230
          },                                                           //
                                                                       //
          randomValue: function () {                                   // 234
            module.debug('Generating random increment percentage');    // 235
            return Math.floor(Math.random() * settings.random.max + settings.random.min);
          },                                                           //
                                                                       //
          numericValue: function (value) {                             // 239
            return typeof value === 'string' ? value.replace(/[^\d.]/g, '') !== '' ? +value.replace(/[^\d.]/g, '') : false : value;
          },                                                           //
                                                                       //
          transitionEnd: function () {                                 // 248
            var element = document.createElement('element'),           // 249
                transitions = {                                        //
              'transition': 'transitionend',                           // 252
              'OTransition': 'oTransitionEnd',                         // 253
              'MozTransition': 'transitionend',                        // 254
              'WebkitTransition': 'webkitTransitionEnd'                // 255
            },                                                         //
                transition;                                            //
            for (transition in babelHelpers.sanitizeForInObject(transitions)) {
              if (element.style[transition] !== undefined) {           // 260
                return transitions[transition];                        // 261
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          // gets current displayed percentage (if animating values this is the intermediary value)
          displayPercent: function () {                                // 267
            var barWidth = $bar.width(),                               // 268
                totalWidth = $module.width(),                          //
                minDisplay = parseInt($bar.css('min-width'), 10),      //
                displayPercent = barWidth > minDisplay ? barWidth / totalWidth * 100 : module.percent;
            return settings.precision > 0 ? Math.round(displayPercent * (10 * settings.precision)) / (10 * settings.precision) : Math.round(displayPercent);
          },                                                           //
                                                                       //
          percent: function () {                                       // 282
            return module.percent || 0;                                // 283
          },                                                           //
          value: function () {                                         // 285
            return module.value || 0;                                  // 286
          },                                                           //
          total: function () {                                         // 288
            return module.total || false;                              // 289
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 293
          success: function () {                                       // 294
            return $module.hasClass(className.success);                // 295
          },                                                           //
          warning: function () {                                       // 297
            return $module.hasClass(className.warning);                // 298
          },                                                           //
          error: function () {                                         // 300
            return $module.hasClass(className.error);                  // 301
          },                                                           //
          active: function () {                                        // 303
            return $module.hasClass(className.active);                 // 304
          },                                                           //
          visible: function () {                                       // 306
            return $module.is(':visible');                             // 307
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 311
          state: function () {                                         // 312
            module.verbose('Removing stored state');                   // 313
            delete module.total;                                       // 314
            delete module.percent;                                     // 315
            delete module.value;                                       // 316
          },                                                           //
          active: function () {                                        // 318
            module.verbose('Removing active state');                   // 319
            $module.removeClass(className.active);                     // 320
          },                                                           //
          success: function () {                                       // 322
            module.verbose('Removing success state');                  // 323
            $module.removeClass(className.success);                    // 324
          },                                                           //
          warning: function () {                                       // 326
            module.verbose('Removing warning state');                  // 327
            $module.removeClass(className.warning);                    // 328
          },                                                           //
          error: function () {                                         // 330
            module.verbose('Removing error state');                    // 331
            $module.removeClass(className.error);                      // 332
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 336
          barWidth: function (value) {                                 // 337
            if (value > 100) {                                         // 338
              module.error(error.tooHigh, value);                      // 339
            } else if (value < 0) {                                    //
              module.error(error.tooLow, value);                       // 342
            } else {                                                   //
              $bar.css('width', value + '%');                          // 345
              $module.attr('data-percent', parseInt(value, 10));       // 348
            }                                                          //
          },                                                           //
          duration: function (duration) {                              // 353
            duration = duration || settings.duration;                  // 354
            duration = typeof duration == 'number' ? duration + 'ms' : duration;
            module.verbose('Setting progress bar transition duration', duration);
            $bar.css({                                                 // 360
              'transition-duration': duration                          // 362
            });                                                        //
          },                                                           //
          percent: function (percent) {                                // 366
            percent = typeof percent == 'string' ? +percent.replace('%', '') : percent;
            // round display percentage                                //
            percent = settings.precision > 0 ? Math.round(percent * (10 * settings.precision)) / (10 * settings.precision) : Math.round(percent);
            module.percent = percent;                                  // 376
            if (!module.has.total()) {                                 // 377
              module.value = settings.precision > 0 ? Math.round(percent / 100 * module.total * (10 * settings.precision)) / (10 * settings.precision) : Math.round(percent / 100 * module.total * 10) / 10;
              if (settings.limitValues) {                              // 382
                module.value = module.value > 100 ? 100 : module.value < 0 ? 0 : module.value;
              }                                                        //
            }                                                          //
            module.set.barWidth(percent);                              // 391
            module.set.labelInterval();                                // 392
            module.set.labels();                                       // 393
            settings.onChange.call(element, percent, module.value, module.total);
          },                                                           //
          labelInterval: function () {                                 // 396
            var animationCallback = function () {                      // 397
              module.verbose('Bar finished animating, removing continuous label updates');
              clearInterval(module.interval);                          // 400
              animating = false;                                       // 401
              module.set.labels();                                     // 402
            };                                                         //
            clearInterval(module.interval);                            // 405
            $bar.one(transitionEnd + eventNamespace, animationCallback);
            module.timer = setTimeout(animationCallback, settings.duration + 100);
            animating = true;                                          // 408
            module.interval = setInterval(module.set.labels, settings.framerate);
          },                                                           //
          labels: function () {                                        // 411
            module.verbose('Setting both bar progress and outer label text');
            module.set.barLabel();                                     // 413
            module.set.state();                                        // 414
          },                                                           //
          label: function (text) {                                     // 416
            text = text || '';                                         // 417
            if (text) {                                                // 418
              text = module.get.text(text);                            // 419
              module.debug('Setting label to text', text);             // 420
              $label.text(text);                                       // 421
            }                                                          //
          },                                                           //
          state: function (percent) {                                  // 424
            percent = percent !== undefined ? percent : module.percent;
            if (percent === 100) {                                     // 429
              if (settings.autoSuccess && !(module.is.warning() || module.is.error())) {
                module.set.success();                                  // 431
                module.debug('Automatically triggering success at 100%');
              } else {                                                 //
                module.verbose('Reached 100% removing active state');  // 435
                module.remove.active();                                // 436
              }                                                        //
            } else if (percent > 0) {                                  //
              module.verbose('Adjusting active progress bar label', percent);
              module.set.active();                                     // 441
            } else {                                                   //
              module.remove.active();                                  // 444
              module.set.label(settings.text.active);                  // 445
            }                                                          //
          },                                                           //
          barLabel: function (text) {                                  // 448
            if (text !== undefined) {                                  // 449
              $progress.text(module.get.text(text));                   // 450
            } else if (settings.label == 'ratio' && module.total) {    //
              module.debug('Adding ratio to bar label');               // 453
              $progress.text(module.get.text(settings.text.ratio));    // 454
            } else if (settings.label == 'percent') {                  //
              module.debug('Adding percentage to bar label');          // 457
              $progress.text(module.get.text(settings.text.percent));  // 458
            }                                                          //
          },                                                           //
          active: function (text) {                                    // 461
            text = text || settings.text.active;                       // 462
            module.debug('Setting active state');                      // 463
            if (settings.showActivity && !module.is.active()) {        // 464
              $module.addClass(className.active);                      // 465
            }                                                          //
            module.remove.warning();                                   // 467
            module.remove.error();                                     // 468
            module.remove.success();                                   // 469
            if (text) {                                                // 470
              module.set.label(text);                                  // 471
            }                                                          //
            settings.onActive.call(element, module.value, module.total);
          },                                                           //
          success: function (text) {                                   // 475
            text = text || settings.text.success;                      // 476
            module.debug('Setting success state');                     // 477
            $module.addClass(className.success);                       // 478
            module.remove.active();                                    // 479
            module.remove.warning();                                   // 480
            module.remove.error();                                     // 481
            module.complete();                                         // 482
            if (text) {                                                // 483
              module.set.label(text);                                  // 484
            }                                                          //
            settings.onSuccess.call(element, module.total);            // 486
          },                                                           //
          warning: function (text) {                                   // 488
            text = text || settings.text.warning;                      // 489
            module.debug('Setting warning state');                     // 490
            $module.addClass(className.warning);                       // 491
            module.remove.active();                                    // 492
            module.remove.success();                                   // 493
            module.remove.error();                                     // 494
            module.complete();                                         // 495
            if (text) {                                                // 496
              module.set.label(text);                                  // 497
            }                                                          //
            settings.onWarning.call(element, module.value, module.total);
          },                                                           //
          error: function (text) {                                     // 501
            text = text || settings.text.error;                        // 502
            module.debug('Setting error state');                       // 503
            $module.addClass(className.error);                         // 504
            module.remove.active();                                    // 505
            module.remove.success();                                   // 506
            module.remove.warning();                                   // 507
            module.complete();                                         // 508
            if (text) {                                                // 509
              module.set.label(text);                                  // 510
            }                                                          //
            settings.onError.call(element, module.value, module.total);
          },                                                           //
          transitionEvent: function () {                               // 514
            transitionEnd = module.get.transitionEnd();                // 515
          },                                                           //
          total: function (totalValue) {                               // 517
            module.total = totalValue;                                 // 518
          },                                                           //
          value: function (value) {                                    // 520
            module.value = value;                                      // 521
          },                                                           //
          progress: function (value) {                                 // 523
            var numericValue = module.get.numericValue(value),         // 524
                percentComplete;                                       //
            if (numericValue === false) {                              // 528
              module.error(error.nonNumeric, value);                   // 529
            }                                                          //
            if (module.has.total()) {                                  // 531
              module.set.value(numericValue);                          // 532
              percentComplete = numericValue / module.total * 100;     // 533
              module.debug('Calculating percent complete from total', percentComplete);
              module.set.percent(percentComplete);                     // 535
            } else {                                                   //
              percentComplete = numericValue;                          // 538
              module.debug('Setting value to exact percentage value', percentComplete);
              module.set.percent(percentComplete);                     // 540
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 545
          module.debug('Changing setting', name, value);               // 546
          if ($.isPlainObject(name)) {                                 // 547
            $.extend(true, settings, name);                            // 548
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 551
          } else {                                                     //
            return settings[name];                                     // 554
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 557
          if ($.isPlainObject(name)) {                                 // 558
            $.extend(true, module, name);                              // 559
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 562
          } else {                                                     //
            return module[name];                                       // 565
          }                                                            //
        },                                                             //
        debug: function () {                                           // 568
          if (settings.debug) {                                        // 569
            if (settings.performance) {                                // 570
              module.performance.log(arguments);                       // 571
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 575
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 579
          if (settings.verbose && settings.debug) {                    // 580
            if (settings.performance) {                                // 581
              module.performance.log(arguments);                       // 582
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 586
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 590
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 592
        },                                                             //
        performance: {                                                 // 594
          log: function (message) {                                    // 595
            var currentTime, executionTime, previousTime;              // 596
            if (settings.performance) {                                // 601
              currentTime = new Date().getTime();                      // 602
              previousTime = time || currentTime;                      // 603
              executionTime = currentTime - previousTime;              // 604
              time = currentTime;                                      // 605
              performance.push({                                       // 606
                'Name': message[0],                                    // 607
                'Arguments': [].slice.call(message, 1) || '',          // 608
                'Element': element,                                    // 609
                'Execution Time': executionTime                        // 610
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 613
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 616
            var title = settings.name + ':',                           // 617
                totalTime = 0;                                         //
            time = false;                                              // 621
            clearTimeout(module.performance.timer);                    // 622
            $.each(performance, function (index, data) {               // 623
              totalTime += data['Execution Time'];                     // 624
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 626
            if (moduleSelector) {                                      // 627
              title += ' \'' + moduleSelector + '\'';                  // 628
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 631
              if (console.table) {                                     // 632
                console.table(performance);                            // 633
              } else {                                                 //
                $.each(performance, function (index, data) {           // 636
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 640
            }                                                          //
            performance = [];                                          // 642
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 645
          var object = instance,                                       // 646
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 652
          context = element || context;                                // 653
          if (typeof query == 'string' && object !== undefined) {      // 654
            query = query.split(/[\. ]/);                              // 655
            maxDepth = query.length - 1;                               // 656
            $.each(query, function (depth, value) {                    // 657
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 663
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 666
                return false;                                          // 667
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 670
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 673
                return false;                                          // 674
              } else {                                                 //
                module.error(error.method, query);                     // 677
                return false;                                          // 678
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 682
            response = found.apply(context, passedArguments);          // 683
          } else if (found !== undefined) {                            //
            response = found;                                          // 686
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 688
            returnedValue.push(response);                              // 689
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 692
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 695
          }                                                            //
          return found;                                                // 697
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 701
        if (instance === undefined) {                                  // 702
          module.initialize();                                         // 703
        }                                                              //
        module.invoke(query);                                          // 705
      } else {                                                         //
        if (instance !== undefined) {                                  // 708
          instance.invoke('destroy');                                  // 709
        }                                                              //
        module.initialize();                                           // 711
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 716
  };                                                                   //
                                                                       //
  $.fn.progress.settings = {                                           // 722
                                                                       //
    name: 'Progress',                                                  // 724
    namespace: 'progress',                                             // 725
                                                                       //
    debug: false,                                                      // 727
    verbose: false,                                                    // 728
    performance: true,                                                 // 729
                                                                       //
    random: {                                                          // 731
      min: 2,                                                          // 732
      max: 5                                                           // 733
    },                                                                 //
                                                                       //
    duration: 300,                                                     // 736
                                                                       //
    autoSuccess: true,                                                 // 738
    showActivity: true,                                                // 739
    limitValues: true,                                                 // 740
                                                                       //
    label: 'percent',                                                  // 742
    precision: 0,                                                      // 743
    framerate: 1000 / 30, /// 30 fps                                   // 744
                                                                       //
    percent: false,                                                    // 746
    total: false,                                                      // 747
    value: false,                                                      // 748
                                                                       //
    onChange: function (percent, value, total) {},                     // 750
    onSuccess: function (total) {},                                    // 751
    onActive: function (value, total) {},                              // 752
    onError: function (value, total) {},                               // 753
    onWarning: function (value, total) {},                             // 754
                                                                       //
    error: {                                                           // 756
      method: 'The method you called is not defined.',                 // 757
      nonNumeric: 'Progress value is non numeric',                     // 758
      tooHigh: 'Value specified is above 100%',                        // 759
      tooLow: 'Value specified is below 0%'                            // 760
    },                                                                 //
                                                                       //
    regExp: {                                                          // 763
      variable: /\{\$*[A-z0-9]+\}/g                                    // 764
    },                                                                 //
                                                                       //
    metadata: {                                                        // 767
      percent: 'percent',                                              // 768
      total: 'total',                                                  // 769
      value: 'value'                                                   // 770
    },                                                                 //
                                                                       //
    selector: {                                                        // 773
      bar: '> .bar',                                                   // 774
      label: '> .label',                                               // 775
      progress: '.bar > .progress'                                     // 776
    },                                                                 //
                                                                       //
    text: {                                                            // 779
      active: false,                                                   // 780
      error: false,                                                    // 781
      success: false,                                                  // 782
      warning: false,                                                  // 783
      percent: '{percent}%',                                           // 784
      ratio: '{value} of {total}'                                      // 785
    },                                                                 //
                                                                       //
    className: {                                                       // 788
      active: 'active',                                                // 789
      error: 'error',                                                  // 790
      success: 'success',                                              // 791
      warning: 'warning'                                               // 792
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
