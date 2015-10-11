(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/transition.js            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Transition                                          //
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
  $.fn.transition = function () {                                      // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        moduleArguments = arguments,                                   //
        query = moduleArguments[0],                                    //
        queryArguments = [].slice.call(arguments, 1),                  //
        methodInvoked = typeof query === 'string',                     //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 37
    },                                                                 //
        returnedValue;                                                 //
    $allModules.each(function (index) {                                // 41
      var $module = $(this),                                           // 43
          element = this,                                              //
                                                                       //
      // set at run time                                               //
      settings,                                                        // 48
          instance,                                                    //
          error,                                                       //
          className,                                                   //
          metadata,                                                    //
          animationEnd,                                                //
          animationName,                                               //
          namespace,                                                   //
          moduleNamespace,                                             //
          eventNamespace,                                              //
          module;                                                      //
                                                                       //
      module = {                                                       // 63
                                                                       //
        initialize: function () {                                      // 65
                                                                       //
          // get full settings                                         //
          settings = module.get.settings.apply(element, moduleArguments);
                                                                       //
          // shorthand                                                 //
          className = settings.className;                              // 71
          error = settings.error;                                      // 72
          metadata = settings.metadata;                                // 73
                                                                       //
          // define namespace                                          //
          eventNamespace = '.' + settings.namespace;                   // 76
          moduleNamespace = 'module-' + settings.namespace;            // 77
          instance = $module.data(moduleNamespace) || module;          // 78
                                                                       //
          // get vendor specific events                                //
          animationEnd = module.get.animationEndEvent();               // 81
                                                                       //
          if (methodInvoked) {                                         // 83
            methodInvoked = module.invoke(query);                      // 84
          }                                                            //
                                                                       //
          // method not invoked, lets run an animation                 //
          if (methodInvoked === false) {                               // 88
            module.verbose('Converted arguments into settings object', settings);
            if (settings.interval) {                                   // 90
              module.delay(settings.animate);                          // 91
            } else {                                                   //
              module.animate();                                        // 94
            }                                                          //
            module.instantiate();                                      // 96
          }                                                            //
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 100
          module.verbose('Storing instance of module', module);        // 101
          instance = module;                                           // 102
          $module.data(moduleNamespace, instance);                     // 103
        },                                                             //
                                                                       //
        destroy: function () {                                         // 108
          module.verbose('Destroying previous module for', element);   // 109
          $module.removeData(moduleNamespace);                         // 110
        },                                                             //
                                                                       //
        refresh: function () {                                         // 115
          module.verbose('Refreshing display type on next animation');
          delete module.displayType;                                   // 117
        },                                                             //
                                                                       //
        forceRepaint: function () {                                    // 120
          module.verbose('Forcing element repaint');                   // 121
          var $parentElement = $module.parent(),                       // 122
              $nextElement = $module.next();                           //
          if ($nextElement.length === 0) {                             // 126
            $module.detach().appendTo($parentElement);                 // 127
          } else {                                                     //
            $module.detach().insertBefore($nextElement);               // 130
          }                                                            //
        },                                                             //
                                                                       //
        repaint: function () {                                         // 134
          module.verbose('Repainting element');                        // 135
          var fakeAssignment = element.offsetWidth;                    // 136
        },                                                             //
                                                                       //
        delay: function (interval) {                                   // 141
          var direction = module.get.animationDirection(),             // 142
              shouldReverse,                                           //
              delay;                                                   //
          if (!direction) {                                            // 147
            direction = module.can.transition() ? module.get.direction() : 'static';
          }                                                            //
          interval = interval !== undefined ? interval : settings.interval;
          shouldReverse = settings.reverse == 'auto' && direction == className.outward;
          delay = shouldReverse || settings.reverse == true ? ($allModules.length - index) * settings.interval : index * settings.interval;
          module.debug('Delaying animation by', delay);                // 162
          setTimeout(module.animate, delay);                           // 163
        },                                                             //
                                                                       //
        animate: function (overrideSettings) {                         // 166
          settings = overrideSettings || settings;                     // 167
          if (!module.is.supported()) {                                // 168
            module.error(error.support);                               // 169
            return false;                                              // 170
          }                                                            //
          module.debug('Preparing animation', settings.animation);     // 172
          if (module.is.animating()) {                                 // 173
            if (settings.queue) {                                      // 174
              if (!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
              } else {                                                 //
                module.queue(settings.animation);                      // 179
              }                                                        //
              return false;                                            // 181
            } else if (!settings.allowRepeats && module.is.occurring()) {
              module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
              return false;                                            // 185
            } else {                                                   //
              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();                                     // 189
            }                                                          //
          }                                                            //
          if (module.can.animate()) {                                  // 192
            module.set.animating(settings.animation);                  // 193
          } else {                                                     //
            module.error(error.noAnimation, settings.animation, element);
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 200
          module.debug('Resetting animation to beginning conditions');
          module.remove.animationCallbacks();                          // 202
          module.restore.conditions();                                 // 203
          module.remove.animating();                                   // 204
        },                                                             //
                                                                       //
        queue: function (animation) {                                  // 207
          module.debug('Queueing animation of', animation);            // 208
          module.queuing = true;                                       // 209
          $module.one(animationEnd + '.queue' + eventNamespace, function () {
            module.queuing = false;                                    // 212
            module.repaint();                                          // 213
            module.animate.apply(this, settings);                      // 214
          });                                                          //
        },                                                             //
                                                                       //
        complete: function (event) {                                   // 219
          module.debug('Animation complete', settings.animation);      // 220
          module.remove.completeCallback();                            // 221
          module.remove.failSafe();                                    // 222
          if (!module.is.looping()) {                                  // 223
            if (module.is.outward()) {                                 // 224
              module.verbose('Animation is outward, hiding element');  // 225
              module.restore.conditions();                             // 226
              module.hide();                                           // 227
            } else if (module.is.inward()) {                           //
              module.verbose('Animation is outward, showing element');
              module.restore.conditions();                             // 231
              module.show();                                           // 232
            } else {                                                   //
              module.restore.conditions();                             // 235
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        force: {                                                       // 240
          visible: function () {                                       // 241
            var style = $module.attr('style'),                         // 242
                userStyle = module.get.userStyle(),                    //
                displayType = module.get.displayType(),                //
                overrideStyle = userStyle + 'display: ' + displayType + ' !important;',
                currentDisplay = $module.css('display'),               //
                emptyStyle = style === undefined || style === '';      //
            if (currentDisplay !== displayType) {                      // 250
              module.verbose('Overriding default display to show element', displayType);
              $module.attr('style', overrideStyle);                    // 252
            } else if (emptyStyle) {                                   //
              $module.removeAttr('style');                             // 257
            }                                                          //
          },                                                           //
          hidden: function () {                                        // 260
            var style = $module.attr('style'),                         // 261
                currentDisplay = $module.css('display'),               //
                emptyStyle = style === undefined || style === '';      //
            if (currentDisplay !== 'none' && !module.is.hidden()) {    // 266
              module.verbose('Overriding default display to hide element');
              $module.css('display', 'none');                          // 268
            } else if (emptyStyle) {                                   //
              $module.removeAttr('style');                             // 273
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 280
          direction: function (animation) {                            // 281
            var hasDirection = false;                                  // 282
            animation = animation || settings.animation;               // 285
            if (typeof animation === 'string') {                       // 286
              animation = animation.split(' ');                        // 287
              $.each(animation, function (index, word) {               // 288
                if (word === className.inward || word === className.outward) {
                  hasDirection = true;                                 // 290
                }                                                      //
              });                                                      //
            }                                                          //
            return hasDirection;                                       // 294
          },                                                           //
          inlineDisplay: function () {                                 // 296
            var style = $module.attr('style') || '';                   // 297
            return $.isArray(style.match(/display.*?;/, ''));          // 300
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 304
          animating: function (animation) {                            // 305
            var animationClass, direction;                             // 306
            // remove previous callbacks                               //
            module.remove.completeCallback();                          // 311
                                                                       //
            // determine exact animation                               //
            animation = animation || settings.animation;               // 314
            animationClass = module.get.animationClass(animation);     // 315
                                                                       //
            // save animation class in cache to restore class names    //
            module.save.animation(animationClass);                     // 318
                                                                       //
            // override display if necessary so animation appears visibly
            module.force.visible();                                    // 321
                                                                       //
            module.remove.hidden();                                    // 323
            module.remove.direction();                                 // 324
                                                                       //
            module.start.animation(animationClass);                    // 326
          },                                                           //
          duration: function (animationName, duration) {               // 329
            duration = duration || settings.duration;                  // 330
            duration = typeof duration == 'number' ? duration + 'ms' : duration;
            if (duration || duration === 0) {                          // 335
              module.verbose('Setting animation duration', duration);  // 336
              $module.css({                                            // 337
                'animation-duration': duration                         // 339
              });                                                      //
            }                                                          //
          },                                                           //
          direction: function (direction) {                            // 344
            direction = direction || module.get.direction();           // 345
            if (direction == className.inward) {                       // 346
              module.set.inward();                                     // 347
            } else {                                                   //
              module.set.outward();                                    // 350
            }                                                          //
          },                                                           //
          looping: function () {                                       // 353
            module.debug('Transition set to loop');                    // 354
            $module.addClass(className.looping);                       // 355
          },                                                           //
          hidden: function () {                                        // 359
            $module.addClass(className.transition).addClass(className.hidden);
          },                                                           //
          inward: function () {                                        // 365
            module.debug('Setting direction to inward');               // 366
            $module.removeClass(className.outward).addClass(className.inward);
          },                                                           //
          outward: function () {                                       // 372
            module.debug('Setting direction to outward');              // 373
            $module.removeClass(className.inward).addClass(className.outward);
          },                                                           //
          visible: function () {                                       // 379
            $module.addClass(className.transition).addClass(className.visible);
          }                                                            //
        },                                                             //
                                                                       //
        start: {                                                       // 387
          animation: function (animationClass) {                       // 388
            animationClass = animationClass || module.get.animationClass();
            module.debug('Starting tween', animationClass);            // 390
            $module.addClass(animationClass).one(animationEnd + '.complete' + eventNamespace, module.complete);
            if (settings.useFailSafe) {                                // 395
              module.add.failSafe();                                   // 396
            }                                                          //
            module.set.duration(settings.duration);                    // 398
            settings.onStart.call(element);                            // 399
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 403
          animation: function (animation) {                            // 404
            if (!module.cache) {                                       // 405
              module.cache = {};                                       // 406
            }                                                          //
            module.cache.animation = animation;                        // 408
          },                                                           //
          displayType: function (displayType) {                        // 410
            if (displayType !== 'none') {                              // 411
              $module.data(metadata.displayType, displayType);         // 412
            }                                                          //
          },                                                           //
          transitionExists: function (animation, exists) {             // 415
            $.fn.transition.exists[animation] = exists;                // 416
            module.verbose('Saving existence of transition', animation, exists);
          }                                                            //
        },                                                             //
                                                                       //
        restore: {                                                     // 421
          conditions: function () {                                    // 422
            var animation = module.get.currentAnimation();             // 423
            if (animation) {                                           // 426
              $module.removeClass(animation);                          // 427
              module.verbose('Removing animation class', module.cache);
            }                                                          //
            module.remove.duration();                                  // 432
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 436
          failSafe: function () {                                      // 437
            var duration = module.get.duration();                      // 438
            module.timer = setTimeout(function () {                    // 441
              $module.triggerHandler(animationEnd);                    // 442
            }, duration + settings.failSafeDelay);                     //
            module.verbose('Adding fail safe timer', module.timer);    // 444
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 448
          animating: function () {                                     // 449
            $module.removeClass(className.animating);                  // 450
          },                                                           //
          animationCallbacks: function () {                            // 452
            module.remove.queueCallback();                             // 453
            module.remove.completeCallback();                          // 454
          },                                                           //
          queueCallback: function () {                                 // 456
            $module.off('.queue' + eventNamespace);                    // 457
          },                                                           //
          completeCallback: function () {                              // 459
            $module.off('.complete' + eventNamespace);                 // 460
          },                                                           //
          display: function () {                                       // 462
            $module.css('display', '');                                // 463
          },                                                           //
          direction: function () {                                     // 465
            $module.removeClass(className.inward).removeClass(className.outward);
          },                                                           //
          duration: function () {                                      // 471
            $module.css('animation-duration', '');                     // 472
          },                                                           //
          failSafe: function () {                                      // 476
            module.verbose('Removing fail safe timer', module.timer);  // 477
            if (module.timer) {                                        // 478
              clearTimeout(module.timer);                              // 479
            }                                                          //
          },                                                           //
          hidden: function () {                                        // 482
            $module.removeClass(className.hidden);                     // 483
          },                                                           //
          visible: function () {                                       // 485
            $module.removeClass(className.visible);                    // 486
          },                                                           //
          looping: function () {                                       // 488
            module.debug('Transitions are no longer looping');         // 489
            if (module.is.looping()) {                                 // 490
              module.reset();                                          // 491
              $module.removeClass(className.looping);                  // 492
            }                                                          //
          },                                                           //
          transition: function () {                                    // 497
            $module.removeClass(className.visible).removeClass(className.hidden);
          }                                                            //
        },                                                             //
        get: {                                                         // 504
          settings: function (animation, duration, onComplete) {       // 505
            // single settings object                                  //
            if (typeof animation == 'object') {                        // 507
              return $.extend(true, {}, $.fn.transition.settings, animation);
            }                                                          //
            // all arguments provided                                  //
            else if (typeof onComplete == 'function') {                //
                return $.extend({}, $.fn.transition.settings, {        // 512
                  animation: animation,                                // 513
                  onComplete: onComplete,                              // 514
                  duration: duration                                   // 515
                });                                                    //
              }                                                        //
              // only duration provided                                //
              else if (typeof duration == 'string' || typeof duration == 'number') {
                  return $.extend({}, $.fn.transition.settings, {      // 520
                    animation: animation,                              // 521
                    duration: duration                                 // 522
                  });                                                  //
                }                                                      //
                // duration is actually settings object                //
                else if (typeof duration == 'object') {                //
                    return $.extend({}, $.fn.transition.settings, duration, {
                      animation: animation                             // 528
                    });                                                //
                  }                                                    //
                  // duration is actually callback                     //
                  else if (typeof duration == 'function') {            //
                      return $.extend({}, $.fn.transition.settings, {  // 533
                        animation: animation,                          // 534
                        onComplete: duration                           // 535
                      });                                              //
                    }                                                  //
                    // only animation provided                         //
                    else {                                             //
                        return $.extend({}, $.fn.transition.settings, {
                          animation: animation                         // 541
                        });                                            //
                      }                                                //
            return $.fn.transition.settings;                           // 544
          },                                                           //
          animationClass: function (animation) {                       // 546
            var animationClass = animation || settings.animation,      // 547
                directionClass = module.can.transition() && !module.has.direction() ? module.get.direction() + ' ' : '';
            return className.animating + ' ' + className.transition + ' ' + directionClass + animationClass;
          },                                                           //
          currentAnimation: function () {                              // 559
            return module.cache && module.cache.animation !== undefined ? module.cache.animation : false;
          },                                                           //
          currentDirection: function () {                              // 565
            return module.is.inward() ? className.inward : className.outward;
          },                                                           //
          direction: function () {                                     // 571
            return module.is.hidden() || !module.is.visible() ? className.inward : className.outward;
          },                                                           //
          animationDirection: function (animation) {                   // 577
            var direction;                                             // 578
            animation = animation || settings.animation;               // 581
            if (typeof animation === 'string') {                       // 582
              animation = animation.split(' ');                        // 583
              // search animation name for out/in class                //
              $.each(animation, function (index, word) {               // 585
                if (word === className.inward) {                       // 586
                  direction = className.inward;                        // 587
                } else if (word === className.outward) {               //
                  direction = className.outward;                       // 590
                }                                                      //
              });                                                      //
            }                                                          //
            // return found direction                                  //
            if (direction) {                                           // 595
              return direction;                                        // 596
            }                                                          //
            return false;                                              // 598
          },                                                           //
          duration: function (duration) {                              // 600
            duration = duration || settings.duration;                  // 601
            if (duration === false) {                                  // 602
              duration = $module.css('animation-duration') || 0;       // 603
            }                                                          //
            return typeof duration === 'string' ? duration.indexOf('ms') > -1 ? parseFloat(duration) : parseFloat(duration) * 1000 : duration;
          },                                                           //
          displayType: function () {                                   // 612
            if (settings.displayType) {                                // 613
              return settings.displayType;                             // 614
            }                                                          //
            if ($module.data(metadata.displayType) === undefined) {    // 616
              // create fake element to determine display state        //
              module.can.transition(true);                             // 618
            }                                                          //
            return $module.data(metadata.displayType);                 // 620
          },                                                           //
          userStyle: function (style) {                                // 622
            style = style || $module.attr('style') || '';              // 623
            return style.replace(/display.*?;/, '');                   // 624
          },                                                           //
          transitionExists: function (animation) {                     // 626
            return $.fn.transition.exists[animation];                  // 627
          },                                                           //
          animationStartEvent: function () {                           // 629
            var element = document.createElement('div'),               // 630
                animations = {                                         //
              'animation': 'animationstart',                           // 633
              'OAnimation': 'oAnimationStart',                         // 634
              'MozAnimation': 'mozAnimationStart',                     // 635
              'WebkitAnimation': 'webkitAnimationStart'                // 636
            },                                                         //
                animation;                                             //
            for (animation in babelHelpers.sanitizeForInObject(animations)) {
              if (element.style[animation] !== undefined) {            // 641
                return animations[animation];                          // 642
              }                                                        //
            }                                                          //
            return false;                                              // 645
          },                                                           //
          animationEndEvent: function () {                             // 647
            var element = document.createElement('div'),               // 648
                animations = {                                         //
              'animation': 'animationend',                             // 651
              'OAnimation': 'oAnimationEnd',                           // 652
              'MozAnimation': 'mozAnimationEnd',                       // 653
              'WebkitAnimation': 'webkitAnimationEnd'                  // 654
            },                                                         //
                animation;                                             //
            for (animation in babelHelpers.sanitizeForInObject(animations)) {
              if (element.style[animation] !== undefined) {            // 659
                return animations[animation];                          // 660
              }                                                        //
            }                                                          //
            return false;                                              // 663
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        can: {                                                         // 668
          transition: function (forced) {                              // 669
            var animation = settings.animation,                        // 670
                transitionExists = module.get.transitionExists(animation),
                elementClass,                                          //
                tagName,                                               //
                $clone,                                                //
                currentAnimation,                                      //
                inAnimation,                                           //
                directionExists,                                       //
                displayType;                                           //
            if (transitionExists === undefined || forced) {            // 681
              module.verbose('Determining whether animation exists');  // 682
              elementClass = $module.attr('class');                    // 683
              tagName = $module.prop('tagName');                       // 684
                                                                       //
              $clone = $('<' + tagName + ' />').addClass(elementClass).insertAfter($module);
              currentAnimation = $clone.addClass(animation).removeClass(className.inward).removeClass(className.outward).addClass(className.animating).addClass(className.transition).css('animationName');
              inAnimation = $clone.addClass(className.inward).css('animationName');
              displayType = $clone.attr('class', elementClass).removeAttr('style').removeClass(className.hidden).removeClass(className.visible).show().css('display');
              module.verbose('Determining final display state', displayType);
              module.save.displayType(displayType);                    // 708
                                                                       //
              $clone.remove();                                         // 710
              if (currentAnimation != inAnimation) {                   // 711
                module.debug('Direction exists for animation', animation);
                directionExists = true;                                // 713
              } else if (currentAnimation == 'none' || !currentAnimation) {
                module.debug('No animation defined in css', animation);
                return;                                                // 717
              } else {                                                 //
                module.debug('Static animation found', animation, displayType);
                directionExists = false;                               // 721
              }                                                        //
              module.save.transitionExists(animation, directionExists);
            }                                                          //
            return transitionExists !== undefined ? transitionExists : directionExists;
          },                                                           //
          animate: function () {                                       // 730
            // can transition does not return a value if animation does not exist
            return module.can.transition() !== undefined;              // 732
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 736
          animating: function () {                                     // 737
            return $module.hasClass(className.animating);              // 738
          },                                                           //
          inward: function () {                                        // 740
            return $module.hasClass(className.inward);                 // 741
          },                                                           //
          outward: function () {                                       // 743
            return $module.hasClass(className.outward);                // 744
          },                                                           //
          looping: function () {                                       // 746
            return $module.hasClass(className.looping);                // 747
          },                                                           //
          occurring: function (animation) {                            // 749
            animation = animation || settings.animation;               // 750
            animation = '.' + animation.replace(' ', '.');             // 751
            return $module.filter(animation).length > 0;               // 752
          },                                                           //
          visible: function () {                                       // 754
            return $module.is(':visible');                             // 755
          },                                                           //
          hidden: function () {                                        // 757
            return $module.css('visibility') === 'hidden';             // 758
          },                                                           //
          supported: function () {                                     // 760
            return animationEnd !== false;                             // 761
          }                                                            //
        },                                                             //
                                                                       //
        hide: function () {                                            // 765
          module.verbose('Hiding element');                            // 766
          if (module.is.animating()) {                                 // 767
            module.reset();                                            // 768
          }                                                            //
          element.blur(); // IE will trigger focus change if element is not blurred before hiding
          module.remove.display();                                     // 771
          module.remove.visible();                                     // 772
          module.set.hidden();                                         // 773
          module.force.hidden();                                       // 774
          settings.onHide.call(element);                               // 775
          settings.onComplete.call(element);                           // 776
          // module.repaint();                                         //
        },                                                             //
                                                                       //
        show: function (display) {                                     // 780
          module.verbose('Showing element', display);                  // 781
          module.remove.hidden();                                      // 782
          module.set.visible();                                        // 783
          module.force.visible();                                      // 784
          settings.onShow.call(element);                               // 785
          settings.onComplete.call(element);                           // 786
          // module.repaint();                                         //
        },                                                             //
                                                                       //
        toggle: function () {                                          // 790
          if (module.is.visible()) {                                   // 791
            module.hide();                                             // 792
          } else {                                                     //
            module.show();                                             // 795
          }                                                            //
        },                                                             //
                                                                       //
        stop: function () {                                            // 799
          module.debug('Stopping current animation');                  // 800
          $module.triggerHandler(animationEnd);                        // 801
        },                                                             //
                                                                       //
        stopAll: function () {                                         // 804
          module.debug('Stopping all animation');                      // 805
          module.remove.queueCallback();                               // 806
          $module.triggerHandler(animationEnd);                        // 807
        },                                                             //
                                                                       //
        clear: {                                                       // 810
          queue: function () {                                         // 811
            module.debug('Clearing animation queue');                  // 812
            module.remove.queueCallback();                             // 813
          }                                                            //
        },                                                             //
                                                                       //
        enable: function () {                                          // 817
          module.verbose('Starting animation');                        // 818
          $module.removeClass(className.disabled);                     // 819
        },                                                             //
                                                                       //
        disable: function () {                                         // 822
          module.debug('Stopping animation');                          // 823
          $module.addClass(className.disabled);                        // 824
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
                'Element': element,                                    // 891
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
            if ($allModules.length > 1) {                              // 912
              title += ' ' + '(' + $allModules.length + ')';           // 913
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 916
              if (console.table) {                                     // 917
                console.table(performance);                            // 918
              } else {                                                 //
                $.each(performance, function (index, data) {           // 921
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 925
            }                                                          //
            performance = [];                                          // 927
          }                                                            //
        },                                                             //
        // modified for transition to return invoke success            //
        invoke: function (query, passedArguments, context) {           // 931
          var object = instance,                                       // 932
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 938
          context = element || context;                                // 939
          if (typeof query == 'string' && object !== undefined) {      // 940
            query = query.split(/[\. ]/);                              // 941
            maxDepth = query.length - 1;                               // 942
            $.each(query, function (depth, value) {                    // 943
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 949
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 952
                return false;                                          // 953
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 956
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 959
                return false;                                          // 960
              } else {                                                 //
                return false;                                          // 963
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 967
            response = found.apply(context, passedArguments);          // 968
          } else if (found !== undefined) {                            //
            response = found;                                          // 971
          }                                                            //
                                                                       //
          if ($.isArray(returnedValue)) {                              // 974
            returnedValue.push(response);                              // 975
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 978
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 981
          }                                                            //
          return found !== undefined ? found : false;                  // 983
        }                                                              //
      };                                                               //
      module.initialize();                                             // 989
    });                                                                //
    return returnedValue !== undefined ? returnedValue : this;         // 992
  };                                                                   //
                                                                       //
  // Records if CSS transition is available                            //
  $.fn.transition.exists = {};                                         // 999
                                                                       //
  $.fn.transition.settings = {                                         // 1001
                                                                       //
    // module info                                                     //
    name: 'Transition',                                                // 1004
                                                                       //
    // debug content outputted to console                              //
    debug: false,                                                      // 1007
                                                                       //
    // verbose debug output                                            //
    verbose: false,                                                    // 1010
                                                                       //
    // performance data output                                         //
    performance: true,                                                 // 1013
                                                                       //
    // event namespace                                                 //
    namespace: 'transition',                                           // 1016
                                                                       //
    // delay between animations in group                               //
    interval: 0,                                                       // 1019
                                                                       //
    // whether group animations should be reversed                     //
    reverse: 'auto',                                                   // 1022
                                                                       //
    // animation callback event                                        //
    onStart: function () {},                                           // 1025
    onComplete: function () {},                                        // 1026
    onShow: function () {},                                            // 1027
    onHide: function () {},                                            // 1028
                                                                       //
    // whether timeout should be used to ensure callback fires in cases animationend does not
    useFailSafe: true,                                                 // 1031
                                                                       //
    // delay in ms for fail safe                                       //
    failSafeDelay: 100,                                                // 1034
                                                                       //
    // whether EXACT animation can occur twice in a row                //
    allowRepeats: false,                                               // 1037
                                                                       //
    // Override final display type on visible                          //
    displayType: false,                                                // 1040
                                                                       //
    // animation duration                                              //
    animation: 'fade',                                                 // 1043
    duration: false,                                                   // 1044
                                                                       //
    // new animations will occur after previous ones                   //
    queue: true,                                                       // 1047
                                                                       //
    metadata: {                                                        // 1049
      displayType: 'display'                                           // 1050
    },                                                                 //
                                                                       //
    className: {                                                       // 1053
      animating: 'animating',                                          // 1054
      disabled: 'disabled',                                            // 1055
      hidden: 'hidden',                                                // 1056
      inward: 'in',                                                    // 1057
      loading: 'loading',                                              // 1058
      looping: 'looping',                                              // 1059
      outward: 'out',                                                  // 1060
      transition: 'transition',                                        // 1061
      visible: 'visible'                                               // 1062
    },                                                                 //
                                                                       //
    // possible errors                                                 //
    error: {                                                           // 1066
      noAnimation: 'There is no css animation matching the one you specified. Please make sure your css is vendor prefixed, and you have included transition css.',
      repeated: 'That animation is already occurring, cancelling repeated animation',
      method: 'The method you called is not defined',                  // 1069
      support: 'This browser does not support CSS animations'          // 1070
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
