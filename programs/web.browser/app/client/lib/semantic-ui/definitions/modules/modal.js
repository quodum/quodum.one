(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/modal.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Modal                                               //
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
  $.fn.modal = function (parameters) {                                 // 20
    var $allModules = $(this),                                         // 21
        $window = $(window),                                           //
        $document = $(document),                                       //
        $body = $('body'),                                             //
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 40
    },                                                                 //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 45
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.modal.settings, parameters) : $.extend({}, $.fn.modal.settings),
          selector = settings.selector,                                //
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $close = $module.find(selector.close),                       //
          $allModals,                                                  //
          $otherModals,                                                //
          $focusedElement,                                             //
          $dimmable,                                                   //
          $dimmer,                                                     //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          elementNamespace,                                            //
          id,                                                          //
          observer,                                                    //
          module;                                                      //
      module = {                                                       // 78
                                                                       //
        initialize: function () {                                      // 80
          module.verbose('Initializing dimmer', $context);             // 81
                                                                       //
          module.create.id();                                          // 83
          module.create.dimmer();                                      // 84
          module.refreshModals();                                      // 85
                                                                       //
          module.bind.events();                                        // 87
          if (settings.observeChanges) {                               // 88
            module.observeChanges();                                   // 89
          }                                                            //
          module.instantiate();                                        // 91
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 94
          module.verbose('Storing instance of modal');                 // 95
          instance = module;                                           // 96
          $module.data(moduleNamespace, instance);                     // 97
        },                                                             //
                                                                       //
        create: {                                                      // 102
          dimmer: function () {                                        // 103
            var defaultSettings = {                                    // 104
              debug: settings.debug,                                   // 106
              dimmerName: 'modals',                                    // 107
              duration: {                                              // 108
                show: settings.duration,                               // 109
                hide: settings.duration                                // 110
              }                                                        //
            },                                                         //
                dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings);
            if (settings.inverted) {                                   // 115
              dimmerSettings.variation = dimmerSettings.variation !== undefined ? dimmerSettings.variation + ' inverted' : 'inverted';
            }                                                          //
            if ($.fn.dimmer === undefined) {                           // 121
              module.error(error.dimmer);                              // 122
              return;                                                  // 123
            }                                                          //
            module.debug('Creating dimmer with settings', dimmerSettings);
            $dimmable = $context.dimmer(dimmerSettings);               // 126
            if (settings.detachable) {                                 // 127
              module.verbose('Modal is detachable, moving content into dimmer');
              $dimmable.dimmer('add content', $module);                // 129
            } else {                                                   //
              module.set.undetached();                                 // 132
            }                                                          //
            if (settings.blurring) {                                   // 134
              $dimmable.addClass(className.blurring);                  // 135
            }                                                          //
            $dimmer = $dimmable.dimmer('get dimmer');                  // 137
          },                                                           //
          id: function () {                                            // 139
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;                               // 141
            module.verbose('Creating unique id for element', id);      // 142
          }                                                            //
        },                                                             //
                                                                       //
        destroy: function () {                                         // 146
          module.verbose('Destroying previous modal');                 // 147
          $module.removeData(moduleNamespace).off(eventNamespace);     // 148
          $window.off(elementNamespace);                               // 152
          $close.off(eventNamespace);                                  // 153
          $context.dimmer('destroy');                                  // 154
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 157
          if ('MutationObserver' in window) {                          // 158
            observer = new MutationObserver(function (mutations) {     // 159
              module.debug('DOM tree modified, refreshing');           // 160
              module.refresh();                                        // 161
            });                                                        //
            observer.observe(element, {                                // 163
              childList: true,                                         // 164
              subtree: true                                            // 165
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 167
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 171
          module.remove.scrolling();                                   // 172
          module.cacheSizes();                                         // 173
          module.set.screenHeight();                                   // 174
          module.set.type();                                           // 175
          module.set.position();                                       // 176
        },                                                             //
                                                                       //
        refreshModals: function () {                                   // 179
          $otherModals = $module.siblings(selector.modal);             // 180
          $allModals = $otherModals.add($module);                      // 181
        },                                                             //
                                                                       //
        attachEvents: function (selector, event) {                     // 184
          var $toggle = $(selector);                                   // 185
          event = $.isFunction(module[event]) ? module[event] : module.toggle;
          if ($toggle.length > 0) {                                    // 192
            module.debug('Attaching modal events to element', selector, event);
            $toggle.off(eventNamespace).on('click' + eventNamespace, event);
          } else {                                                     //
            module.error(error.notFound, selector);                    // 200
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 204
          events: function () {                                        // 205
            module.verbose('Attaching events');                        // 206
            $module.on('click' + eventNamespace, selector.close, module.event.close).on('click' + eventNamespace, selector.approve, module.event.approve).on('click' + eventNamespace, selector.deny, module.event.deny);
            $window.on('resize' + elementNamespace, module.event.resize);
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 218
          id: function () {                                            // 219
            return (Math.random().toString(16) + '000000000').substr(2, 8);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 224
          approve: function () {                                       // 225
            if (settings.onApprove.call(element, $(this)) === false) {
              module.verbose('Approve callback returned false cancelling hide');
              return;                                                  // 228
            }                                                          //
            module.hide();                                             // 230
          },                                                           //
          deny: function () {                                          // 232
            if (settings.onDeny.call(element, $(this)) === false) {    // 233
              module.verbose('Deny callback returned false cancelling hide');
              return;                                                  // 235
            }                                                          //
            module.hide();                                             // 237
          },                                                           //
          close: function () {                                         // 239
            module.hide();                                             // 240
          },                                                           //
          click: function (event) {                                    // 242
            var $target = $(event.target),                             // 243
                isInModal = $target.closest(selector.modal).length > 0,
                isInDOM = $.contains(document.documentElement, event.target);
            if (!isInModal && isInDOM) {                               // 248
              module.debug('Dimmer clicked, hiding all modals');       // 249
              if (module.is.active()) {                                // 250
                module.remove.clickaway();                             // 251
                if (settings.allowMultiple) {                          // 252
                  module.hide();                                       // 253
                } else {                                               //
                  module.hideAll();                                    // 256
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
          debounce: function (method, delay) {                         // 261
            clearTimeout(module.timer);                                // 262
            module.timer = setTimeout(method, delay);                  // 263
          },                                                           //
          keyboard: function (event) {                                 // 265
            var keyCode = event.which,                                 // 266
                escapeKey = 27;                                        //
            if (keyCode == escapeKey) {                                // 270
              if (settings.closable) {                                 // 271
                module.debug('Escape key pressed hiding modal');       // 272
                module.hide();                                         // 273
              } else {                                                 //
                module.debug('Escape key pressed, but closable is set to false');
              }                                                        //
              event.preventDefault();                                  // 278
            }                                                          //
          },                                                           //
          resize: function () {                                        // 281
            if ($dimmable.dimmer('is active')) {                       // 282
              requestAnimationFrame(module.refresh);                   // 283
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        toggle: function () {                                          // 288
          if (module.is.active() || module.is.animating()) {           // 289
            module.hide();                                             // 290
          } else {                                                     //
            module.show();                                             // 293
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 297
          callback = $.isFunction(callback) ? callback : function () {};
          module.refreshModals();                                      // 302
          module.showModal(callback);                                  // 303
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 306
          callback = $.isFunction(callback) ? callback : function () {};
          module.refreshModals();                                      // 311
          module.hideModal(callback);                                  // 312
        },                                                             //
                                                                       //
        showModal: function (callback) {                               // 315
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.animating() || !module.is.active()) {          // 320
                                                                       //
            module.showDimmer();                                       // 322
            module.cacheSizes();                                       // 323
            module.set.position();                                     // 324
            module.set.screenHeight();                                 // 325
            module.set.type();                                         // 326
            module.set.clickaway();                                    // 327
                                                                       //
            if (!settings.allowMultiple && module.others.active()) {   // 329
              module.hideOthers(module.showModal);                     // 330
            } else {                                                   //
              settings.onShow.call(element);                           // 333
              if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                module.debug('Showing modal with css animations');     // 335
                $module.transition({                                   // 336
                  debug: settings.debug,                               // 338
                  animation: settings.transition + ' in',              // 339
                  queue: settings.queue,                               // 340
                  duration: settings.duration,                         // 341
                  useFailSafe: true,                                   // 342
                  onComplete: function () {                            // 343
                    settings.onVisible.apply(element);                 // 344
                    module.add.keyboardShortcuts();                    // 345
                    module.save.focus();                               // 346
                    module.set.active();                               // 347
                    if (settings.autofocus) {                          // 348
                      module.set.autofocus();                          // 349
                    }                                                  //
                    callback();                                        // 351
                  }                                                    //
                });                                                    //
              } else {                                                 //
                module.error(error.noTransition);                      // 357
              }                                                        //
            }                                                          //
          } else {                                                     //
            module.debug('Modal is already visible');                  // 362
          }                                                            //
        },                                                             //
                                                                       //
        hideModal: function (callback, keepDimmed) {                   // 366
          callback = $.isFunction(callback) ? callback : function () {};
          module.debug('Hiding modal');                                // 371
          settings.onHide.call(element);                               // 372
                                                                       //
          if (module.is.animating() || module.is.active()) {           // 374
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.remove.active();                                  // 376
              $module.transition({                                     // 377
                debug: settings.debug,                                 // 379
                animation: settings.transition + ' out',               // 380
                queue: settings.queue,                                 // 381
                duration: settings.duration,                           // 382
                useFailSafe: true,                                     // 383
                onStart: function () {                                 // 384
                  if (!module.others.active() && !keepDimmed) {        // 385
                    module.hideDimmer();                               // 386
                  }                                                    //
                  module.remove.keyboardShortcuts();                   // 388
                },                                                     //
                onComplete: function () {                              // 390
                  settings.onHidden.call(element);                     // 391
                  module.restore.focus();                              // 392
                  callback();                                          // 393
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.error(error.noTransition);                        // 399
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        showDimmer: function () {                                      // 404
          if ($dimmable.dimmer('is animating') || !$dimmable.dimmer('is active')) {
            module.debug('Showing dimmer');                            // 406
            $dimmable.dimmer('show');                                  // 407
          } else {                                                     //
            module.debug('Dimmer already visible');                    // 410
          }                                                            //
        },                                                             //
                                                                       //
        hideDimmer: function () {                                      // 414
          if ($dimmable.dimmer('is animating') || $dimmable.dimmer('is active')) {
            $dimmable.dimmer('hide', function () {                     // 416
              module.remove.clickaway();                               // 417
              module.remove.screenHeight();                            // 418
            });                                                        //
          } else {                                                     //
            module.debug('Dimmer is not visible cannot hide');         // 422
            return;                                                    // 423
          }                                                            //
        },                                                             //
                                                                       //
        hideAll: function (callback) {                                 // 427
          var $visibleModals = $allModals.filter('.' + className.active + ', .' + className.animating);
          callback = $.isFunction(callback) ? callback : function () {};
          if ($visibleModals.length > 0) {                             // 435
            module.debug('Hiding all visible modals');                 // 436
            module.hideDimmer();                                       // 437
            $visibleModals.modal('hide modal', callback);              // 438
          }                                                            //
        },                                                             //
                                                                       //
        hideOthers: function (callback) {                              // 444
          var $visibleModals = $otherModals.filter('.' + className.active + ', .' + className.animating);
          callback = $.isFunction(callback) ? callback : function () {};
          if ($visibleModals.length > 0) {                             // 452
            module.debug('Hiding other modals', $otherModals);         // 453
            $visibleModals.modal('hide modal', callback, true);        // 454
          }                                                            //
        },                                                             //
                                                                       //
        others: {                                                      // 460
          active: function () {                                        // 461
            return $otherModals.filter('.' + className.active).length > 0;
          },                                                           //
          animating: function () {                                     // 464
            return $otherModals.filter('.' + className.animating).length > 0;
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 470
          keyboardShortcuts: function () {                             // 471
            module.verbose('Adding keyboard shortcuts');               // 472
            $document.on('keyup' + eventNamespace, module.event.keyboard);
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 479
          focus: function () {                                         // 480
            $focusedElement = $(document.activeElement).blur();        // 481
          }                                                            //
        },                                                             //
                                                                       //
        restore: {                                                     // 485
          focus: function () {                                         // 486
            if ($focusedElement && $focusedElement.length > 0) {       // 487
              $focusedElement.focus();                                 // 488
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 493
          active: function () {                                        // 494
            $module.removeClass(className.active);                     // 495
          },                                                           //
          clickaway: function () {                                     // 497
            if (settings.closable) {                                   // 498
              $dimmer.off('click' + elementNamespace);                 // 499
            }                                                          //
          },                                                           //
          bodyStyle: function () {                                     // 504
            if ($body.attr('style') === '') {                          // 505
              module.verbose('Removing style attribute');              // 506
              $body.removeAttr('style');                               // 507
            }                                                          //
          },                                                           //
          screenHeight: function () {                                  // 510
            module.debug('Removing page height');                      // 511
            $body.css('height', '');                                   // 512
          },                                                           //
          keyboardShortcuts: function () {                             // 516
            module.verbose('Removing keyboard shortcuts');             // 517
            $document.off('keyup' + eventNamespace);                   // 518
          },                                                           //
          scrolling: function () {                                     // 522
            $dimmable.removeClass(className.scrolling);                // 523
            $module.removeClass(className.scrolling);                  // 524
          }                                                            //
        },                                                             //
                                                                       //
        cacheSizes: function () {                                      // 528
          var modalHeight = $module.outerHeight();                     // 529
          if (module.cache === undefined || modalHeight !== 0) {       // 532
            module.cache = {                                           // 533
              pageHeight: $(document).outerHeight(),                   // 534
              height: modalHeight + settings.offset,                   // 535
              contextHeight: settings.context == 'body' ? $(window).height() : $dimmable.height()
            };                                                         //
          }                                                            //
          module.debug('Caching modal and container sizes', module.cache);
        },                                                             //
                                                                       //
        can: {                                                         // 544
          fit: function () {                                           // 545
            return module.cache.height + settings.padding * 2 < module.cache.contextHeight;
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 550
          active: function () {                                        // 551
            return $module.hasClass(className.active);                 // 552
          },                                                           //
          animating: function () {                                     // 554
            return $module.transition('is supported') ? $module.transition('is animating') : $module.is(':visible');
          },                                                           //
          scrolling: function () {                                     // 560
            return $dimmable.hasClass(className.scrolling);            // 561
          },                                                           //
          modernBrowser: function () {                                 // 563
            // appName for IE11 reports 'Netscape' can no longer use   //
            return !(window.ActiveXObject || "ActiveXObject" in window);
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 569
          autofocus: function () {                                     // 570
            var $inputs = $module.find(':input').filter(':visible'),   // 571
                $autofocus = $inputs.filter('[autofocus]'),            //
                $input = $autofocus.length > 0 ? $autofocus.first() : $inputs.first();
            if ($input.length > 0) {                                   // 578
              $input.focus();                                          // 579
            }                                                          //
          },                                                           //
          clickaway: function () {                                     // 582
            if (settings.closable) {                                   // 583
              $dimmer.on('click' + elementNamespace, module.event.click);
            }                                                          //
          },                                                           //
          screenHeight: function () {                                  // 589
            if (module.can.fit()) {                                    // 590
              $body.css('height', '');                                 // 591
            } else {                                                   //
              module.debug('Modal is taller than page content, resizing page height');
              $body.css('height', module.cache.height + settings.padding * 2);
            }                                                          //
          },                                                           //
          active: function () {                                        // 600
            $module.addClass(className.active);                        // 601
          },                                                           //
          scrolling: function () {                                     // 603
            $dimmable.addClass(className.scrolling);                   // 604
            $module.addClass(className.scrolling);                     // 605
          },                                                           //
          type: function () {                                          // 607
            if (module.can.fit()) {                                    // 608
              module.verbose('Modal fits on screen');                  // 609
              if (!module.others.active() && !module.others.animating()) {
                module.remove.scrolling();                             // 611
              }                                                        //
            } else {                                                   //
              module.verbose('Modal cannot fit on screen setting to scrolling');
              module.set.scrolling();                                  // 616
            }                                                          //
          },                                                           //
          position: function () {                                      // 619
            module.verbose('Centering modal on page', module.cache);   // 620
            if (module.can.fit()) {                                    // 621
              $module.css({                                            // 622
                top: '',                                               // 624
                marginTop: -(module.cache.height / 2)                  // 625
              });                                                      //
            } else {                                                   //
              $module.css({                                            // 630
                marginTop: '',                                         // 632
                top: $document.scrollTop()                             // 633
              });                                                      //
            }                                                          //
          },                                                           //
          undetached: function () {                                    // 638
            $dimmable.addClass(className.undetached);                  // 639
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 643
          module.debug('Changing setting', name, value);               // 644
          if ($.isPlainObject(name)) {                                 // 645
            $.extend(true, settings, name);                            // 646
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 649
          } else {                                                     //
            return settings[name];                                     // 652
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 655
          if ($.isPlainObject(name)) {                                 // 656
            $.extend(true, module, name);                              // 657
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 660
          } else {                                                     //
            return module[name];                                       // 663
          }                                                            //
        },                                                             //
        debug: function () {                                           // 666
          if (settings.debug) {                                        // 667
            if (settings.performance) {                                // 668
              module.performance.log(arguments);                       // 669
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 673
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 677
          if (settings.verbose && settings.debug) {                    // 678
            if (settings.performance) {                                // 679
              module.performance.log(arguments);                       // 680
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 684
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 688
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 690
        },                                                             //
        performance: {                                                 // 692
          log: function (message) {                                    // 693
            var currentTime, executionTime, previousTime;              // 694
            if (settings.performance) {                                // 699
              currentTime = new Date().getTime();                      // 700
              previousTime = time || currentTime;                      // 701
              executionTime = currentTime - previousTime;              // 702
              time = currentTime;                                      // 703
              performance.push({                                       // 704
                'Name': message[0],                                    // 705
                'Arguments': [].slice.call(message, 1) || '',          // 706
                'Element': element,                                    // 707
                'Execution Time': executionTime                        // 708
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 711
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 714
            var title = settings.name + ':',                           // 715
                totalTime = 0;                                         //
            time = false;                                              // 719
            clearTimeout(module.performance.timer);                    // 720
            $.each(performance, function (index, data) {               // 721
              totalTime += data['Execution Time'];                     // 722
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 724
            if (moduleSelector) {                                      // 725
              title += ' \'' + moduleSelector + '\'';                  // 726
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 729
              if (console.table) {                                     // 730
                console.table(performance);                            // 731
              } else {                                                 //
                $.each(performance, function (index, data) {           // 734
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 738
            }                                                          //
            performance = [];                                          // 740
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 743
          var object = instance,                                       // 744
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 750
          context = element || context;                                // 751
          if (typeof query == 'string' && object !== undefined) {      // 752
            query = query.split(/[\. ]/);                              // 753
            maxDepth = query.length - 1;                               // 754
            $.each(query, function (depth, value) {                    // 755
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 761
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 764
                return false;                                          // 765
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 768
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 771
                return false;                                          // 772
              } else {                                                 //
                return false;                                          // 775
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 779
            response = found.apply(context, passedArguments);          // 780
          } else if (found !== undefined) {                            //
            response = found;                                          // 783
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 785
            returnedValue.push(response);                              // 786
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 789
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 792
          }                                                            //
          return found;                                                // 794
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 798
        if (instance === undefined) {                                  // 799
          module.initialize();                                         // 800
        }                                                              //
        module.invoke(query);                                          // 802
      } else {                                                         //
        if (instance !== undefined) {                                  // 805
          instance.invoke('destroy');                                  // 806
        }                                                              //
        module.initialize();                                           // 808
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 813
  };                                                                   //
                                                                       //
  $.fn.modal.settings = {                                              // 819
                                                                       //
    name: 'Modal',                                                     // 821
    namespace: 'modal',                                                // 822
                                                                       //
    debug: false,                                                      // 824
    verbose: false,                                                    // 825
    performance: true,                                                 // 826
                                                                       //
    observeChanges: false,                                             // 828
                                                                       //
    allowMultiple: false,                                              // 830
    detachable: true,                                                  // 831
    closable: true,                                                    // 832
    autofocus: true,                                                   // 833
                                                                       //
    inverted: false,                                                   // 835
    blurring: false,                                                   // 836
                                                                       //
    dimmerSettings: {                                                  // 838
      closable: false,                                                 // 839
      useCSS: true                                                     // 840
    },                                                                 //
                                                                       //
    context: 'body',                                                   // 844
                                                                       //
    queue: false,                                                      // 846
    duration: 500,                                                     // 847
    offset: 0,                                                         // 848
    transition: 'scale',                                               // 849
                                                                       //
    // padding with edge of page                                       //
    padding: 50,                                                       // 852
                                                                       //
    // called before show animation                                    //
    onShow: function () {},                                            // 855
                                                                       //
    // called after show animation                                     //
    onVisible: function () {},                                         // 858
                                                                       //
    // called before hide animation                                    //
    onHide: function () {},                                            // 861
                                                                       //
    // called after hide animation                                     //
    onHidden: function () {},                                          // 864
                                                                       //
    // called after approve selector match                             //
    onApprove: function () {                                           // 867
      return true;                                                     // 867
    },                                                                 //
                                                                       //
    // called after deny selector match                                //
    onDeny: function () {                                              // 870
      return true;                                                     // 870
    },                                                                 //
                                                                       //
    selector: {                                                        // 872
      close: '> .close',                                               // 873
      approve: '.actions .positive, .actions .approve, .actions .ok',  // 874
      deny: '.actions .negative, .actions .deny, .actions .cancel',    // 875
      modal: '.ui.modal'                                               // 876
    },                                                                 //
    error: {                                                           // 878
      dimmer: 'UI Dimmer, a required component is not included in this page',
      method: 'The method you called is not defined.',                 // 880
      notFound: 'The element you specified could not be found'         // 881
    },                                                                 //
    className: {                                                       // 883
      active: 'active',                                                // 884
      animating: 'animating',                                          // 885
      blurring: 'blurring',                                            // 886
      scrolling: 'scrolling',                                          // 887
      undetached: 'undetached'                                         // 888
    }                                                                  //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
