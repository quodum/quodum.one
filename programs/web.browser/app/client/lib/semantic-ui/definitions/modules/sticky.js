(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/sticky.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Sticky                                              //
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
  $.fn.sticky = function (parameters) {                                // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 34
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.sticky.settings, parameters) : $.extend({}, $.fn.sticky.settings),
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $window = $(window),                                         //
          $scroll = $(settings.scrollContext),                         //
          $container,                                                  //
          $context,                                                    //
          selector = $module.selector || '',                           //
          instance = $module.data(moduleNamespace),                    //
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);                                       // 61
      },                                                               //
          element = this,                                              //
          observer,                                                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 68
                                                                       //
        initialize: function () {                                      // 70
                                                                       //
          module.determineContainer();                                 // 72
          module.determineContext();                                   // 73
          module.verbose('Initializing sticky', settings, $container);
                                                                       //
          module.save.positions();                                     // 76
          module.checkErrors();                                        // 77
          module.bind.events();                                        // 78
                                                                       //
          if (settings.observeChanges) {                               // 80
            module.observeChanges();                                   // 81
          }                                                            //
          module.instantiate();                                        // 83
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 86
          module.verbose('Storing instance of module', module);        // 87
          instance = module;                                           // 88
          $module.data(moduleNamespace, module);                       // 89
        },                                                             //
                                                                       //
        destroy: function () {                                         // 94
          module.verbose('Destroying previous instance');              // 95
          module.reset();                                              // 96
          if (observer) {                                              // 97
            observer.disconnect();                                     // 98
          }                                                            //
          $window.off('load' + eventNamespace, module.event.load).off('resize' + eventNamespace, module.event.resize);
          $scroll.off('scrollchange' + eventNamespace, module.event.scrollchange);
          $module.removeData(moduleNamespace);                         // 107
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 110
          var context = $context[0];                                   // 111
          if ('MutationObserver' in window) {                          // 114
            observer = new MutationObserver(function (mutations) {     // 115
              clearTimeout(module.timer);                              // 116
              module.timer = setTimeout(function () {                  // 117
                module.verbose('DOM tree modified, updating sticky menu', mutations);
                module.refresh();                                      // 119
              }, 100);                                                 //
            });                                                        //
            observer.observe(element, {                                // 122
              childList: true,                                         // 123
              subtree: true                                            // 124
            });                                                        //
            observer.observe(context, {                                // 126
              childList: true,                                         // 127
              subtree: true                                            // 128
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 130
          }                                                            //
        },                                                             //
                                                                       //
        determineContainer: function () {                              // 134
          $container = $module.offsetParent();                         // 135
        },                                                             //
                                                                       //
        determineContext: function () {                                // 138
          if (settings.context) {                                      // 139
            $context = $(settings.context);                            // 140
          } else {                                                     //
            $context = $container;                                     // 143
          }                                                            //
          if ($context.length === 0) {                                 // 145
            module.error(error.invalidContext, settings.context, $module);
            return;                                                    // 147
          }                                                            //
        },                                                             //
                                                                       //
        checkErrors: function () {                                     // 151
          if (module.is.hidden()) {                                    // 152
            module.error(error.visible, $module);                      // 153
          }                                                            //
          if (module.cache.element.height > module.cache.context.height) {
            module.reset();                                            // 156
            module.error(error.elementSize, $module);                  // 157
            return;                                                    // 158
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 162
          events: function () {                                        // 163
            $window.on('load' + eventNamespace, module.event.load).on('resize' + eventNamespace, module.event.resize);
            // pub/sub pattern                                         //
            $scroll.off('scroll' + eventNamespace).on('scroll' + eventNamespace, module.event.scroll).on('scrollchange' + eventNamespace, module.event.scrollchange);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 177
          load: function () {                                          // 178
            module.verbose('Page contents finished loading');          // 179
            requestAnimationFrame(module.refresh);                     // 180
          },                                                           //
          resize: function () {                                        // 182
            module.verbose('Window resized');                          // 183
            requestAnimationFrame(module.refresh);                     // 184
          },                                                           //
          scroll: function () {                                        // 186
            requestAnimationFrame(function () {                        // 187
              $scroll.triggerHandler('scrollchange' + eventNamespace, $scroll.scrollTop());
            });                                                        //
          },                                                           //
          scrollchange: function (event, scrollPosition) {             // 191
            module.stick(scrollPosition);                              // 192
            settings.onScroll.call(element);                           // 193
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function (hardRefresh) {                              // 197
          module.reset();                                              // 198
          if (!settings.context) {                                     // 199
            module.determineContext();                                 // 200
          }                                                            //
          if (hardRefresh) {                                           // 202
            module.determineContainer();                               // 203
          }                                                            //
          module.save.positions();                                     // 205
          module.stick();                                              // 206
          settings.onReposition.call(element);                         // 207
        },                                                             //
                                                                       //
        supports: {                                                    // 210
          sticky: function () {                                        // 211
            var $element = $('<div/>'),                                // 212
                element = $element[0];                                 //
            $element.addClass(className.supported);                    // 216
            return $element.css('position').match('sticky');           // 217
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 221
          lastScroll: function (scroll) {                              // 222
            module.lastScroll = scroll;                                // 223
          },                                                           //
          elementScroll: function (scroll) {                           // 225
            module.elementScroll = scroll;                             // 226
          },                                                           //
          positions: function () {                                     // 228
            var window = {                                             // 229
              height: $window.height()                                 // 231
            },                                                         //
                element = {                                            //
              margin: {                                                // 234
                top: parseInt($module.css('margin-top'), 10),          // 235
                bottom: parseInt($module.css('margin-bottom'), 10)     // 236
              },                                                       //
              offset: $module.offset(),                                // 238
              width: $module.outerWidth(),                             // 239
              height: $module.outerHeight()                            // 240
            },                                                         //
                context = {                                            //
              offset: $context.offset(),                               // 243
              height: $context.outerHeight()                           // 244
            },                                                         //
                container = {                                          //
              height: $container.outerHeight()                         // 247
            };                                                         //
            module.cache = {                                           // 250
              fits: element.height < window.height,                    // 251
              window: {                                                // 252
                height: window.height                                  // 253
              },                                                       //
              element: {                                               // 255
                margin: element.margin,                                // 256
                top: element.offset.top - element.margin.top,          // 257
                left: element.offset.left,                             // 258
                width: element.width,                                  // 259
                height: element.height,                                // 260
                bottom: element.offset.top + element.height            // 261
              },                                                       //
              context: {                                               // 263
                top: context.offset.top,                               // 264
                height: context.height,                                // 265
                bottom: context.offset.top + context.height            // 266
              }                                                        //
            };                                                         //
            module.set.containerSize();                                // 269
            module.set.size();                                         // 270
            module.stick();                                            // 271
            module.debug('Caching element positions', module.cache);   // 272
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 276
          direction: function (scroll) {                               // 277
            var direction = 'down';                                    // 278
            scroll = scroll || $scroll.scrollTop();                    // 281
            if (module.lastScroll !== undefined) {                     // 282
              if (module.lastScroll < scroll) {                        // 283
                direction = 'down';                                    // 284
              } else if (module.lastScroll > scroll) {                 //
                direction = 'up';                                      // 287
              }                                                        //
            }                                                          //
            return direction;                                          // 290
          },                                                           //
          scrollChange: function (scroll) {                            // 292
            scroll = scroll || $scroll.scrollTop();                    // 293
            return module.lastScroll ? scroll - module.lastScroll : 0;
          },                                                           //
          currentElementScroll: function () {                          // 299
            if (module.elementScroll) {                                // 300
              return module.elementScroll;                             // 301
            }                                                          //
            return module.is.top() ? Math.abs(parseInt($module.css('top'), 10)) || 0 : Math.abs(parseInt($module.css('bottom'), 10)) || 0;
          },                                                           //
                                                                       //
          elementScroll: function (scroll) {                           // 309
            scroll = scroll || $scroll.scrollTop();                    // 310
            var element = module.cache.element,                        // 311
                window = module.cache.window,                          //
                delta = module.get.scrollChange(scroll),               //
                maxScroll = element.height - window.height + settings.offset,
                elementScroll = module.get.currentElementScroll(),     //
                possibleScroll = elementScroll + delta;                //
            if (module.cache.fits || possibleScroll < 0) {             // 319
              elementScroll = 0;                                       // 320
            } else if (possibleScroll > maxScroll) {                   //
              elementScroll = maxScroll;                               // 323
            } else {                                                   //
              elementScroll = possibleScroll;                          // 326
            }                                                          //
            return elementScroll;                                      // 328
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 332
          lastScroll: function () {                                    // 333
            delete module.lastScroll;                                  // 334
          },                                                           //
          elementScroll: function (scroll) {                           // 336
            delete module.elementScroll;                               // 337
          },                                                           //
          offset: function () {                                        // 339
            $module.css('margin-top', '');                             // 340
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 344
          offset: function () {                                        // 345
            module.verbose('Setting offset on element', settings.offset);
            $module.css('margin-top', settings.offset);                // 347
          },                                                           //
          containerSize: function () {                                 // 351
            var tagName = $container.get(0).tagName;                   // 352
            if (tagName === 'HTML' || tagName == 'body') {             // 355
              // this can trigger for too many reasons                 //
              //module.error(error.container, tagName, $module);       //
              module.determineContainer();                             // 358
            } else {                                                   //
              if (Math.abs($container.outerHeight() - module.cache.context.height) > settings.jitter) {
                module.debug('Context has padding, specifying exact height for container', module.cache.context.height);
                $container.css({                                       // 363
                  height: module.cache.context.height                  // 364
                });                                                    //
              }                                                        //
            }                                                          //
          },                                                           //
          minimumSize: function () {                                   // 369
            var element = module.cache.element;                        // 370
            $container.css('min-height', element.height);              // 373
          },                                                           //
          scroll: function (scroll) {                                  // 377
            module.debug('Setting scroll on element', scroll);         // 378
            if (module.elementScroll == scroll) {                      // 379
              return;                                                  // 380
            }                                                          //
            if (module.is.top()) {                                     // 382
              $module.css('bottom', '').css('top', -scroll);           // 383
            }                                                          //
            if (module.is.bottom()) {                                  // 388
              $module.css('top', '').css('bottom', scroll);            // 389
            }                                                          //
          },                                                           //
          size: function () {                                          // 395
            if (module.cache.element.height !== 0 && module.cache.element.width !== 0) {
              element.style.setProperty('width', module.cache.element.width + 'px', 'important');
              element.style.setProperty('height', module.cache.element.height + 'px', 'important');
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 403
          top: function () {                                           // 404
            return $module.hasClass(className.top);                    // 405
          },                                                           //
          bottom: function () {                                        // 407
            return $module.hasClass(className.bottom);                 // 408
          },                                                           //
          initialPosition: function () {                               // 410
            return !module.is.fixed() && !module.is.bound();           // 411
          },                                                           //
          hidden: function () {                                        // 413
            return !$module.is(':visible');                            // 414
          },                                                           //
          bound: function () {                                         // 416
            return $module.hasClass(className.bound);                  // 417
          },                                                           //
          fixed: function () {                                         // 419
            return $module.hasClass(className.fixed);                  // 420
          }                                                            //
        },                                                             //
                                                                       //
        stick: function (scroll) {                                     // 424
          var cachedPosition = scroll || $scroll.scrollTop(),          // 425
              cache = module.cache,                                    //
              fits = cache.fits,                                       //
              element = cache.element,                                 //
              window = cache.window,                                   //
              context = cache.context,                                 //
              offset = module.is.bottom() && settings.pushing ? settings.bottomOffset : settings.offset,
              scroll = {                                               //
            top: cachedPosition + offset,                              // 436
            bottom: cachedPosition + offset + window.height            // 437
          },                                                           //
              direction = module.get.direction(scroll.top),            //
              elementScroll = fits ? 0 : module.get.elementScroll(scroll.top),
                                                                       //
          // shorthand                                                 //
          doesntFit = !fits,                                           // 445
              elementVisible = element.height !== 0;                   //
                                                                       //
          if (elementVisible) {                                        // 449
                                                                       //
            if (module.is.initialPosition()) {                         // 451
              if (scroll.top >= context.bottom) {                      // 452
                module.debug('Initial element position is bottom of container');
                module.bindBottom();                                   // 454
              } else if (scroll.top > element.top) {                   //
                if (element.height + scroll.top - elementScroll >= context.bottom) {
                  module.debug('Initial element position is bottom of container');
                  module.bindBottom();                                 // 459
                } else {                                               //
                  module.debug('Initial element position is fixed');   // 462
                  module.fixTop();                                     // 463
                }                                                      //
              }                                                        //
            } else if (module.is.fixed()) {                            //
                                                                       //
              // currently fixed top                                   //
              if (module.is.top()) {                                   // 471
                if (scroll.top <= element.top) {                       // 472
                  module.debug('Fixed element reached top of container');
                  module.setInitialPosition();                         // 474
                } else if (element.height + scroll.top - elementScroll >= context.bottom) {
                  module.debug('Fixed element reached bottom of container');
                  module.bindBottom();                                 // 478
                }                                                      //
                // scroll element if larger than screen                //
                else if (doesntFit) {                                  //
                    module.set.scroll(elementScroll);                  // 482
                    module.save.lastScroll(scroll.top);                // 483
                    module.save.elementScroll(elementScroll);          // 484
                  }                                                    //
              }                                                        //
                                                                       //
              // currently fixed bottom                                //
              else if (module.is.bottom()) {                           //
                                                                       //
                  // top edge                                          //
                  if (scroll.bottom - element.height <= element.top) {
                    module.debug('Bottom fixed rail has reached top of container');
                    module.setInitialPosition();                       // 494
                  }                                                    //
                  // bottom edge                                       //
                  else if (scroll.bottom >= context.bottom) {          //
                      module.debug('Bottom fixed rail has reached bottom of container');
                      module.bindBottom();                             // 499
                    }                                                  //
                    // scroll element if larger than screen            //
                    else if (doesntFit) {                              //
                        module.set.scroll(elementScroll);              // 503
                        module.save.lastScroll(scroll.top);            // 504
                        module.save.elementScroll(elementScroll);      // 505
                      }                                                //
                }                                                      //
            } else if (module.is.bottom()) {                           //
              if (settings.pushing) {                                  // 511
                if (module.is.bound() && scroll.bottom <= context.bottom) {
                  module.debug('Fixing bottom attached element to bottom of browser.');
                  module.fixBottom();                                  // 514
                }                                                      //
              } else {                                                 //
                if (module.is.bound() && scroll.top <= context.bottom - element.height) {
                  module.debug('Fixing bottom attached element to top of browser.');
                  module.fixTop();                                     // 520
                }                                                      //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        bindTop: function () {                                         // 527
          module.debug('Binding element to top of parent container');  // 528
          module.remove.offset();                                      // 529
          $module.css({                                                // 530
            left: '',                                                  // 532
            top: '',                                                   // 533
            marginBottom: ''                                           // 534
          }).removeClass(className.fixed).removeClass(className.bottom).addClass(className.bound).addClass(className.top);
          settings.onTop.call(element);                                // 541
          settings.onUnstick.call(element);                            // 542
        },                                                             //
        bindBottom: function () {                                      // 544
          module.debug('Binding element to bottom of parent container');
          module.remove.offset();                                      // 546
          $module.css({                                                // 547
            left: '',                                                  // 549
            top: ''                                                    // 550
          }).removeClass(className.fixed).removeClass(className.top).addClass(className.bound).addClass(className.bottom);
          settings.onBottom.call(element);                             // 557
          settings.onUnstick.call(element);                            // 558
        },                                                             //
                                                                       //
        setInitialPosition: function () {                              // 561
          module.debug('Returning to initial position');               // 562
          module.unfix();                                              // 563
          module.unbind();                                             // 564
        },                                                             //
                                                                       //
        fixTop: function () {                                          // 568
          module.debug('Fixing element to top of page');               // 569
          module.set.minimumSize();                                    // 570
          module.set.offset();                                         // 571
          $module.css({                                                // 572
            left: module.cache.element.left,                           // 574
            bottom: '',                                                // 575
            marginBottom: ''                                           // 576
          }).removeClass(className.bound).removeClass(className.bottom).addClass(className.fixed).addClass(className.top);
          settings.onStick.call(element);                              // 583
        },                                                             //
                                                                       //
        fixBottom: function () {                                       // 586
          module.debug('Sticking element to bottom of page');          // 587
          module.set.minimumSize();                                    // 588
          module.set.offset();                                         // 589
          $module.css({                                                // 590
            left: module.cache.element.left,                           // 592
            bottom: '',                                                // 593
            marginBottom: ''                                           // 594
          }).removeClass(className.bound).removeClass(className.top).addClass(className.fixed).addClass(className.bottom);
          settings.onStick.call(element);                              // 601
        },                                                             //
                                                                       //
        unbind: function () {                                          // 604
          if (module.is.bound()) {                                     // 605
            module.debug('Removing container bound position on element');
            module.remove.offset();                                    // 607
            $module.removeClass(className.bound).removeClass(className.top).removeClass(className.bottom);
          }                                                            //
        },                                                             //
                                                                       //
        unfix: function () {                                           // 616
          if (module.is.fixed()) {                                     // 617
            module.debug('Removing fixed position on element');        // 618
            module.remove.offset();                                    // 619
            $module.removeClass(className.fixed).removeClass(className.top).removeClass(className.bottom);
            settings.onUnstick.call(element);                          // 625
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 629
          module.debug('Reseting elements position');                  // 630
          module.unbind();                                             // 631
          module.unfix();                                              // 632
          module.resetCSS();                                           // 633
          module.remove.offset();                                      // 634
          module.remove.lastScroll();                                  // 635
        },                                                             //
                                                                       //
        resetCSS: function () {                                        // 638
          $module.css({                                                // 639
            width: '',                                                 // 641
            height: ''                                                 // 642
          });                                                          //
          $container.css({                                             // 645
            height: ''                                                 // 647
          });                                                          //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 652
          if ($.isPlainObject(name)) {                                 // 653
            $.extend(true, settings, name);                            // 654
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 657
          } else {                                                     //
            return settings[name];                                     // 660
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 663
          if ($.isPlainObject(name)) {                                 // 664
            $.extend(true, module, name);                              // 665
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 668
          } else {                                                     //
            return module[name];                                       // 671
          }                                                            //
        },                                                             //
        debug: function () {                                           // 674
          if (settings.debug) {                                        // 675
            if (settings.performance) {                                // 676
              module.performance.log(arguments);                       // 677
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 681
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 685
          if (settings.verbose && settings.debug) {                    // 686
            if (settings.performance) {                                // 687
              module.performance.log(arguments);                       // 688
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 692
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 696
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 698
        },                                                             //
        performance: {                                                 // 700
          log: function (message) {                                    // 701
            var currentTime, executionTime, previousTime;              // 702
            if (settings.performance) {                                // 707
              currentTime = new Date().getTime();                      // 708
              previousTime = time || currentTime;                      // 709
              executionTime = currentTime - previousTime;              // 710
              time = currentTime;                                      // 711
              performance.push({                                       // 712
                'Name': message[0],                                    // 713
                'Arguments': [].slice.call(message, 1) || '',          // 714
                'Element': element,                                    // 715
                'Execution Time': executionTime                        // 716
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 719
            module.performance.timer = setTimeout(module.performance.display, 0);
          },                                                           //
          display: function () {                                       // 722
            var title = settings.name + ':',                           // 723
                totalTime = 0;                                         //
            time = false;                                              // 727
            clearTimeout(module.performance.timer);                    // 728
            $.each(performance, function (index, data) {               // 729
              totalTime += data['Execution Time'];                     // 730
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 732
            if (moduleSelector) {                                      // 733
              title += ' \'' + moduleSelector + '\'';                  // 734
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 737
              if (console.table) {                                     // 738
                console.table(performance);                            // 739
              } else {                                                 //
                $.each(performance, function (index, data) {           // 742
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 746
            }                                                          //
            performance = [];                                          // 748
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 751
          var object = instance,                                       // 752
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 758
          context = element || context;                                // 759
          if (typeof query == 'string' && object !== undefined) {      // 760
            query = query.split(/[\. ]/);                              // 761
            maxDepth = query.length - 1;                               // 762
            $.each(query, function (depth, value) {                    // 763
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 769
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 772
                return false;                                          // 773
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 776
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 779
                return false;                                          // 780
              } else {                                                 //
                return false;                                          // 783
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 787
            response = found.apply(context, passedArguments);          // 788
          } else if (found !== undefined) {                            //
            response = found;                                          // 791
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 793
            returnedValue.push(response);                              // 794
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 797
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 800
          }                                                            //
          return found;                                                // 802
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 806
        if (instance === undefined) {                                  // 807
          module.initialize();                                         // 808
        }                                                              //
        module.invoke(query);                                          // 810
      } else {                                                         //
        if (instance !== undefined) {                                  // 813
          instance.invoke('destroy');                                  // 814
        }                                                              //
        module.initialize();                                           // 816
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 821
  };                                                                   //
                                                                       //
  $.fn.sticky.settings = {                                             // 827
                                                                       //
    name: 'Sticky',                                                    // 829
    namespace: 'sticky',                                               // 830
                                                                       //
    debug: false,                                                      // 832
    verbose: true,                                                     // 833
    performance: true,                                                 // 834
                                                                       //
    // whether to stick in the opposite direction on scroll up         //
    pushing: false,                                                    // 837
                                                                       //
    context: false,                                                    // 839
                                                                       //
    // Context to watch scroll events                                  //
    scrollContext: window,                                             // 842
                                                                       //
    // Offset to adjust scroll                                         //
    offset: 0,                                                         // 845
                                                                       //
    // Offset to adjust scroll when attached to bottom of screen       //
    bottomOffset: 0,                                                   // 848
                                                                       //
    jitter: 5, // will only set container height if difference between context and container is larger than this number
                                                                       //
    // Whether to automatically observe changes with Mutation Observers
    observeChanges: false,                                             // 853
                                                                       //
    // Called when position is recalculated                            //
    onReposition: function () {},                                      // 856
                                                                       //
    // Called on each scroll                                           //
    onScroll: function () {},                                          // 859
                                                                       //
    // Called when element is stuck to viewport                        //
    onStick: function () {},                                           // 862
                                                                       //
    // Called when element is unstuck from viewport                    //
    onUnstick: function () {},                                         // 865
                                                                       //
    // Called when element reaches top of context                      //
    onTop: function () {},                                             // 868
                                                                       //
    // Called when element reaches bottom of context                   //
    onBottom: function () {},                                          // 871
                                                                       //
    error: {                                                           // 873
      container: 'Sticky element must be inside a relative container',
      visible: 'Element is hidden, you must call refresh after element becomes visible',
      method: 'The method you called is not defined.',                 // 876
      invalidContext: 'Context specified does not exist',              // 877
      elementSize: 'Sticky element is larger than its container, cannot create sticky.'
    },                                                                 //
                                                                       //
    className: {                                                       // 881
      bound: 'bound',                                                  // 882
      fixed: 'fixed',                                                  // 883
      supported: 'native',                                             // 884
      top: 'top',                                                      // 885
      bottom: 'bottom'                                                 // 886
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
