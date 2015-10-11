(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/popup.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Popup                                               //
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
  $.fn.popup = function (parameters) {                                 // 20
    var $allModules = $(this),                                         // 21
        $document = $(document),                                       //
        $window = $(window),                                           //
        $body = $('body'),                                             //
        moduleSelector = $allModules.selector || '',                   //
        hasTouch = true,                                               //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 39
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.popup.settings, parameters) : $.extend({}, $.fn.popup.settings),
          selector = settings.selector,                                //
          className = settings.className,                              //
          error = settings.error,                                      //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          eventNamespace = '.' + settings.namespace,                   //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $target = settings.target ? $(settings.target) : $module,    //
          $popup,                                                      //
          $offsetParent,                                               //
          searchDepth = 0,                                             //
          triedPositions = false,                                      //
          openedWithTouch = false,                                     //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          elementNamespace,                                            //
          id,                                                          //
          module;                                                      //
                                                                       //
      module = {                                                       // 76
                                                                       //
        // binds events                                                //
        initialize: function () {                                      // 79
          module.debug('Initializing', $module);                       // 80
          module.createID();                                           // 81
          module.bind.events();                                        // 82
          if (!module.exists() && settings.preserve) {                 // 83
            module.create();                                           // 84
          }                                                            //
          module.instantiate();                                        // 86
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 89
          module.verbose('Storing instance', module);                  // 90
          instance = module;                                           // 91
          $module.data(moduleNamespace, instance);                     // 92
        },                                                             //
                                                                       //
        refresh: function () {                                         // 97
          if (settings.popup) {                                        // 98
            $popup = $(settings.popup).eq(0);                          // 99
          } else {                                                     //
            if (settings.inline) {                                     // 102
              $popup = $target.nextAll(selector.popup).eq(0);          // 103
              settings.popup = $popup;                                 // 104
            }                                                          //
          }                                                            //
          if (settings.popup) {                                        // 107
            $popup.addClass(className.loading);                        // 108
            $offsetParent = module.get.offsetParent();                 // 109
            $popup.removeClass(className.loading);                     // 110
            if (settings.movePopup && module.has.popup() && module.get.offsetParent($popup)[0] !== $offsetParent[0]) {
              module.debug('Moving popup to the same offset parent as activating element');
              $popup.detach().appendTo($offsetParent);                 // 113
            }                                                          //
          } else {                                                     //
            $offsetParent = settings.inline ? module.get.offsetParent($target) : module.has.popup() ? module.get.offsetParent($popup) : $body;
          }                                                            //
          if ($offsetParent.is('html') && $offsetParent[0] !== $body[0]) {
            module.debug('Setting page as offset parent');             // 128
            $offsetParent = $body;                                     // 129
          }                                                            //
          if (module.get.variation()) {                                // 131
            module.set.variation();                                    // 132
          }                                                            //
        },                                                             //
                                                                       //
        reposition: function () {                                      // 136
          module.refresh();                                            // 137
          module.set.position();                                       // 138
        },                                                             //
                                                                       //
        destroy: function () {                                         // 141
          module.debug('Destroying previous module');                  // 142
          // remove element only if was created dynamically            //
          if ($popup && !settings.preserve) {                          // 144
            module.removePopup();                                      // 145
          }                                                            //
          // clear all timeouts                                        //
          clearTimeout(module.hideTimer);                              // 148
          clearTimeout(module.showTimer);                              // 149
          // remove events                                             //
          $window.off(elementNamespace);                               // 151
          $module.off(eventNamespace).removeData(moduleNamespace);     // 152
        },                                                             //
                                                                       //
        event: {                                                       // 158
          start: function (event) {                                    // 159
            var delay = $.isPlainObject(settings.delay) ? settings.delay.show : settings.delay;
            clearTimeout(module.hideTimer);                            // 165
            if (!openedWithTouch) {                                    // 166
              module.showTimer = setTimeout(module.show, delay);       // 167
            }                                                          //
          },                                                           //
          end: function () {                                           // 170
            var delay = $.isPlainObject(settings.delay) ? settings.delay.hide : settings.delay;
            clearTimeout(module.showTimer);                            // 176
            module.hideTimer = setTimeout(module.hide, delay);         // 177
          },                                                           //
          touchstart: function (event) {                               // 179
            openedWithTouch = true;                                    // 180
            module.show();                                             // 181
          },                                                           //
          resize: function () {                                        // 183
            if (module.is.visible()) {                                 // 184
              module.set.position();                                   // 185
            }                                                          //
          },                                                           //
          hideGracefully: function (event) {                           // 188
            // don't close on clicks inside popup                      //
            if (event && $(event.target).closest(selector.popup).length === 0) {
              module.debug('Click occurred outside popup hiding popup');
              module.hide();                                           // 192
            } else {                                                   //
              module.debug('Click was inside popup, keeping popup open');
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        // generates popup html from metadata                          //
        create: function () {                                          // 201
          var html = module.get.html(),                                // 202
              title = module.get.title(),                              //
              content = module.get.content();                          //
                                                                       //
          if (html || content || title) {                              // 208
            module.debug('Creating pop-up html');                      // 209
            if (!html) {                                               // 210
              html = settings.templates.popup({                        // 211
                title: title,                                          // 212
                content: content                                       // 213
              });                                                      //
            }                                                          //
            $popup = $('<div/>').addClass(className.popup).data(metadata.activator, $module).html(html);
            if (settings.inline) {                                     // 221
              module.verbose('Inserting popup element inline', $popup);
              $popup.insertAfter($module);                             // 223
            } else {                                                   //
              module.verbose('Appending popup element to body', $popup);
              $popup.appendTo($context);                               // 229
            }                                                          //
            module.refresh();                                          // 233
            module.set.variation();                                    // 234
                                                                       //
            if (settings.hoverable) {                                  // 236
              module.bind.popup();                                     // 237
            }                                                          //
            settings.onCreate.call($popup, element);                   // 239
          } else if ($target.next(selector.popup).length !== 0) {      //
            module.verbose('Pre-existing popup found');                // 242
            settings.inline = true;                                    // 243
            settings.popups = $target.next(selector.popup).data(metadata.activator, $module);
            module.refresh();                                          // 245
            if (settings.hoverable) {                                  // 246
              module.bind.popup();                                     // 247
            }                                                          //
          } else if (settings.popup) {                                 //
            $(settings.popup).data(metadata.activator, $module);       // 251
            module.verbose('Used popup specified in settings');        // 252
            module.refresh();                                          // 253
            if (settings.hoverable) {                                  // 254
              module.bind.popup();                                     // 255
            }                                                          //
          } else {                                                     //
            module.debug('No content specified skipping display', element);
          }                                                            //
        },                                                             //
                                                                       //
        createID: function () {                                        // 263
          id = (Math.random().toString(16) + '000000000').substr(2, 8);
          elementNamespace = '.' + id;                                 // 265
          module.verbose('Creating unique id for element', id);        // 266
        },                                                             //
                                                                       //
        // determines popup state                                      //
        toggle: function () {                                          // 270
          module.debug('Toggling pop-up');                             // 271
          if (module.is.hidden()) {                                    // 272
            module.debug('Popup is hidden, showing pop-up');           // 273
            module.unbind.close();                                     // 274
            module.show();                                             // 275
          } else {                                                     //
            module.debug('Popup is visible, hiding pop-up');           // 278
            module.hide();                                             // 279
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 283
          callback = callback || function () {};                       // 284
          module.debug('Showing pop-up', settings.transition);         // 285
          if (module.is.hidden() && !(module.is.active() && module.is.dropdown())) {
            if (!module.exists()) {                                    // 287
              module.create();                                         // 288
            }                                                          //
            if (settings.onShow.call($popup, element) === false) {     // 290
              module.debug('onShow callback returned false, cancelling popup animation');
              return;                                                  // 292
            } else if (!settings.preserve && !settings.popup) {        //
              module.refresh();                                        // 295
            }                                                          //
            if ($popup && module.set.position()) {                     // 297
              module.save.conditions();                                // 298
              if (settings.exclusive) {                                // 299
                module.hideAll();                                      // 300
              }                                                        //
              module.animate.show(callback);                           // 302
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 308
          callback = callback || function () {};                       // 309
          if (module.is.visible() || module.is.animating()) {          // 310
            if (settings.onHide.call($popup, element) === false) {     // 311
              module.debug('onHide callback returned false, cancelling popup animation');
              return;                                                  // 313
            }                                                          //
            module.remove.visible();                                   // 315
            module.unbind.close();                                     // 316
            module.restore.conditions();                               // 317
            module.animate.hide(callback);                             // 318
          }                                                            //
        },                                                             //
                                                                       //
        hideAll: function () {                                         // 322
          $(selector.popup).filter('.' + className.visible).each(function () {
            $(this).data(metadata.activator).popup('hide');            // 326
          });                                                          //
        },                                                             //
        exists: function () {                                          // 333
          if (!$popup) {                                               // 334
            return false;                                              // 335
          }                                                            //
          if (settings.inline || settings.popup) {                     // 337
            return module.has.popup();                                 // 338
          } else {                                                     //
            return $popup.closest($context).length >= 1 ? true : false;
          }                                                            //
        },                                                             //
                                                                       //
        removePopup: function () {                                     // 348
          if (module.has.popup() && !settings.popup) {                 // 349
            module.debug('Removing popup', $popup);                    // 350
            $popup.remove();                                           // 351
            $popup = undefined;                                        // 352
            settings.onRemove.call($popup, element);                   // 353
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 357
          conditions: function () {                                    // 358
            module.cache = {                                           // 359
              title: $module.attr('title')                             // 360
            };                                                         //
            if (module.cache.title) {                                  // 362
              $module.removeAttr('title');                             // 363
            }                                                          //
            module.verbose('Saving original attributes', module.cache.title);
          }                                                            //
        },                                                             //
        restore: {                                                     // 368
          conditions: function () {                                    // 369
            if (module.cache && module.cache.title) {                  // 370
              $module.attr('title', module.cache.title);               // 371
              module.verbose('Restoring original attributes', module.cache.title);
            }                                                          //
            return true;                                               // 374
          }                                                            //
        },                                                             //
        animate: {                                                     // 377
          show: function (callback) {                                  // 378
            callback = $.isFunction(callback) ? callback : function () {};
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.set.visible();                                    // 381
              $popup.transition({                                      // 382
                animation: settings.transition + ' in',                // 384
                queue: false,                                          // 385
                debug: settings.debug,                                 // 386
                verbose: settings.verbose,                             // 387
                duration: settings.duration,                           // 388
                onComplete: function () {                              // 389
                  module.bind.close();                                 // 390
                  callback.call($popup, element);                      // 391
                  settings.onVisible.call($popup, element);            // 392
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.error(error.noTransition);                        // 398
            }                                                          //
          },                                                           //
          hide: function (callback) {                                  // 401
            callback = $.isFunction(callback) ? callback : function () {};
            module.debug('Hiding pop-up');                             // 403
            if (settings.onHide.call($popup, element) === false) {     // 404
              module.debug('onHide callback returned false, cancelling popup animation');
              return;                                                  // 406
            }                                                          //
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $popup.transition({                                      // 409
                animation: settings.transition + ' out',               // 411
                queue: false,                                          // 412
                duration: settings.duration,                           // 413
                debug: settings.debug,                                 // 414
                verbose: settings.verbose,                             // 415
                onComplete: function () {                              // 416
                  module.reset();                                      // 417
                  callback.call($popup, element);                      // 418
                  settings.onHidden.call($popup, element);             // 419
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.error(error.noTransition);                        // 425
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 430
          html: function () {                                          // 431
            $module.removeData(metadata.html);                         // 432
            return $module.data(metadata.html) || settings.html;       // 433
          },                                                           //
          title: function () {                                         // 435
            $module.removeData(metadata.title);                        // 436
            return $module.data(metadata.title) || settings.title;     // 437
          },                                                           //
          content: function () {                                       // 439
            $module.removeData(metadata.content);                      // 440
            return $module.data(metadata.content) || $module.attr('title') || settings.content;
          },                                                           //
          variation: function () {                                     // 443
            $module.removeData(metadata.variation);                    // 444
            return $module.data(metadata.variation) || settings.variation;
          },                                                           //
          popupOffset: function () {                                   // 447
            return $popup.offset();                                    // 448
          },                                                           //
          calculations: function () {                                  // 450
            var targetElement = $target[0],                            // 451
                targetPosition = settings.inline || settings.popup ? $target.position() : $target.offset(),
                calculations = {},                                     //
                screen;                                                //
            calculations = {                                           // 459
              // element which is launching popup                      //
              target: {                                                // 461
                element: $target[0],                                   // 462
                width: $target.outerWidth(),                           // 463
                height: $target.outerHeight(),                         // 464
                top: targetPosition.top,                               // 465
                left: targetPosition.left,                             // 466
                margin: {}                                             // 467
              },                                                       //
              // popup itself                                          //
              popup: {                                                 // 470
                width: $popup.outerWidth(),                            // 471
                height: $popup.outerHeight()                           // 472
              },                                                       //
              // offset container (or 3d context)                      //
              parent: {                                                // 475
                width: $offsetParent.outerWidth(),                     // 476
                height: $offsetParent.outerHeight()                    // 477
              },                                                       //
              // screen boundaries                                     //
              screen: {                                                // 480
                scroll: {                                              // 481
                  top: $window.scrollTop(),                            // 482
                  left: $window.scrollLeft()                           // 483
                },                                                     //
                width: $window.width(),                                // 485
                height: $window.height()                               // 486
              }                                                        //
            };                                                         //
                                                                       //
            // add in container calcs if fluid                         //
            if (settings.setFluidWidth && module.is.fluid()) {         // 491
              calculations.container = {                               // 492
                width: $popup.parent().outerWidth()                    // 493
              };                                                       //
              calculations.popup.width = calculations.container.width;
            }                                                          //
                                                                       //
            // add in margins if inline                                //
            calculations.target.margin.top = settings.inline ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-top'), 10) : 0;
            calculations.target.margin.left = settings.inline ? module.is.rtl() ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-right'), 10) : parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-left'), 10) : 0;
            // calculate screen boundaries                             //
            screen = calculations.screen;                              // 510
            calculations.boundary = {                                  // 511
              top: screen.scroll.top,                                  // 512
              bottom: screen.scroll.top + screen.height,               // 513
              left: screen.scroll.left,                                // 514
              right: screen.scroll.left + screen.width                 // 515
            };                                                         //
            return calculations;                                       // 517
          },                                                           //
          id: function () {                                            // 519
            return id;                                                 // 520
          },                                                           //
          startEvent: function () {                                    // 522
            if (settings.on == 'hover') {                              // 523
              return 'mouseenter';                                     // 524
            } else if (settings.on == 'focus') {                       //
              return 'focus';                                          // 527
            }                                                          //
            return false;                                              // 529
          },                                                           //
          scrollEvent: function () {                                   // 531
            return 'scroll';                                           // 532
          },                                                           //
          endEvent: function () {                                      // 534
            if (settings.on == 'hover') {                              // 535
              return 'mouseleave';                                     // 536
            } else if (settings.on == 'focus') {                       //
              return 'blur';                                           // 539
            }                                                          //
            return false;                                              // 541
          },                                                           //
          distanceFromBoundary: function (offset, calculations) {      // 543
            var distanceFromBoundary = {},                             // 544
                popup,                                                 //
                boundary;                                              //
            offset = offset || module.get.offset();                    // 549
            calculations = calculations || module.get.calculations();  // 550
                                                                       //
            // shorthand                                               //
            popup = calculations.popup;                                // 553
            boundary = calculations.boundary;                          // 554
                                                                       //
            if (offset) {                                              // 556
              distanceFromBoundary = {                                 // 557
                top: offset.top - boundary.top,                        // 558
                left: offset.left - boundary.left,                     // 559
                right: boundary.right - (offset.left + popup.width),   // 560
                bottom: boundary.bottom - (offset.top + popup.height)  // 561
              };                                                       //
              module.verbose('Distance from boundaries determined', offset, distanceFromBoundary);
            }                                                          //
            return distanceFromBoundary;                               // 565
          },                                                           //
          offsetParent: function ($target) {                           // 567
            var element = $target !== undefined ? $target[0] : $module[0],
                parentNode = element.parentNode,                       //
                $node = $(parentNode);                                 //
            if (parentNode) {                                          // 575
              var is2D = $node.css('transform') === 'none',            // 576
                  isStatic = $node.css('position') === 'static',       //
                  isHTML = $node.is('html');                           //
              while (parentNode && !isHTML && isStatic && is2D) {      // 581
                parentNode = parentNode.parentNode;                    // 582
                $node = $(parentNode);                                 // 583
                is2D = $node.css('transform') === 'none';              // 584
                isStatic = $node.css('position') === 'static';         // 585
                isHTML = $node.is('html');                             // 586
              }                                                        //
            }                                                          //
            return $node && $node.length > 0 ? $node : $();            // 589
          },                                                           //
          positions: function () {                                     // 594
            return {                                                   // 595
              'top left': false,                                       // 596
              'top center': false,                                     // 597
              'top right': false,                                      // 598
              'bottom left': false,                                    // 599
              'bottom center': false,                                  // 600
              'bottom right': false,                                   // 601
              'left center': false,                                    // 602
              'right center': false                                    // 603
            };                                                         //
          },                                                           //
          nextPosition: function (position) {                          // 606
            var positions = position.split(' '),                       // 607
                verticalPosition = positions[0],                       //
                horizontalPosition = positions[1],                     //
                opposite = {                                           //
              top: 'bottom',                                           // 612
              bottom: 'top',                                           // 613
              left: 'right',                                           // 614
              right: 'left'                                            // 615
            },                                                         //
                adjacent = {                                           //
              left: 'center',                                          // 618
              center: 'right',                                         // 619
              right: 'left'                                            // 620
            },                                                         //
                backup = {                                             //
              'top left': 'top center',                                // 623
              'top center': 'top right',                               // 624
              'top right': 'right center',                             // 625
              'right center': 'bottom right',                          // 626
              'bottom right': 'bottom center',                         // 627
              'bottom center': 'bottom left',                          // 628
              'bottom left': 'left center',                            // 629
              'left center': 'top left'                                // 630
            },                                                         //
                adjacentsAvailable = verticalPosition == 'top' || verticalPosition == 'bottom',
                oppositeTried = false,                                 //
                adjacentTried = false,                                 //
                nextPosition = false;                                  //
            if (!triedPositions) {                                     // 637
              module.verbose('All available positions available');     // 638
              triedPositions = module.get.positions();                 // 639
            }                                                          //
                                                                       //
            module.debug('Recording last position tried', position);   // 642
            triedPositions[position] = true;                           // 643
                                                                       //
            if (settings.prefer === 'opposite') {                      // 645
              nextPosition = [opposite[verticalPosition], horizontalPosition];
              nextPosition = nextPosition.join(' ');                   // 647
              oppositeTried = triedPositions[nextPosition] === true;   // 648
              module.debug('Trying opposite strategy', nextPosition);  // 649
            }                                                          //
            if (settings.prefer === 'adjacent' && adjacentsAvailable) {
              nextPosition = [verticalPosition, adjacent[horizontalPosition]];
              nextPosition = nextPosition.join(' ');                   // 653
              adjacentTried = triedPositions[nextPosition] === true;   // 654
              module.debug('Trying adjacent strategy', nextPosition);  // 655
            }                                                          //
            if (adjacentTried || oppositeTried) {                      // 657
              module.debug('Using backup position', nextPosition);     // 658
              nextPosition = backup[position];                         // 659
            }                                                          //
            return nextPosition;                                       // 661
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 665
          position: function (position, calculations) {                // 666
                                                                       //
            // exit conditions                                         //
            if ($target.length === 0 || $popup.length === 0) {         // 669
              module.error(error.notFound);                            // 670
              return;                                                  // 671
            }                                                          //
            var offset, distanceAway, target, popup, parent, positioning, popupOffset, distanceFromBoundary;
                                                                       //
            calculations = calculations || module.get.calculations();  // 684
            position = position || $module.data(metadata.position) || settings.position;
                                                                       //
            offset = $module.data(metadata.offset) || settings.offset;
            distanceAway = settings.distanceAway;                      // 688
                                                                       //
            // shorthand                                               //
            target = calculations.target;                              // 691
            popup = calculations.popup;                                // 692
            parent = calculations.parent;                              // 693
                                                                       //
            if (target.width === 0 && target.height === 0) {           // 695
              module.debug('Popup target is hidden, no action taken');
              return false;                                            // 697
            }                                                          //
                                                                       //
            if (settings.inline) {                                     // 700
              module.debug('Adding margin to calculation', target.margin);
              if (position == 'left center' || position == 'right center') {
                offset += target.margin.top;                           // 703
                distanceAway += -target.margin.left;                   // 704
              } else if (position == 'top left' || position == 'top center' || position == 'top right') {
                offset += target.margin.left;                          // 707
                distanceAway -= target.margin.top;                     // 708
              } else {                                                 //
                offset += target.margin.left;                          // 711
                distanceAway += target.margin.top;                     // 712
              }                                                        //
            }                                                          //
                                                                       //
            module.debug('Determining popup position from calculations', position, calculations);
                                                                       //
            if (module.is.rtl()) {                                     // 718
              position = position.replace(/left|right/g, function (match) {
                return match == 'left' ? 'right' : 'left';             // 720
              });                                                      //
              module.debug('RTL: Popup position updated', position);   // 725
            }                                                          //
                                                                       //
            // if last attempt use specified last resort position      //
            if (searchDepth == settings.maxSearchDepth && typeof settings.lastResort === 'string') {
              position = settings.lastResort;                          // 730
            }                                                          //
                                                                       //
            switch (position) {                                        // 733
              case 'top left':                                         // 734
                positioning = {                                        // 735
                  top: 'auto',                                         // 736
                  bottom: parent.height - target.top + distanceAway,   // 737
                  left: target.left + offset,                          // 738
                  right: 'auto'                                        // 739
                };                                                     //
                break;                                                 // 741
              case 'top center':                                       // 741
                positioning = {                                        // 743
                  bottom: parent.height - target.top + distanceAway,   // 744
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  top: 'auto',                                         // 746
                  right: 'auto'                                        // 747
                };                                                     //
                break;                                                 // 749
              case 'top right':                                        // 749
                positioning = {                                        // 751
                  bottom: parent.height - target.top + distanceAway,   // 752
                  right: parent.width - target.left - target.width - offset,
                  top: 'auto',                                         // 754
                  left: 'auto'                                         // 755
                };                                                     //
                break;                                                 // 757
              case 'left center':                                      // 757
                positioning = {                                        // 759
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  right: parent.width - target.left + distanceAway,    // 761
                  left: 'auto',                                        // 762
                  bottom: 'auto'                                       // 763
                };                                                     //
                break;                                                 // 765
              case 'right center':                                     // 765
                positioning = {                                        // 767
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  left: target.left + target.width + distanceAway,     // 769
                  bottom: 'auto',                                      // 770
                  right: 'auto'                                        // 771
                };                                                     //
                break;                                                 // 773
              case 'bottom left':                                      // 773
                positioning = {                                        // 775
                  top: target.top + target.height + distanceAway,      // 776
                  left: target.left + offset,                          // 777
                  bottom: 'auto',                                      // 778
                  right: 'auto'                                        // 779
                };                                                     //
                break;                                                 // 781
              case 'bottom center':                                    // 781
                positioning = {                                        // 783
                  top: target.top + target.height + distanceAway,      // 784
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  bottom: 'auto',                                      // 786
                  right: 'auto'                                        // 787
                };                                                     //
                break;                                                 // 789
              case 'bottom right':                                     // 790
                positioning = {                                        // 791
                  top: target.top + target.height + distanceAway,      // 792
                  right: parent.width - target.left - target.width - offset,
                  left: 'auto',                                        // 794
                  bottom: 'auto'                                       // 795
                };                                                     //
                break;                                                 // 797
            }                                                          // 797
            if (positioning === undefined) {                           // 799
              module.error(error.invalidPosition, position);           // 800
            }                                                          //
                                                                       //
            module.debug('Calculated popup positioning values', positioning);
                                                                       //
            // tentatively place on stage                              //
            $popup.css(positioning).removeClass(className.position).addClass(position).addClass(className.loading);
                                                                       //
            popupOffset = module.get.popupOffset();                    // 813
                                                                       //
            // see if any boundaries are surpassed with this tentative position
            distanceFromBoundary = module.get.distanceFromBoundary(popupOffset, calculations);
                                                                       //
            if (module.is.offstage(distanceFromBoundary, position)) {  // 818
              module.debug('Position is outside viewport', position);  // 819
              if (searchDepth < settings.maxSearchDepth) {             // 820
                searchDepth++;                                         // 821
                position = module.get.nextPosition(position);          // 822
                module.debug('Trying new position', position);         // 823
                return $popup ? module.set.position(position, calculations) : false;
              } else {                                                 //
                if (settings.lastResort) {                             // 830
                  module.debug('No position found, showing with last position');
                } else {                                               //
                  module.debug('Popup could not find a position to display', $popup);
                  module.error(error.cannotPlace, element);            // 835
                  module.remove.attempts();                            // 836
                  module.remove.loading();                             // 837
                  module.reset();                                      // 838
                  return false;                                        // 839
                }                                                      //
              }                                                        //
            }                                                          //
            module.debug('Position is on stage', position);            // 843
            module.remove.attempts();                                  // 844
            module.remove.loading();                                   // 845
            if (settings.setFluidWidth && module.is.fluid()) {         // 846
              module.set.fluidWidth(calculations);                     // 847
            }                                                          //
            return true;                                               // 849
          },                                                           //
                                                                       //
          fluidWidth: function (calculations) {                        // 852
            calculations = calculations || module.get.calculations();  // 853
            module.debug('Automatically setting element width to parent width', calculations.parent.width);
            $popup.css('width', calculations.container.width);         // 855
          },                                                           //
                                                                       //
          variation: function (variation) {                            // 858
            variation = variation || module.get.variation();           // 859
            if (variation && module.has.popup()) {                     // 860
              module.verbose('Adding variation to popup', variation);  // 861
              $popup.addClass(variation);                              // 862
            }                                                          //
          },                                                           //
                                                                       //
          visible: function () {                                       // 866
            $module.addClass(className.visible);                       // 867
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 871
          loading: function () {                                       // 872
            $popup.removeClass(className.loading);                     // 873
          },                                                           //
          variation: function (variation) {                            // 875
            variation = variation || module.get.variation();           // 876
            if (variation) {                                           // 877
              module.verbose('Removing variation', variation);         // 878
              $popup.removeClass(variation);                           // 879
            }                                                          //
          },                                                           //
          visible: function () {                                       // 882
            $module.removeClass(className.visible);                    // 883
          },                                                           //
          attempts: function () {                                      // 885
            module.verbose('Resetting all searched positions');        // 886
            searchDepth = 0;                                           // 887
            triedPositions = false;                                    // 888
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 892
          events: function () {                                        // 893
            module.debug('Binding popup events to module');            // 894
            if (settings.on == 'click') {                              // 895
              $module.on('click' + eventNamespace, module.toggle);     // 896
            }                                                          //
            if (settings.on == 'hover' && hasTouch) {                  // 900
              $module.on('touchstart' + eventNamespace, module.event.touchstart);
            }                                                          //
            if (module.get.startEvent()) {                             // 905
              $module.on(module.get.startEvent() + eventNamespace, module.event.start).on(module.get.endEvent() + eventNamespace, module.event.end);
            }                                                          //
            if (settings.target) {                                     // 911
              module.debug('Target set to element', $target);          // 912
            }                                                          //
            $window.on('resize' + elementNamespace, module.event.resize);
          },                                                           //
          popup: function () {                                         // 916
            module.verbose('Allowing hover events on popup to prevent closing');
            if ($popup && module.has.popup()) {                        // 918
              $popup.on('mouseenter' + eventNamespace, module.event.start).on('mouseleave' + eventNamespace, module.event.end);
            }                                                          //
          },                                                           //
          close: function () {                                         // 925
            if (settings.hideOnScroll === true || settings.hideOnScroll == 'auto' && settings.on != 'click') {
              $document.one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully);
              $context.one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully);
            }                                                          //
            if (settings.on == 'hover' && openedWithTouch) {           // 934
              module.verbose('Binding popup close event to document');
              $document.on('touchstart' + elementNamespace, function (event) {
                module.verbose('Touched away from popup');             // 938
                module.event.hideGracefully.call(element, event);      // 939
              });                                                      //
            }                                                          //
            if (settings.on == 'click' && settings.closable) {         // 943
              module.verbose('Binding popup close event to document');
              $document.on('click' + elementNamespace, function (event) {
                module.verbose('Clicked away from popup');             // 947
                module.event.hideGracefully.call(element, event);      // 948
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        unbind: {                                                      // 955
          close: function () {                                         // 956
            if (settings.hideOnScroll === true || settings.hideOnScroll == 'auto' && settings.on != 'click') {
              $document.off('scroll' + elementNamespace, module.hide);
              $context.off('scroll' + elementNamespace, module.hide);  // 961
            }                                                          //
            if (settings.on == 'hover' && openedWithTouch) {           // 965
              $document.off('touchstart' + elementNamespace);          // 966
              openedWithTouch = false;                                 // 969
            }                                                          //
            if (settings.on == 'click' && settings.closable) {         // 971
              module.verbose('Removing close event from document');    // 972
              $document.off('click' + elementNamespace);               // 973
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 980
          popup: function () {                                         // 981
            return $popup && $popup.length > 0;                        // 982
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 986
          offstage: function (distanceFromBoundary, position) {        // 987
            var offstage = [];                                         // 988
            // return boundaries that have been surpassed              //
            $.each(distanceFromBoundary, function (direction, distance) {
              if (distance < -settings.jitter) {                       // 993
                module.debug('Position exceeds allowable distance from edge', direction, distance, position);
                offstage.push(direction);                              // 995
              }                                                        //
            });                                                        //
            if (offstage.length > 0) {                                 // 998
              return true;                                             // 999
            } else {                                                   //
              return false;                                            // 1002
            }                                                          //
          },                                                           //
          active: function () {                                        // 1005
            return $module.hasClass(className.active);                 // 1006
          },                                                           //
          animating: function () {                                     // 1008
            return $popup && $popup.hasClass(className.animating);     // 1009
          },                                                           //
          fluid: function () {                                         // 1011
            return $popup && $popup.hasClass(className.fluid);         // 1012
          },                                                           //
          visible: function () {                                       // 1014
            return $popup && $popup.hasClass(className.visible);       // 1015
          },                                                           //
          dropdown: function () {                                      // 1017
            return $module.hasClass(className.dropdown);               // 1018
          },                                                           //
          hidden: function () {                                        // 1020
            return !module.is.visible();                               // 1021
          },                                                           //
          rtl: function () {                                           // 1023
            return $module.css('direction') == 'rtl';                  // 1024
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 1028
          module.remove.visible();                                     // 1029
          if (settings.preserve) {                                     // 1030
            if ($.fn.transition !== undefined) {                       // 1031
              $popup.transition('remove transition');                  // 1032
            }                                                          //
          } else {                                                     //
            module.removePopup();                                      // 1038
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 1042
          if ($.isPlainObject(name)) {                                 // 1043
            $.extend(true, settings, name);                            // 1044
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 1047
          } else {                                                     //
            return settings[name];                                     // 1050
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 1053
          if ($.isPlainObject(name)) {                                 // 1054
            $.extend(true, module, name);                              // 1055
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 1058
          } else {                                                     //
            return module[name];                                       // 1061
          }                                                            //
        },                                                             //
        debug: function () {                                           // 1064
          if (settings.debug) {                                        // 1065
            if (settings.performance) {                                // 1066
              module.performance.log(arguments);                       // 1067
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 1071
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 1075
          if (settings.verbose && settings.debug) {                    // 1076
            if (settings.performance) {                                // 1077
              module.performance.log(arguments);                       // 1078
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 1082
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 1086
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 1088
        },                                                             //
        performance: {                                                 // 1090
          log: function (message) {                                    // 1091
            var currentTime, executionTime, previousTime;              // 1092
            if (settings.performance) {                                // 1097
              currentTime = new Date().getTime();                      // 1098
              previousTime = time || currentTime;                      // 1099
              executionTime = currentTime - previousTime;              // 1100
              time = currentTime;                                      // 1101
              performance.push({                                       // 1102
                'Name': message[0],                                    // 1103
                'Arguments': [].slice.call(message, 1) || '',          // 1104
                'Element': element,                                    // 1105
                'Execution Time': executionTime                        // 1106
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 1109
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 1112
            var title = settings.name + ':',                           // 1113
                totalTime = 0;                                         //
            time = false;                                              // 1117
            clearTimeout(module.performance.timer);                    // 1118
            $.each(performance, function (index, data) {               // 1119
              totalTime += data['Execution Time'];                     // 1120
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 1122
            if (moduleSelector) {                                      // 1123
              title += ' \'' + moduleSelector + '\'';                  // 1124
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 1127
              if (console.table) {                                     // 1128
                console.table(performance);                            // 1129
              } else {                                                 //
                $.each(performance, function (index, data) {           // 1132
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 1136
            }                                                          //
            performance = [];                                          // 1138
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 1141
          var object = instance,                                       // 1142
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 1148
          context = element || context;                                // 1149
          if (typeof query == 'string' && object !== undefined) {      // 1150
            query = query.split(/[\. ]/);                              // 1151
            maxDepth = query.length - 1;                               // 1152
            $.each(query, function (depth, value) {                    // 1153
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 1159
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 1162
                return false;                                          // 1163
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 1166
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 1169
                return false;                                          // 1170
              } else {                                                 //
                return false;                                          // 1173
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 1177
            response = found.apply(context, passedArguments);          // 1178
          } else if (found !== undefined) {                            //
            response = found;                                          // 1181
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1183
            returnedValue.push(response);                              // 1184
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1187
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1190
          }                                                            //
          return found;                                                // 1192
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 1196
        if (instance === undefined) {                                  // 1197
          module.initialize();                                         // 1198
        }                                                              //
        module.invoke(query);                                          // 1200
      } else {                                                         //
        if (instance !== undefined) {                                  // 1203
          instance.invoke('destroy');                                  // 1204
        }                                                              //
        module.initialize();                                           // 1206
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1211
  };                                                                   //
                                                                       //
  $.fn.popup.settings = {                                              // 1217
                                                                       //
    name: 'Popup',                                                     // 1219
                                                                       //
    // module settings                                                 //
    debug: false,                                                      // 1222
    verbose: false,                                                    // 1223
    performance: true,                                                 // 1224
    namespace: 'popup',                                                // 1225
                                                                       //
    // callback only when element added to dom                         //
    onCreate: function () {},                                          // 1228
                                                                       //
    // callback before element removed from dom                        //
    onRemove: function () {},                                          // 1231
                                                                       //
    // callback before show animation                                  //
    onShow: function () {},                                            // 1234
                                                                       //
    // callback after show animation                                   //
    onVisible: function () {},                                         // 1237
                                                                       //
    // callback before hide animation                                  //
    onHide: function () {},                                            // 1240
                                                                       //
    // callback after hide animation                                   //
    onHidden: function () {},                                          // 1243
                                                                       //
    // when to show popup                                              //
    on: 'hover',                                                       // 1246
                                                                       //
    // whether to add touchstart events when using hover               //
    addTouchEvents: true,                                              // 1249
                                                                       //
    // default position relative to element                            //
    position: 'top left',                                              // 1252
                                                                       //
    // name of variation to use                                        //
    variation: '',                                                     // 1255
                                                                       //
    // whether popup should be moved to context                        //
    movePopup: true,                                                   // 1258
                                                                       //
    // element which popup should be relative to                       //
    target: false,                                                     // 1261
                                                                       //
    // jq selector or element that should be used as popup             //
    popup: false,                                                      // 1264
                                                                       //
    // popup should remain inline next to activator                    //
    inline: false,                                                     // 1267
                                                                       //
    // popup should be removed from page on hide                       //
    preserve: false,                                                   // 1270
                                                                       //
    // popup should not close when being hovered on                    //
    hoverable: false,                                                  // 1273
                                                                       //
    // explicitly set content                                          //
    content: false,                                                    // 1276
                                                                       //
    // explicitly set html                                             //
    html: false,                                                       // 1279
                                                                       //
    // explicitly set title                                            //
    title: false,                                                      // 1282
                                                                       //
    // whether automatically close on clickaway when on click          //
    closable: true,                                                    // 1285
                                                                       //
    // automatically hide on scroll                                    //
    hideOnScroll: 'auto',                                              // 1288
                                                                       //
    // hide other popups on show                                       //
    exclusive: false,                                                  // 1291
                                                                       //
    // context to attach popups                                        //
    context: 'body',                                                   // 1294
                                                                       //
    // position to prefer when calculating new position                //
    prefer: 'opposite',                                                // 1297
                                                                       //
    // specify position to appear even if it doesn't fit               //
    lastResort: false,                                                 // 1300
                                                                       //
    // delay used to prevent accidental refiring of animations due to user error
    delay: {                                                           // 1303
      show: 50,                                                        // 1304
      hide: 70                                                         // 1305
    },                                                                 //
                                                                       //
    // whether fluid variation should assign width explicitly          //
    setFluidWidth: true,                                               // 1309
                                                                       //
    // transition settings                                             //
    duration: 200,                                                     // 1312
    transition: 'scale',                                               // 1313
                                                                       //
    // distance away from activating element in px                     //
    distanceAway: 0,                                                   // 1316
                                                                       //
    // number of pixels an element is allowed to be "offstage" for a position to be chosen (allows for rounding)
    jitter: 2,                                                         // 1319
                                                                       //
    // offset on aligning axis from calculated position                //
    offset: 0,                                                         // 1322
                                                                       //
    // maximum times to look for a position before failing (9 positions total)
    maxSearchDepth: 15,                                                // 1325
                                                                       //
    error: {                                                           // 1327
      invalidPosition: 'The position you specified is not a valid position',
      cannotPlace: 'Popup does not fit within the boundaries of the viewport',
      method: 'The method you called is not defined.',                 // 1330
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',
      notFound: 'The target or popup you specified does not exist on the page'
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1335
      activator: 'activator',                                          // 1336
      content: 'content',                                              // 1337
      html: 'html',                                                    // 1338
      offset: 'offset',                                                // 1339
      position: 'position',                                            // 1340
      title: 'title',                                                  // 1341
      variation: 'variation'                                           // 1342
    },                                                                 //
                                                                       //
    className: {                                                       // 1345
      active: 'active',                                                // 1346
      animating: 'animating',                                          // 1347
      dropdown: 'dropdown',                                            // 1348
      fluid: 'fluid',                                                  // 1349
      loading: 'loading',                                              // 1350
      popup: 'ui popup',                                               // 1351
      position: 'top left center bottom right',                        // 1352
      visible: 'visible'                                               // 1353
    },                                                                 //
                                                                       //
    selector: {                                                        // 1356
      popup: '.ui.popup'                                               // 1357
    },                                                                 //
                                                                       //
    templates: {                                                       // 1360
      escape: function (string) {                                      // 1361
        var badChars = /[&<>"'`]/g,                                    // 1362
            shouldEscape = /[&<>"'`]/,                                 //
            escape = {                                                 //
          "&": "&amp;",                                                // 1366
          "<": "&lt;",                                                 // 1367
          ">": "&gt;",                                                 // 1368
          '"': "&quot;",                                               // 1369
          "'": "&#x27;",                                               // 1370
          "`": "&#x60;"                                                // 1371
        },                                                             //
            escapedChar = function (chr) {                             //
          return escape[chr];                                          // 1374
        };                                                             //
        if (shouldEscape.test(string)) {                               // 1377
          return string.replace(badChars, escapedChar);                // 1378
        }                                                              //
        return string;                                                 // 1380
      },                                                               //
      popup: function (text) {                                         // 1382
        var html = '',                                                 // 1383
            escape = $.fn.popup.settings.templates.escape;             //
        if (typeof text !== undefined) {                               // 1387
          if (typeof text.title !== undefined && text.title) {         // 1388
            text.title = escape(text.title);                           // 1389
            html += '<div class="header">' + text.title + '</div>';    // 1390
          }                                                            //
          if (typeof text.content !== undefined && text.content) {     // 1392
            text.content = escape(text.content);                       // 1393
            html += '<div class="content">' + text.content + '</div>';
          }                                                            //
        }                                                              //
        return html;                                                   // 1397
      }                                                                //
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
