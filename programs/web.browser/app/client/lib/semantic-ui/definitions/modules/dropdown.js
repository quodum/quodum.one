(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/dropdown.js              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Dropdown                                            //
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
  $.fn.dropdown = function (parameters) {                              // 20
    var $allModules = $(this),                                         // 21
        $document = $(document),                                       //
        moduleSelector = $allModules.selector || '',                   //
        hasTouch = ('ontouchstart' in document.documentElement),       //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function (elementIndex) {                         // 37
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.dropdown.settings, parameters) : $.extend({}, $.fn.dropdown.settings),
          className = settings.className,                              //
          message = settings.message,                                  //
          fields = settings.fields,                                    //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          regExp = settings.regExp,                                    //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          templates = settings.templates,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $text = $module.find(selector.text),                         //
          $search = $module.find(selector.search),                     //
          $input = $module.find(selector.input),                       //
          $icon = $module.find(selector.icon),                         //
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev(),
          $menu = $module.children(selector.menu),                     //
          $item = $menu.find(selector.item),                           //
          activated = false,                                           //
          itemActivated = false,                                       //
          internalChange = false,                                      //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          initialLoad,                                                 //
          pageLostFocus,                                               //
          elementNamespace,                                            //
          id,                                                          //
          selectObserver,                                              //
          menuObserver,                                                //
          module;                                                      //
                                                                       //
      module = {                                                       // 86
                                                                       //
        initialize: function () {                                      // 88
          module.debug('Initializing dropdown', settings);             // 89
                                                                       //
          if (module.is.alreadySetup()) {                              // 91
            module.setup.reference();                                  // 92
          } else {                                                     //
            module.setup.layout();                                     // 95
            module.refreshData();                                      // 96
                                                                       //
            module.save.defaults();                                    // 98
            module.restore.selected();                                 // 99
                                                                       //
            module.create.id();                                        // 101
            module.bind.events();                                      // 102
                                                                       //
            module.observeChanges();                                   // 104
            module.instantiate();                                      // 105
          }                                                            //
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 110
          module.verbose('Storing instance of dropdown', module);      // 111
          instance = module;                                           // 112
          $module.data(moduleNamespace, module);                       // 113
        },                                                             //
                                                                       //
        destroy: function () {                                         // 118
          module.verbose('Destroying previous dropdown', $module);     // 119
          module.remove.tabbable();                                    // 120
          $module.off(eventNamespace).removeData(moduleNamespace);     // 121
          $menu.off(eventNamespace);                                   // 125
          $document.off(elementNamespace);                             // 128
          if (selectObserver) {                                        // 131
            selectObserver.disconnect();                               // 132
          }                                                            //
          if (menuObserver) {                                          // 134
            menuObserver.disconnect();                                 // 135
          }                                                            //
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 139
          if ('MutationObserver' in window) {                          // 140
            selectObserver = new MutationObserver(function (mutations) {
              module.debug('<select> modified, recreating menu');      // 142
              module.setup.select();                                   // 143
            });                                                        //
            menuObserver = new MutationObserver(function (mutations) {
              module.debug('Menu modified, updating selector cache');  // 146
              module.refresh();                                        // 147
            });                                                        //
            if (module.has.input()) {                                  // 149
              selectObserver.observe($input[0], {                      // 150
                childList: true,                                       // 151
                subtree: true                                          // 152
              });                                                      //
            }                                                          //
            if (module.has.menu()) {                                   // 155
              menuObserver.observe($menu[0], {                         // 156
                childList: true,                                       // 157
                subtree: true                                          // 158
              });                                                      //
            }                                                          //
            module.debug('Setting up mutation observer', selectObserver, menuObserver);
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 165
          id: function () {                                            // 166
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;                               // 168
            module.verbose('Creating unique id for element', id);      // 169
          },                                                           //
          userChoice: function (values) {                              // 171
            var $userChoices, $userChoice, isUserValue, html;          // 172
            values = values || module.get.userValues();                // 178
            if (!values) {                                             // 179
              return false;                                            // 180
            }                                                          //
            values = $.isArray(values) ? values : [values];            // 182
            $.each(values, function (index, value) {                   // 186
              if (module.get.item(value) === false) {                  // 187
                html = settings.templates.addition(module.add.variables(message.addResult, value));
                $userChoice = $('<div />').html(html).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).addClass(className.addition).addClass(className.item);
                $userChoices = $userChoices === undefined ? $userChoice : $userChoices.add($userChoice);
                module.verbose('Creating user choices for value', value, $userChoice);
              }                                                        //
            });                                                        //
            return $userChoices;                                       // 203
          },                                                           //
          userLabels: function (value) {                               // 205
            var userValues = module.get.userValues();                  // 206
            if (userValues) {                                          // 209
              module.debug('Adding user labels', userValues);          // 210
              $.each(userValues, function (index, value) {             // 211
                module.verbose('Adding custom user value');            // 212
                module.add.label(value, value);                        // 213
              });                                                      //
            }                                                          //
          },                                                           //
          menu: function () {                                          // 217
            $menu = $('<div />').addClass(className.menu).appendTo($module);
          }                                                            //
        },                                                             //
                                                                       //
        search: function (query) {                                     // 225
          query = query !== undefined ? query : module.get.query();    // 226
          module.verbose('Searching for query', query);                // 230
          module.filter(query);                                        // 231
        },                                                             //
                                                                       //
        select: {                                                      // 234
          firstUnfiltered: function () {                               // 235
            module.verbose('Selecting first non-filtered element');    // 236
            module.remove.selectedItem();                              // 237
            $item.not(selector.unselectable).eq(0).addClass(className.selected);
          },                                                           //
          nextAvailable: function ($selected) {                        // 244
            $selected = $selected.eq(0);                               // 245
            var $nextAvailable = $selected.nextAll(selector.item).not(selector.unselectable).eq(0),
                $prevAvailable = $selected.prevAll(selector.item).not(selector.unselectable).eq(0),
                hasNext = $nextAvailable.length > 0;                   //
            if (hasNext) {                                             // 251
              module.verbose('Moving selection to', $nextAvailable);   // 252
              $nextAvailable.addClass(className.selected);             // 253
            } else {                                                   //
              module.verbose('Moving selection to', $prevAvailable);   // 256
              $prevAvailable.addClass(className.selected);             // 257
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setup: {                                                       // 262
          api: function () {                                           // 263
            var apiSettings = {                                        // 264
              debug: settings.debug,                                   // 266
              on: false                                                // 267
            };                                                         //
            module.verbose('First request, initializing API');         // 270
            $module.api(apiSettings);                                  // 271
          },                                                           //
          layout: function () {                                        // 275
            if ($module.is('select')) {                                // 276
              module.setup.select();                                   // 277
              module.setup.returnedObject();                           // 278
            }                                                          //
            if (!module.has.menu()) {                                  // 280
              module.create.menu();                                    // 281
            }                                                          //
            if (module.is.search() && !module.has.search()) {          // 283
              module.verbose('Adding search input');                   // 284
              $search = $('<input />').addClass(className.search).insertBefore($text);
            }                                                          //
            if (settings.allowTab) {                                   // 290
              module.set.tabbable();                                   // 291
            }                                                          //
          },                                                           //
          select: function () {                                        // 294
            var selectValues = module.get.selectValues();              // 295
            module.debug('Dropdown initialized on a select', selectValues);
            if ($module.is('select')) {                                // 299
              $input = $module;                                        // 300
            }                                                          //
            // see if select is placed correctly already               //
            if ($input.parent(selector.dropdown).length > 0) {         // 303
              module.debug('UI dropdown already exists. Creating dropdown menu only');
              $module = $input.closest(selector.dropdown);             // 305
              if (!module.has.menu()) {                                // 306
                module.create.menu();                                  // 307
              }                                                        //
              $menu = $module.children(selector.menu);                 // 309
              module.setup.menu(selectValues);                         // 310
            } else {                                                   //
              module.debug('Creating entire dropdown from select');    // 313
              $module = $('<div />').attr('class', $input.attr('class')).addClass(className.selection).addClass(className.dropdown).html(templates.dropdown(selectValues)).insertBefore($input);
              if ($input.hasClass(className.multiple) && $input.prop('multiple') === false) {
                module.error(error.missingMultiple);                   // 322
                $input.prop('multiple', true);                         // 323
              }                                                        //
              if ($input.is('[multiple]')) {                           // 325
                module.set.multiple();                                 // 326
              }                                                        //
              if ($input.prop('disabled')) {                           // 328
                module.debug('Disabling dropdown');                    // 329
                $module.addClass(className.disabled);                  // 330
              }                                                        //
              $input.removeAttr('class').detach().prependTo($module);  // 332
            }                                                          //
            module.refresh();                                          // 338
          },                                                           //
          menu: function (values) {                                    // 340
            $menu.html(templates.menu(values, fields));                // 341
            $item = $menu.find(selector.item);                         // 342
          },                                                           //
          reference: function () {                                     // 344
            module.debug('Dropdown behavior was called on select, replacing with closest dropdown');
            // replace module reference                                //
            $module = $module.parent(selector.dropdown);               // 347
            module.refresh();                                          // 348
            module.setup.returnedObject();                             // 349
            // invoke method in context of current instance            //
            if (methodInvoked) {                                       // 351
              instance = module;                                       // 352
              module.invoke(query);                                    // 353
            }                                                          //
          },                                                           //
          returnedObject: function () {                                // 356
            var $firstModules = $allModules.slice(0, elementIndex),    // 357
                $lastModules = $allModules.slice(elementIndex + 1);    //
            // adjust all modules to use correct reference             //
            $allModules = $firstModules.add($module).add($lastModules);
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 366
          module.refreshSelectors();                                   // 367
          module.refreshData();                                        // 368
        },                                                             //
                                                                       //
        refreshSelectors: function () {                                // 371
          module.verbose('Refreshing selector cache');                 // 372
          $text = $module.find(selector.text);                         // 373
          $search = $module.find(selector.search);                     // 374
          $input = $module.find(selector.input);                       // 375
          $icon = $module.find(selector.icon);                         // 376
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev();
          $menu = $module.children(selector.menu);                     // 381
          $item = $menu.find(selector.item);                           // 382
        },                                                             //
                                                                       //
        refreshData: function () {                                     // 385
          module.verbose('Refreshing cached metadata');                // 386
          $item.removeData(metadata.text).removeData(metadata.value);  // 387
          $module.removeData(metadata.defaultText).removeData(metadata.defaultValue).removeData(metadata.placeholderText);
        },                                                             //
                                                                       //
        toggle: function () {                                          // 398
          module.verbose('Toggling menu visibility');                  // 399
          if (!module.is.active()) {                                   // 400
            module.show();                                             // 401
          } else {                                                     //
            module.hide();                                             // 404
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 408
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.can.show() && !module.is.active()) {              // 413
            module.debug('Showing dropdown');                          // 414
            if (module.is.multiple() && !module.has.search() && module.is.allFiltered()) {
              return true;                                             // 416
            }                                                          //
            if (module.has.message() && !module.has.maxSelections()) {
              module.remove.message();                                 // 419
            }                                                          //
            if (settings.onShow.call(element) !== false) {             // 421
              module.animate.show(function () {                        // 422
                if (module.can.click()) {                              // 423
                  module.bind.intent();                                // 424
                }                                                      //
                module.set.visible();                                  // 426
                callback.call(element);                                // 427
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 433
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.active()) {                                    // 438
            module.debug('Hiding dropdown');                           // 439
            if (settings.onHide.call(element) !== false) {             // 440
              module.animate.hide(function () {                        // 441
                module.remove.visible();                               // 442
                callback.call(element);                                // 443
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hideOthers: function () {                                      // 449
          module.verbose('Finding other dropdowns to hide');           // 450
          $allModules.not($module).has(selector.menu + '.' + className.visible).dropdown('hide');
        },                                                             //
                                                                       //
        hideMenu: function () {                                        // 458
          module.verbose('Hiding menu  instantaneously');              // 459
          module.remove.active();                                      // 460
          module.remove.visible();                                     // 461
          $menu.transition('hide');                                    // 462
        },                                                             //
                                                                       //
        hideSubMenus: function () {                                    // 465
          var $subMenus = $menu.children(selector.item).find(selector.menu);
          module.verbose('Hiding sub menus', $subMenus);               // 469
          $subMenus.transition('hide');                                // 470
        },                                                             //
                                                                       //
        bind: {                                                        // 473
          events: function () {                                        // 474
            if (hasTouch) {                                            // 475
              module.bind.touchEvents();                               // 476
            }                                                          //
            module.bind.keyboardEvents();                              // 478
            module.bind.inputEvents();                                 // 479
            module.bind.mouseEvents();                                 // 480
          },                                                           //
          touchEvents: function () {                                   // 482
            module.debug('Touch device detected binding additional touch events');
            if (module.is.searchSelection()) {                         // 484
              // do nothing special yet                                //
            } else if (module.is.single()) {                           //
                $module.on('touchstart' + eventNamespace, module.event.test.toggle);
              }                                                        //
            $menu.on('touchstart' + eventNamespace, selector.item, module.event.item.mouseenter);
          },                                                           //
          keyboardEvents: function () {                                // 496
            module.verbose('Binding keyboard events');                 // 497
            $module.on('keydown' + eventNamespace, module.event.keydown);
            if (module.has.search()) {                                 // 501
              $module.on(module.get.inputEvent() + eventNamespace, selector.search, module.event.input);
            }                                                          //
            if (module.is.multiple()) {                                // 506
              $document.on('keydown' + elementNamespace, module.event.document.keydown);
            }                                                          //
          },                                                           //
          inputEvents: function () {                                   // 512
            module.verbose('Binding input change events');             // 513
            $module.on('change' + eventNamespace, selector.input, module.event.change);
          },                                                           //
          mouseEvents: function () {                                   // 518
            module.verbose('Binding mouse events');                    // 519
            if (module.is.multiple()) {                                // 520
              $module.on('click' + eventNamespace, selector.label, module.event.label.click).on('click' + eventNamespace, selector.remove, module.event.remove.click);
            }                                                          //
            if (module.is.searchSelection()) {                         // 526
              $module.on('mousedown' + eventNamespace, selector.menu, module.event.menu.mousedown).on('mouseup' + eventNamespace, selector.menu, module.event.menu.mouseup).on('click' + eventNamespace, selector.icon, module.event.icon.click).on('click' + eventNamespace, selector.search, module.show).on('focus' + eventNamespace, selector.search, module.event.search.focus).on('blur' + eventNamespace, selector.search, module.event.search.blur).on('click' + eventNamespace, selector.text, module.event.text.focus);
              if (module.is.multiple()) {                              // 536
                $module.on('click' + eventNamespace, module.event.click);
              }                                                        //
            } else {                                                   //
              if (settings.on == 'click') {                            // 543
                $module.on('click' + eventNamespace, selector.icon, module.event.icon.click).on('click' + eventNamespace, module.event.test.toggle);
              } else if (settings.on == 'hover') {                     //
                $module.on('mouseenter' + eventNamespace, module.delay.show).on('mouseleave' + eventNamespace, module.delay.hide);
              } else {                                                 //
                $module.on(settings.on + eventNamespace, module.toggle);
              }                                                        //
              $module.on('mousedown' + eventNamespace, module.event.mousedown).on('mouseup' + eventNamespace, module.event.mouseup).on('focus' + eventNamespace, module.event.focus).on('blur' + eventNamespace, module.event.blur);
            }                                                          //
            $menu.on('mouseenter' + eventNamespace, selector.item, module.event.item.mouseenter).on('mouseleave' + eventNamespace, selector.item, module.event.item.mouseleave).on('click' + eventNamespace, selector.item, module.event.item.click);
          },                                                           //
          intent: function () {                                        // 573
            module.verbose('Binding hide intent event to document');   // 574
            if (hasTouch) {                                            // 575
              $document.on('touchstart' + elementNamespace, module.event.test.touch).on('touchmove' + elementNamespace, module.event.test.touch);
            }                                                          //
            $document.on('click' + elementNamespace, module.event.test.hide);
          }                                                            //
        },                                                             //
                                                                       //
        unbind: {                                                      // 587
          intent: function () {                                        // 588
            module.verbose('Removing hide intent event from document');
            if (hasTouch) {                                            // 590
              $document.off('touchstart' + elementNamespace).off('touchmove' + elementNamespace);
            }                                                          //
            $document.off('click' + elementNamespace);                 // 596
          }                                                            //
        },                                                             //
                                                                       //
        filter: function (query) {                                     // 602
          var searchTerm = query !== undefined ? query : module.get.query(),
              afterFiltered = function () {                            //
            if (module.is.multiple()) {                                // 608
              module.filterActive();                                   // 609
            }                                                          //
            module.select.firstUnfiltered();                           // 611
            if (module.has.allResultsFiltered()) {                     // 612
              if (settings.onNoResults.call(element, searchTerm)) {    // 613
                if (!settings.allowAdditions) {                        // 614
                  module.verbose('All items filtered, showing message', searchTerm);
                  module.add.message(message.noResults);               // 616
                }                                                      //
              } else {                                                 //
                module.verbose('All items filtered, hiding dropdown', searchTerm);
                module.hideMenu();                                     // 621
              }                                                        //
            } else {                                                   //
              module.remove.message();                                 // 625
            }                                                          //
            if (settings.allowAdditions) {                             // 627
              module.add.userSuggestion(query);                        // 628
            }                                                          //
            if (module.is.searchSelection() && module.can.show() && module.is.focusedOnSearch()) {
              module.show();                                           // 631
            }                                                          //
          };                                                           //
          if (settings.useLabels && module.has.maxSelections()) {      // 635
            return;                                                    // 636
          }                                                            //
          if (settings.apiSettings) {                                  // 638
            if (module.can.useAPI()) {                                 // 639
              module.queryRemote(searchTerm, function () {             // 640
                afterFiltered();                                       // 641
              });                                                      //
            } else {                                                   //
              module.error(error.noAPI);                               // 645
            }                                                          //
          } else {                                                     //
            module.filterItems(searchTerm);                            // 649
            afterFiltered();                                           // 650
          }                                                            //
        },                                                             //
                                                                       //
        queryRemote: function (query, callback) {                      // 654
          var apiSettings = {                                          // 655
            errorDuration: false,                                      // 657
            throttle: settings.throttle,                               // 658
            urlData: {                                                 // 659
              query: query                                             // 660
            },                                                         //
            onError: function () {                                     // 662
              module.add.message(message.serverError);                 // 663
              callback();                                              // 664
            },                                                         //
            onFailure: function () {                                   // 666
              module.add.message(message.serverError);                 // 667
              callback();                                              // 668
            },                                                         //
            onSuccess: function (response) {                           // 670
              module.remove.message();                                 // 671
              module.setup.menu({                                      // 672
                values: response.results                               // 673
              });                                                      //
              callback();                                              // 675
            }                                                          //
          };                                                           //
          if (!$module.api('get request')) {                           // 679
            module.setup.api();                                        // 680
          }                                                            //
          apiSettings = $.extend(true, {}, apiSettings, settings.apiSettings);
          $module.api('setting', apiSettings).api('query');            // 683
        },                                                             //
                                                                       //
        filterItems: function (query) {                                // 689
          var searchTerm = query !== undefined ? query : module.get.query(),
              $results = $(),                                          //
              escapedTerm = module.escape.regExp(searchTerm),          //
              beginsWithRegExp = new RegExp('^' + escapedTerm, 'igm');
          // avoid loop if we're matching nothing                      //
          if (!module.has.query()) {                                   // 699
            $results = $item;                                          // 700
          } else {                                                     //
            module.verbose('Searching for matching values', searchTerm);
            $item.each(function () {                                   // 704
              var $choice = $(this),                                   // 706
                  text,                                                //
                  value;                                               //
              if (settings.match == 'both' || settings.match == 'text') {
                text = String(module.get.choiceText($choice, false));  // 712
                if (text.search(beginsWithRegExp) !== -1) {            // 713
                  $results = $results.add($choice);                    // 714
                  return true;                                         // 715
                } else if (settings.fullTextSearch && module.fuzzySearch(searchTerm, text)) {
                  $results = $results.add($choice);                    // 718
                  return true;                                         // 719
                }                                                      //
              }                                                        //
              if (settings.match == 'both' || settings.match == 'value') {
                value = String(module.get.choiceValue($choice, text));
                                                                       //
                if (value.search(beginsWithRegExp) !== -1) {           // 725
                  $results = $results.add($choice);                    // 726
                  return true;                                         // 727
                } else if (settings.fullTextSearch && module.fuzzySearch(searchTerm, value)) {
                  $results = $results.add($choice);                    // 730
                  return true;                                         // 731
                }                                                      //
              }                                                        //
            });                                                        //
          }                                                            //
          module.debug('Showing only matched items', searchTerm);      // 737
          module.remove.filteredItem();                                // 738
          $item.not($results).addClass(className.filtered);            // 739
        },                                                             //
                                                                       //
        fuzzySearch: function (query, term) {                          // 745
          var termLength = term.length,                                // 746
              queryLength = query.length;                              //
          query = query.toLowerCase();                                 // 750
          term = term.toLowerCase();                                   // 751
          if (queryLength > termLength) {                              // 752
            return false;                                              // 753
          }                                                            //
          if (queryLength === termLength) {                            // 755
            return query === term;                                     // 756
          }                                                            //
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);     // 759
            while (nextCharacterIndex < termLength) {                  // 762
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;                                       // 764
              }                                                        //
            }                                                          //
            return false;                                              // 767
          }                                                            //
          return true;                                                 // 769
        },                                                             //
                                                                       //
        filterActive: function () {                                    // 772
          if (settings.useLabels) {                                    // 773
            $item.filter('.' + className.active).addClass(className.filtered);
          }                                                            //
        },                                                             //
                                                                       //
        focusSearch: function () {                                     // 780
          if (module.is.search() && !module.is.focusedOnSearch()) {    // 781
            $search[0].focus();                                        // 782
          }                                                            //
        },                                                             //
                                                                       //
        forceSelection: function () {                                  // 786
          var $currentlySelected = $item.not(className.filtered).filter('.' + className.selected).eq(0),
              $activeItem = $item.not(className.filtered).filter('.' + className.active).eq(0),
              $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
              hasSelected = $selectedItem.size() > 0;                  //
          if (hasSelected && module.has.query()) {                     // 795
            module.debug('Forcing partial selection to selected item', $selectedItem);
            module.event.item.click.call($selectedItem);               // 797
          } else {                                                     //
            module.hide();                                             // 800
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 804
          change: function () {                                        // 805
            if (!internalChange) {                                     // 806
              module.debug('Input changed, updating selection');       // 807
              module.set.selected();                                   // 808
            }                                                          //
          },                                                           //
          focus: function () {                                         // 811
            if (settings.showOnFocus && !activated && module.is.hidden() && !pageLostFocus) {
              module.show();                                           // 813
            }                                                          //
          },                                                           //
          click: function (event) {                                    // 816
            var $target = $(event.target);                             // 817
            // focus search                                            //
            if ($target.is($module) && !module.is.focusedOnSearch()) {
              module.focusSearch();                                    // 822
            }                                                          //
          },                                                           //
          blur: function (event) {                                     // 825
            pageLostFocus = document.activeElement === this;           // 826
            if (!activated && !pageLostFocus) {                        // 827
              module.remove.activeLabel();                             // 828
              module.hide();                                           // 829
            }                                                          //
          },                                                           //
          // prevents focus callback from occurring on mousedown       //
          mousedown: function () {                                     // 833
            activated = true;                                          // 834
          },                                                           //
          mouseup: function () {                                       // 836
            activated = false;                                         // 837
          },                                                           //
          search: {                                                    // 839
            focus: function () {                                       // 840
              activated = true;                                        // 841
              if (module.is.multiple()) {                              // 842
                module.remove.activeLabel();                           // 843
              }                                                        //
              if (settings.showOnFocus) {                              // 845
                module.show();                                         // 846
              }                                                        //
            },                                                         //
            blur: function (event) {                                   // 849
              pageLostFocus = document.activeElement === this;         // 850
              if (!itemActivated && !pageLostFocus) {                  // 851
                if (module.is.multiple()) {                            // 852
                  module.remove.activeLabel();                         // 853
                  module.hide();                                       // 854
                } else if (settings.forceSelection) {                  //
                  module.forceSelection();                             // 857
                } else {                                               //
                  module.hide();                                       // 860
                }                                                      //
              } else if (pageLostFocus) {                              //
                if (settings.forceSelection) {                         // 864
                  module.forceSelection();                             // 865
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
          icon: {                                                      // 870
            click: function (event) {                                  // 871
              module.toggle();                                         // 872
              event.stopPropagation();                                 // 873
            }                                                          //
          },                                                           //
          text: {                                                      // 876
            focus: function (event) {                                  // 877
              activated = true;                                        // 878
              module.focusSearch();                                    // 879
            }                                                          //
          },                                                           //
          input: function (event) {                                    // 882
            if (module.is.multiple() || module.is.searchSelection()) {
              module.set.filtered();                                   // 884
            }                                                          //
            clearTimeout(module.timer);                                // 886
            module.timer = setTimeout(module.search, settings.delay.search);
          },                                                           //
          label: {                                                     // 889
            click: function (event) {                                  // 890
              var $label = $(this),                                    // 891
                  $labels = $module.find(selector.label),              //
                  $activeLabels = $labels.filter('.' + className.active),
                  $nextActive = $label.nextAll('.' + className.active),
                  $prevActive = $label.prevAll('.' + className.active),
                  $range = $nextActive.length > 0 ? $label.nextUntil($nextActive).add($activeLabels).add($label) : $label.prevUntil($prevActive).add($activeLabels).add($label);
              if (event.shiftKey) {                                    // 901
                $activeLabels.removeClass(className.active);           // 902
                $range.addClass(className.active);                     // 903
              } else if (event.ctrlKey) {                              //
                $label.toggleClass(className.active);                  // 906
              } else {                                                 //
                $activeLabels.removeClass(className.active);           // 909
                $label.addClass(className.active);                     // 910
              }                                                        //
              settings.onLabelSelect.apply(this, $labels.filter('.' + className.active));
            }                                                          //
          },                                                           //
          remove: {                                                    // 915
            click: function () {                                       // 916
              var $label = $(this).parent();                           // 917
              if ($label.hasClass(className.active)) {                 // 920
                // remove all selected labels                          //
                module.remove.activeLabels();                          // 922
              } else {                                                 //
                // remove this label only                              //
                module.remove.activeLabels($label);                    // 926
              }                                                        //
            }                                                          //
          },                                                           //
          test: {                                                      // 930
            toggle: function (event) {                                 // 931
              var toggleBehavior = module.is.multiple() ? module.show : module.toggle;
              if (module.determine.eventOnElement(event, toggleBehavior)) {
                event.preventDefault();                                // 938
              }                                                        //
            },                                                         //
            touch: function (event) {                                  // 941
              module.determine.eventOnElement(event, function () {     // 942
                if (event.type == 'touchstart') {                      // 943
                  module.timer = setTimeout(function () {              // 944
                    module.hide();                                     // 945
                  }, settings.delay.touch);                            //
                } else if (event.type == 'touchmove') {                //
                  clearTimeout(module.timer);                          // 949
                }                                                      //
              });                                                      //
              event.stopPropagation();                                 // 952
            },                                                         //
            hide: function (event) {                                   // 954
              module.determine.eventInModule(event, module.hide);      // 955
            }                                                          //
          },                                                           //
          menu: {                                                      // 958
            mousedown: function () {                                   // 959
              itemActivated = true;                                    // 960
            },                                                         //
            mouseup: function () {                                     // 962
              itemActivated = false;                                   // 963
            }                                                          //
          },                                                           //
          item: {                                                      // 966
            mouseenter: function (event) {                             // 967
              var $subMenu = $(this).children(selector.menu),          // 968
                  $otherMenus = $(this).siblings(selector.item).children(selector.menu);
              if ($subMenu.length > 0) {                               // 972
                clearTimeout(module.itemTimer);                        // 973
                module.itemTimer = setTimeout(function () {            // 974
                  module.verbose('Showing sub-menu', $subMenu);        // 975
                  $.each($otherMenus, function () {                    // 976
                    module.animate.hide(false, $(this));               // 977
                  });                                                  //
                  module.animate.show(false, $subMenu);                // 979
                }, settings.delay.show);                               //
                event.preventDefault();                                // 981
              }                                                        //
            },                                                         //
            mouseleave: function (event) {                             // 984
              var $subMenu = $(this).children(selector.menu);          // 985
              if ($subMenu.length > 0) {                               // 988
                clearTimeout(module.itemTimer);                        // 989
                module.itemTimer = setTimeout(function () {            // 990
                  module.verbose('Hiding sub-menu', $subMenu);         // 991
                  module.animate.hide(false, $subMenu);                // 992
                }, settings.delay.hide);                               //
              }                                                        //
            },                                                         //
            touchend: function () {},                                  // 996
            click: function (event) {                                  // 998
              var $choice = $(this),                                   // 999
                  $target = event ? $(event.target) : $(''),           //
                  $subMenu = $choice.find(selector.menu),              //
                  text = module.get.choiceText($choice),               //
                  value = module.get.choiceValue($choice, text),       //
                  hasSubMenu = $subMenu.length > 0,                    //
                  isBubbledEvent = $subMenu.find($target).length > 0;  //
              if (!isBubbledEvent && (!hasSubMenu || settings.allowCategorySelection)) {
                if (!settings.useLabels) {                             // 1011
                  module.remove.filteredItem();                        // 1012
                  module.remove.searchTerm();                          // 1013
                  module.set.scrollPosition($choice);                  // 1014
                }                                                      //
                module.determine.selectAction.call(this, text, value);
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          document: {                                                  // 1021
            // label selection should occur even when element has no focus
            keydown: function (event) {                                // 1023
              var pressedKey = event.which,                            // 1024
                  keys = module.get.shortcutKeys(),                    //
                  isShortcutKey = module.is.inObject(pressedKey, keys);
              if (isShortcutKey) {                                     // 1029
                var $label = $module.find(selector.label),             // 1030
                    $activeLabel = $label.filter('.' + className.active),
                    activeValue = $activeLabel.data(metadata.value),   //
                    labelIndex = $label.index($activeLabel),           //
                    labelCount = $label.length,                        //
                    hasActiveLabel = $activeLabel.length > 0,          //
                    hasMultipleActive = $activeLabel.length > 1,       //
                    isFirstLabel = labelIndex === 0,                   //
                    isLastLabel = labelIndex + 1 == labelCount,        //
                    isSearch = module.is.searchSelection(),            //
                    isFocusedOnSearch = module.is.focusedOnSearch(),   //
                    isFocused = module.is.focused(),                   //
                    caretAtStart = isFocusedOnSearch && module.get.caretPosition() === 0,
                    $nextLabel;                                        //
                if (isSearch && !hasActiveLabel && !isFocusedOnSearch) {
                  return;                                              // 1047
                }                                                      //
                                                                       //
                if (pressedKey == keys.leftArrow) {                    // 1050
                  // activate previous label                           //
                  if ((isFocused || caretAtStart) && !hasActiveLabel) {
                    module.verbose('Selecting previous label');        // 1053
                    $label.last().addClass(className.active);          // 1054
                  } else if (hasActiveLabel) {                         //
                    if (!event.shiftKey) {                             // 1057
                      module.verbose('Selecting previous label');      // 1058
                      $label.removeClass(className.active);            // 1059
                    } else {                                           //
                      module.verbose('Adding previous label to selection');
                    }                                                  //
                    if (isFirstLabel && !hasMultipleActive) {          // 1064
                      $activeLabel.addClass(className.active);         // 1065
                    } else {                                           //
                      $activeLabel.prev(selector.siblingLabel).addClass(className.active).end();
                    }                                                  //
                    event.preventDefault();                            // 1073
                  }                                                    //
                } else if (pressedKey == keys.rightArrow) {            //
                  // activate first label                              //
                  if (isFocused && !hasActiveLabel) {                  // 1078
                    $label.first().addClass(className.active);         // 1079
                  }                                                    //
                  // activate next label                               //
                  if (hasActiveLabel) {                                // 1082
                    if (!event.shiftKey) {                             // 1083
                      module.verbose('Selecting next label');          // 1084
                      $label.removeClass(className.active);            // 1085
                    } else {                                           //
                      module.verbose('Adding next label to selection');
                    }                                                  //
                    if (isLastLabel) {                                 // 1090
                      if (isSearch) {                                  // 1091
                        if (!isFocusedOnSearch) {                      // 1092
                          module.focusSearch();                        // 1093
                        } else {                                       //
                          $label.removeClass(className.active);        // 1096
                        }                                              //
                      } else if (hasMultipleActive) {                  //
                        $activeLabel.next(selector.siblingLabel).addClass(className.active);
                      } else {                                         //
                        $activeLabel.addClass(className.active);       // 1103
                      }                                                //
                    } else {                                           //
                      $activeLabel.next(selector.siblingLabel).addClass(className.active);
                    }                                                  //
                    event.preventDefault();                            // 1109
                  }                                                    //
                } else if (pressedKey == keys.deleteKey || pressedKey == keys.backspace) {
                  if (hasActiveLabel) {                                // 1113
                    module.verbose('Removing active labels');          // 1114
                    if (isLastLabel) {                                 // 1115
                      if (isSearch && !isFocusedOnSearch) {            // 1116
                        module.focusSearch();                          // 1117
                      }                                                //
                    }                                                  //
                    $activeLabel.last().next(selector.siblingLabel).addClass(className.active);
                    module.remove.activeLabels($activeLabel);          // 1121
                    event.preventDefault();                            // 1122
                  } else if (caretAtStart && !hasActiveLabel && pressedKey == keys.backspace) {
                    module.verbose('Removing last label on input backspace');
                    $activeLabel = $label.last().addClass(className.active);
                    module.remove.activeLabels($activeLabel);          // 1127
                  }                                                    //
                } else {                                               //
                  $activeLabel.removeClass(className.active);          // 1131
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          keydown: function (event) {                                  // 1137
            var pressedKey = event.which,                              // 1138
                keys = module.get.shortcutKeys(),                      //
                isShortcutKey = module.is.inObject(pressedKey, keys);  //
            if (isShortcutKey) {                                       // 1143
              var $currentlySelected = $item.not(selector.unselectable).filter('.' + className.selected).eq(0),
                  $activeItem = $menu.children('.' + className.active).eq(0),
                  $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
                  $visibleItems = $selectedItem.length > 0 ? $selectedItem.siblings(':not(.' + className.filtered + ')').andSelf() : $menu.children(':not(.' + className.filtered + ')'),
                  $subMenu = $selectedItem.children(selector.menu),    //
                  $parentMenu = $selectedItem.closest(selector.menu),  //
                  inVisibleMenu = $parentMenu.hasClass(className.visible) || $parentMenu.hasClass(className.animating) || $parentMenu.parent(selector.menu).length > 0,
                  hasSubMenu = $subMenu.length > 0,                    //
                  hasSelectedItem = $selectedItem.length > 0,          //
                  selectedIsSelectable = $selectedItem.not(selector.unselectable).length > 0,
                  delimiterPressed = pressedKey == keys.delimiter && settings.allowAdditions && module.is.multiple(),
                  $nextItem,                                           //
                  isSubMenuItem,                                       //
                  newIndex;                                            //
                                                                       //
              // visible menu keyboard shortcuts                       //
              if (module.is.visible()) {                               // 1166
                                                                       //
                // enter (select or open sub-menu)                     //
                if (pressedKey == keys.enter || delimiterPressed) {    // 1169
                  if (pressedKey == keys.enter && hasSelectedItem && hasSubMenu && !settings.allowCategorySelection) {
                    module.verbose('Pressed enter on unselectable category, opening sub menu');
                    pressedKey = keys.rightArrow;                      // 1172
                  } else if (selectedIsSelectable) {                   //
                    module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                    module.event.item.click.call($selectedItem, event);
                    if (module.is.searchSelection()) {                 // 1177
                      module.remove.searchTerm();                      // 1178
                    }                                                  //
                  }                                                    //
                  event.preventDefault();                              // 1181
                }                                                      //
                                                                       //
                // left arrow (hide sub-menu)                          //
                if (pressedKey == keys.leftArrow) {                    // 1185
                                                                       //
                  isSubMenuItem = $parentMenu[0] !== $menu[0];         // 1187
                                                                       //
                  if (isSubMenuItem) {                                 // 1189
                    module.verbose('Left key pressed, closing sub-menu');
                    module.animate.hide(false, $parentMenu);           // 1191
                    $selectedItem.removeClass(className.selected);     // 1192
                    $parentMenu.closest(selector.item).addClass(className.selected);
                    event.preventDefault();                            // 1199
                  }                                                    //
                }                                                      //
                                                                       //
                // right arrow (show sub-menu)                         //
                if (pressedKey == keys.rightArrow) {                   // 1204
                  if (hasSubMenu) {                                    // 1205
                    module.verbose('Right key pressed, opening sub-menu');
                    module.animate.show(false, $subMenu);              // 1207
                    $selectedItem.removeClass(className.selected);     // 1208
                    $subMenu.find(selector.item).eq(0).addClass(className.selected);
                    event.preventDefault();                            // 1215
                  }                                                    //
                }                                                      //
                                                                       //
                // up arrow (traverse menu up)                         //
                if (pressedKey == keys.upArrow) {                      // 1220
                  $nextItem = hasSelectedItem && inVisibleMenu ? $selectedItem.prevAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);
                  if ($visibleItems.index($nextItem) < 0) {            // 1225
                    module.verbose('Up key pressed but reached top of current menu');
                    event.preventDefault();                            // 1227
                    return;                                            // 1228
                  } else {                                             //
                    module.verbose('Up key pressed, changing active item');
                    $selectedItem.removeClass(className.selected);     // 1232
                    $nextItem.addClass(className.selected);            // 1235
                    module.set.scrollPosition($nextItem);              // 1238
                  }                                                    //
                  event.preventDefault();                              // 1240
                }                                                      //
                                                                       //
                // down arrow (traverse menu down)                     //
                if (pressedKey == keys.downArrow) {                    // 1244
                  $nextItem = hasSelectedItem && inVisibleMenu ? $nextItem = $selectedItem.nextAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);
                  if ($nextItem.length === 0) {                        // 1249
                    module.verbose('Down key pressed but reached bottom of current menu');
                    event.preventDefault();                            // 1251
                    return;                                            // 1252
                  } else {                                             //
                    module.verbose('Down key pressed, changing active item');
                    $item.removeClass(className.selected);             // 1256
                    $nextItem.addClass(className.selected);            // 1259
                    module.set.scrollPosition($nextItem);              // 1262
                  }                                                    //
                  event.preventDefault();                              // 1264
                }                                                      //
                                                                       //
                // page down (show next page)                          //
                if (pressedKey == keys.pageUp) {                       // 1268
                  module.scrollPage('up');                             // 1269
                  event.preventDefault();                              // 1270
                }                                                      //
                if (pressedKey == keys.pageDown) {                     // 1272
                  module.scrollPage('down');                           // 1273
                  event.preventDefault();                              // 1274
                }                                                      //
                                                                       //
                // escape (close menu)                                 //
                if (pressedKey == keys.escape) {                       // 1278
                  module.verbose('Escape key pressed, closing dropdown');
                  module.hide();                                       // 1280
                }                                                      //
              } else {                                                 //
                // delimiter key                                       //
                if (delimiterPressed) {                                // 1286
                  event.preventDefault();                              // 1287
                }                                                      //
                // down arrow (open menu)                              //
                if (pressedKey == keys.downArrow) {                    // 1290
                  module.verbose('Down key pressed, showing dropdown');
                  module.show();                                       // 1292
                  event.preventDefault();                              // 1293
                }                                                      //
              }                                                        //
            } else {                                                   //
              if (module.is.selection() && !module.is.search()) {      // 1298
                module.set.selectedLetter(String.fromCharCode(pressedKey));
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        determine: {                                                   // 1305
          selectAction: function (text, value) {                       // 1306
            module.verbose('Determining action', settings.action);     // 1307
            if ($.isFunction(module.action[settings.action])) {        // 1308
              module.verbose('Triggering preset action', settings.action, text, value);
              module.action[settings.action].call(this, text, value);  // 1310
            } else if ($.isFunction(settings.action)) {                //
              module.verbose('Triggering user action', settings.action, text, value);
              settings.action.call(this, text, value);                 // 1314
            } else {                                                   //
              module.error(error.action, settings.action);             // 1317
            }                                                          //
          },                                                           //
          eventInModule: function (event, callback) {                  // 1320
            var $target = $(event.target),                             // 1321
                inDocument = $target.closest(document.documentElement).length > 0,
                inModule = $target.closest($module).length > 0;        //
            callback = $.isFunction(callback) ? callback : function () {};
            if (inDocument && !inModule) {                             // 1330
              module.verbose('Triggering event', callback);            // 1331
              callback();                                              // 1332
              return true;                                             // 1333
            } else {                                                   //
              module.verbose('Event occurred in dropdown, canceling callback');
              return false;                                            // 1337
            }                                                          //
          },                                                           //
          eventOnElement: function (event, callback) {                 // 1340
            var $target = $(event.target),                             // 1341
                $label = $target.closest(selector.siblingLabel),       //
                notOnLabel = $module.find($label).length === 0,        //
                notInMenu = $target.closest($menu).length === 0;       //
            callback = $.isFunction(callback) ? callback : function () {};
            if (notOnLabel && notInMenu) {                             // 1351
              module.verbose('Triggering event', callback);            // 1352
              callback();                                              // 1353
              return true;                                             // 1354
            } else {                                                   //
              module.verbose('Event occurred in dropdown menu, canceling callback');
              return false;                                            // 1358
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        action: {                                                      // 1363
                                                                       //
          nothing: function () {},                                     // 1365
                                                                       //
          activate: function (text, value) {                           // 1367
            value = value !== undefined ? value : text;                // 1368
            if (module.can.activate($(this))) {                        // 1372
              module.set.selected(value, $(this));                     // 1373
              if (module.is.multiple() && !module.is.allFiltered()) {  // 1374
                return;                                                // 1375
              } else {                                                 //
                module.hideAndClear();                                 // 1378
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          select: function (text, value) {                             // 1383
            // mimics action.activate but does not select text         //
            module.action.activate.call(this);                         // 1385
          },                                                           //
                                                                       //
          combo: function (text, value) {                              // 1388
            value = value !== undefined ? value : text;                // 1389
            module.set.selected(value, $(this));                       // 1393
            module.hideAndClear();                                     // 1394
          },                                                           //
                                                                       //
          hide: function (text, value) {                               // 1397
            module.set.value(value);                                   // 1398
            module.hideAndClear();                                     // 1399
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        get: {                                                         // 1404
          id: function () {                                            // 1405
            return id;                                                 // 1406
          },                                                           //
          defaultText: function () {                                   // 1408
            return $module.data(metadata.defaultText);                 // 1409
          },                                                           //
          defaultValue: function () {                                  // 1411
            return $module.data(metadata.defaultValue);                // 1412
          },                                                           //
          placeholderText: function () {                               // 1414
            return $module.data(metadata.placeholderText) || '';       // 1415
          },                                                           //
          text: function () {                                          // 1417
            return $text.text();                                       // 1418
          },                                                           //
          query: function () {                                         // 1420
            return $.trim($search.val());                              // 1421
          },                                                           //
          searchWidth: function (characterCount) {                     // 1423
            return characterCount * settings.glyphWidth + 'em';        // 1424
          },                                                           //
          selectionCount: function () {                                // 1426
            var values = module.get.values(),                          // 1427
                count;                                                 //
            count = module.is.multiple() ? $.isArray(values) ? values.length : 0 : module.get.value() !== '' ? 1 : 0;
            return count;                                              // 1439
          },                                                           //
          transition: function ($subMenu) {                            // 1441
            return settings.transition == 'auto' ? module.is.upward($subMenu) ? 'slide up' : 'slide down' : settings.transition;
          },                                                           //
          userValues: function () {                                    // 1449
            var values = module.get.values();                          // 1450
            if (!values) {                                             // 1453
              return false;                                            // 1454
            }                                                          //
            values = $.isArray(values) ? values : [values];            // 1456
            return $.grep(values, function (value) {                   // 1460
              return module.get.item(value) === false;                 // 1461
            });                                                        //
          },                                                           //
          uniqueArray: function (array) {                              // 1464
            return $.grep(array, function (value, index) {             // 1465
              return $.inArray(value, array) === index;                // 1466
            });                                                        //
          },                                                           //
          caretPosition: function () {                                 // 1469
            var input = $search.get(0),                                // 1470
                range,                                                 //
                rangeLength;                                           //
            if ('selectionStart' in input) {                           // 1475
              return input.selectionStart;                             // 1476
            } else if (document.selection) {                           //
              input.focus();                                           // 1479
              range = document.selection.createRange();                // 1480
              rangeLength = range.text.length;                         // 1481
              range.moveStart('character', -input.value.length);       // 1482
              return range.text.length - rangeLength;                  // 1483
            }                                                          //
          },                                                           //
          shortcutKeys: function () {                                  // 1486
            return {                                                   // 1487
              backspace: 8,                                            // 1488
              delimiter: 188, // comma                                 // 1489
              deleteKey: 46,                                           // 1490
              enter: 13,                                               // 1491
              escape: 27,                                              // 1492
              pageUp: 33,                                              // 1493
              pageDown: 34,                                            // 1494
              leftArrow: 37,                                           // 1495
              upArrow: 38,                                             // 1496
              rightArrow: 39,                                          // 1497
              downArrow: 40                                            // 1498
            };                                                         //
          },                                                           //
          value: function () {                                         // 1501
            var value = $input.length > 0 ? $input.val() : $module.data(metadata.value);
            // prevents placeholder element from being selected when multiple
            if ($.isArray(value) && value.length === 1 && value[0] === '') {
              return '';                                               // 1509
            }                                                          //
            return value;                                              // 1511
          },                                                           //
          values: function () {                                        // 1513
            var value = module.get.value();                            // 1514
            if (value === '') {                                        // 1517
              return '';                                               // 1518
            }                                                          //
            return !module.has.selectInput() && module.is.multiple() ? typeof value == 'string' ? // delimited string
            value.split(settings.delimiter) : '' : value;              // 1522
          },                                                           //
          remoteValues: function () {                                  // 1527
            var values = module.get.values(),                          // 1528
                remoteValues = false;                                  //
            if (values) {                                              // 1532
              if (typeof values == 'string') {                         // 1533
                values = [values];                                     // 1534
              }                                                        //
              remoteValues = {};                                       // 1536
              $.each(values, function (index, value) {                 // 1537
                var name = module.read.remoteData(value);              // 1538
                module.verbose('Restoring value from session data', name, value);
                remoteValues[value] = name ? name : value;             // 1542
              });                                                      //
            }                                                          //
            return remoteValues;                                       // 1548
          },                                                           //
          choiceText: function ($choice, preserveHTML) {               // 1550
            preserveHTML = preserveHTML !== undefined ? preserveHTML : settings.preserveHTML;
            if ($choice) {                                             // 1555
              if ($choice.find(selector.menu).length > 0) {            // 1556
                module.verbose('Retreiving text of element with sub-menu');
                $choice = $choice.clone();                             // 1558
                $choice.find(selector.menu).remove();                  // 1559
                $choice.find(selector.menuIcon).remove();              // 1560
              }                                                        //
              return $choice.data(metadata.text) !== undefined ? $choice.data(metadata.text) : preserveHTML ? $.trim($choice.html()) : $.trim($choice.text());
            }                                                          //
          },                                                           //
          choiceValue: function ($choice, choiceText) {                // 1570
            choiceText = choiceText || module.get.choiceText($choice);
            if (!$choice) {                                            // 1572
              return false;                                            // 1573
            }                                                          //
            return $choice.data(metadata.value) !== undefined ? String($choice.data(metadata.value)) : typeof choiceText === 'string' ? $.trim(choiceText.toLowerCase()) : String(choiceText);
          },                                                           //
          inputEvent: function () {                                    // 1582
            var input = $search[0];                                    // 1583
            if (input) {                                               // 1586
              return input.oninput !== undefined ? 'input' : input.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            }                                                          //
            return false;                                              // 1594
          },                                                           //
          selectValues: function () {                                  // 1596
            var select = {};                                           // 1597
            select.values = [];                                        // 1600
            $module.find('option').each(function () {                  // 1601
              var $option = $(this),                                   // 1604
                  name = $option.html(),                               //
                  disabled = $option.attr('disabled'),                 //
                  value = $option.attr('value') !== undefined ? $option.attr('value') : name;
              if (settings.placeholder === 'auto' && value === '') {   // 1612
                select.placeholder = name;                             // 1613
              } else {                                                 //
                select.values.push({                                   // 1616
                  name: name,                                          // 1617
                  value: value,                                        // 1618
                  disabled: disabled                                   // 1619
                });                                                    //
              }                                                        //
            });                                                        //
            if (settings.placeholder && settings.placeholder !== 'auto') {
              module.debug('Setting placeholder value to', settings.placeholder);
              select.placeholder = settings.placeholder;               // 1626
            }                                                          //
            if (settings.sortSelect) {                                 // 1628
              select.values.sort(function (a, b) {                     // 1629
                return a.name > b.name ? 1 : -1;                       // 1630
              });                                                      //
              module.debug('Retrieved and sorted values from select', select);
            } else {                                                   //
              module.debug('Retreived values from select', select);    // 1638
            }                                                          //
            return select;                                             // 1640
          },                                                           //
          activeItem: function () {                                    // 1642
            return $item.filter('.' + className.active);               // 1643
          },                                                           //
          selectedItem: function () {                                  // 1645
            var $selectedItem = $item.not(selector.unselectable).filter('.' + className.selected);
            return $selectedItem.length > 0 ? $selectedItem : $item.eq(0);
          },                                                           //
          itemWithAdditions: function (value) {                        // 1654
            var $items = module.get.item(value),                       // 1655
                $userItems = module.create.userChoice(value),          //
                hasUserItems = $userItems && $userItems.length > 0;    //
            if (hasUserItems) {                                        // 1660
              $items = $items.length > 0 ? $items.add($userItems) : $userItems;
            }                                                          //
            return $items;                                             // 1666
          },                                                           //
          item: function (value, strict) {                             // 1668
            var $selectedItem = false,                                 // 1669
                shouldSearch,                                          //
                isMultiple;                                            //
            value = value !== undefined ? value : module.get.values() !== undefined ? module.get.values() : module.get.text();
            shouldSearch = isMultiple ? value.length > 0 : value !== undefined && value !== null;
            isMultiple = module.is.multiple() && $.isArray(value);     // 1684
            strict = value === '' || value === 0 ? true : strict || false;
            if (shouldSearch) {                                        // 1689
              $item.each(function () {                                 // 1690
                var $choice = $(this),                                 // 1692
                    optionText = module.get.choiceText($choice),       //
                    optionValue = module.get.choiceValue($choice, optionText);
                // safe early exit                                     //
                if (optionValue === null || optionValue === undefined) {
                  return;                                              // 1699
                }                                                      //
                if (isMultiple) {                                      // 1701
                  if ($.inArray(String(optionValue), value) !== -1 || $.inArray(optionText, value) !== -1) {
                    $selectedItem = $selectedItem ? $selectedItem.add($choice) : $choice;
                  }                                                    //
                } else if (strict) {                                   //
                  module.verbose('Ambiguous dropdown value using strict type check', $choice, value);
                  if (optionValue === value || optionText === value) {
                    $selectedItem = $choice;                           // 1712
                    return true;                                       // 1713
                  }                                                    //
                } else {                                               //
                  if (String(optionValue) == String(value) || optionText == value) {
                    module.verbose('Found select item by value', optionValue, value);
                    $selectedItem = $choice;                           // 1719
                    return true;                                       // 1720
                  }                                                    //
                }                                                      //
              });                                                      //
            }                                                          //
            return $selectedItem;                                      // 1726
          }                                                            //
        },                                                             //
                                                                       //
        check: {                                                       // 1730
          maxSelections: function (selectionCount) {                   // 1731
            if (settings.maxSelections) {                              // 1732
              selectionCount = selectionCount !== undefined ? selectionCount : module.get.selectionCount();
              if (selectionCount >= settings.maxSelections) {          // 1737
                module.debug('Maximum selection count reached');       // 1738
                if (settings.useLabels) {                              // 1739
                  $item.addClass(className.filtered);                  // 1740
                  module.add.message(message.maxSelections);           // 1741
                }                                                      //
                return true;                                           // 1743
              } else {                                                 //
                module.verbose('No longer at maximum selection count');
                module.remove.message();                               // 1747
                module.remove.filteredItem();                          // 1748
                if (module.is.searchSelection()) {                     // 1749
                  module.filterItems();                                // 1750
                }                                                      //
                return false;                                          // 1752
              }                                                        //
            }                                                          //
            return true;                                               // 1755
          }                                                            //
        },                                                             //
                                                                       //
        restore: {                                                     // 1759
          defaults: function () {                                      // 1760
            module.clear();                                            // 1761
            module.restore.defaultText();                              // 1762
            module.restore.defaultValue();                             // 1763
          },                                                           //
          defaultText: function () {                                   // 1765
            var defaultText = module.get.defaultText(),                // 1766
                placeholderText = module.get.placeholderText;          //
            if (defaultText === placeholderText) {                     // 1770
              module.debug('Restoring default placeholder text', defaultText);
              module.set.placeholderText(defaultText);                 // 1772
            } else {                                                   //
              module.debug('Restoring default text', defaultText);     // 1775
              module.set.text(defaultText);                            // 1776
            }                                                          //
          },                                                           //
          defaultValue: function () {                                  // 1779
            var defaultValue = module.get.defaultValue();              // 1780
            if (defaultValue !== undefined) {                          // 1783
              module.debug('Restoring default value', defaultValue);   // 1784
              if (defaultValue !== '') {                               // 1785
                module.set.value(defaultValue);                        // 1786
                module.set.selected();                                 // 1787
              } else {                                                 //
                module.remove.activeItem();                            // 1790
                module.remove.selectedItem();                          // 1791
              }                                                        //
            }                                                          //
          },                                                           //
          labels: function () {                                        // 1795
            if (settings.allowAdditions) {                             // 1796
              if (!settings.useLabels) {                               // 1797
                module.error(error.labels);                            // 1798
                settings.useLabels = true;                             // 1799
              }                                                        //
              module.debug('Restoring selected values');               // 1801
              module.create.userLabels();                              // 1802
            }                                                          //
            module.check.maxSelections();                              // 1804
          },                                                           //
          selected: function () {                                      // 1806
            module.restore.values();                                   // 1807
            if (module.is.multiple()) {                                // 1808
              module.debug('Restoring previously selected values and labels');
              module.restore.labels();                                 // 1810
            } else {                                                   //
              module.debug('Restoring previously selected values');    // 1813
            }                                                          //
          },                                                           //
          values: function () {                                        // 1816
            // prevents callbacks from occuring on initial load        //
            module.set.initialLoad();                                  // 1818
            if (settings.apiSettings) {                                // 1819
              if (settings.saveRemoteData) {                           // 1820
                module.restore.remoteValues();                         // 1821
              } else {                                                 //
                module.clearValue();                                   // 1824
              }                                                        //
            } else {                                                   //
              module.set.selected();                                   // 1828
            }                                                          //
            module.remove.initialLoad();                               // 1830
          },                                                           //
          remoteValues: function () {                                  // 1832
            var values = module.get.remoteValues();                    // 1833
            module.debug('Recreating selected from session data', values);
            if (values) {                                              // 1837
              if (module.is.single()) {                                // 1838
                $.each(values, function (value, name) {                // 1839
                  module.set.text(name);                               // 1840
                });                                                    //
              } else {                                                 //
                $.each(values, function (value, name) {                // 1844
                  module.add.label(value, name);                       // 1845
                });                                                    //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 1852
          remoteData: function (value) {                               // 1853
            var name;                                                  // 1854
            if (window.Storage === undefined) {                        // 1857
              module.error(error.noStorage);                           // 1858
              return;                                                  // 1859
            }                                                          //
            name = sessionStorage.getItem(value);                      // 1861
            return name !== undefined ? name : false;                  // 1862
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 1869
          defaults: function () {                                      // 1870
            module.save.defaultText();                                 // 1871
            module.save.placeholderText();                             // 1872
            module.save.defaultValue();                                // 1873
          },                                                           //
          defaultValue: function () {                                  // 1875
            var value = module.get.value();                            // 1876
            module.verbose('Saving default value as', value);          // 1879
            $module.data(metadata.defaultValue, value);                // 1880
          },                                                           //
          defaultText: function () {                                   // 1882
            var text = module.get.text();                              // 1883
            module.verbose('Saving default text as', text);            // 1886
            $module.data(metadata.defaultText, text);                  // 1887
          },                                                           //
          placeholderText: function () {                               // 1889
            var text;                                                  // 1890
            if (settings.placeholder !== false && $text.hasClass(className.placeholder)) {
              text = module.get.text();                                // 1894
              module.verbose('Saving placeholder text as', text);      // 1895
              $module.data(metadata.placeholderText, text);            // 1896
            }                                                          //
          },                                                           //
          remoteData: function (name, value) {                         // 1899
            if (window.Storage === undefined) {                        // 1900
              module.error(error.noStorage);                           // 1901
              return;                                                  // 1902
            }                                                          //
            module.verbose('Saving remote data to session storage', value, name);
            sessionStorage.setItem(value, name);                       // 1905
          }                                                            //
        },                                                             //
                                                                       //
        clear: function () {                                           // 1909
          if (module.is.multiple()) {                                  // 1910
            module.remove.labels();                                    // 1911
          } else {                                                     //
            module.remove.activeItem();                                // 1914
            module.remove.selectedItem();                              // 1915
          }                                                            //
          module.set.placeholderText();                                // 1917
          module.clearValue();                                         // 1918
        },                                                             //
                                                                       //
        clearValue: function () {                                      // 1921
          module.set.value('');                                        // 1922
        },                                                             //
                                                                       //
        scrollPage: function (direction, $selectedItem) {              // 1925
          var $currentItem = $selectedItem || module.get.selectedItem(),
              $menu = $currentItem.closest(selector.menu),             //
              menuHeight = $menu.outerHeight(),                        //
              currentScroll = $menu.scrollTop(),                       //
              itemHeight = $item.eq(0).outerHeight(),                  //
              itemsPerPage = Math.floor(menuHeight / itemHeight),      //
              maxScroll = $menu.prop('scrollHeight'),                  //
              newScroll = direction == 'up' ? currentScroll - itemHeight * itemsPerPage : currentScroll + itemHeight * itemsPerPage,
              $selectableItem = $item.not(selector.unselectable),      //
              isWithinRange,                                           //
              $nextSelectedItem,                                       //
              elementIndex;                                            //
          elementIndex = direction == 'up' ? $selectableItem.index($currentItem) - itemsPerPage : $selectableItem.index($currentItem) + itemsPerPage;
          isWithinRange = direction == 'up' ? elementIndex >= 0 : elementIndex < $selectableItem.length;
          $nextSelectedItem = isWithinRange ? $selectableItem.eq(elementIndex) : direction == 'up' ? $selectableItem.first() : $selectableItem.last();
          if ($nextSelectedItem.length > 0) {                          // 1956
            module.debug('Scrolling page', direction, $nextSelectedItem);
            $currentItem.removeClass(className.selected);              // 1958
            $nextSelectedItem.addClass(className.selected);            // 1961
            $menu.scrollTop(newScroll);                                // 1964
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 1970
          filtered: function () {                                      // 1971
            var isMultiple = module.is.multiple(),                     // 1972
                isSearch = module.is.searchSelection(),                //
                isSearchMultiple = isMultiple && isSearch,             //
                searchValue = isSearch ? module.get.query() : '',      //
                hasSearchValue = typeof searchValue === 'string' && searchValue.length > 0,
                searchWidth = module.get.searchWidth(searchValue.length),
                valueIsSet = searchValue !== '';                       //
            if (isMultiple && hasSearchValue) {                        // 1983
              module.verbose('Adjusting input width', searchWidth, settings.glyphWidth);
              $search.css('width', searchWidth);                       // 1985
            }                                                          //
            if (hasSearchValue || isSearchMultiple && valueIsSet) {    // 1987
              module.verbose('Hiding placeholder text');               // 1988
              $text.addClass(className.filtered);                      // 1989
            } else if (!isMultiple || isSearchMultiple && !valueIsSet) {
              module.verbose('Showing placeholder text');              // 1992
              $text.removeClass(className.filtered);                   // 1993
            }                                                          //
          },                                                           //
          loading: function () {                                       // 1996
            $module.addClass(className.loading);                       // 1997
          },                                                           //
          placeholderText: function (text) {                           // 1999
            text = text || module.get.placeholderText();               // 2000
            module.debug('Setting placeholder text', text);            // 2001
            module.set.text(text);                                     // 2002
            $text.addClass(className.placeholder);                     // 2003
          },                                                           //
          tabbable: function () {                                      // 2005
            if (module.has.search()) {                                 // 2006
              module.debug('Added tabindex to searchable dropdown');   // 2007
              $search.val('').attr('tabindex', 0);                     // 2008
              $menu.attr('tabindex', -1);                              // 2012
            } else {                                                   //
              module.debug('Added tabindex to dropdown');              // 2017
              if (!$module.attr('tabindex')) {                         // 2018
                $module.attr('tabindex', 0);                           // 2019
                $menu.attr('tabindex', -1);                            // 2022
              }                                                        //
            }                                                          //
          },                                                           //
          initialLoad: function () {                                   // 2028
            module.verbose('Setting initial load');                    // 2029
            initialLoad = true;                                        // 2030
          },                                                           //
          activeItem: function ($item) {                               // 2032
            if (settings.allowAdditions && $item.filter(selector.addition).length > 0) {
              $item.addClass(className.filtered);                      // 2034
            } else {                                                   //
              $item.addClass(className.active);                        // 2037
            }                                                          //
          },                                                           //
          scrollPosition: function ($item, forceScroll) {              // 2040
            var edgeTolerance = 5,                                     // 2041
                $menu,                                                 //
                hasActive,                                             //
                offset,                                                //
                itemHeight,                                            //
                itemOffset,                                            //
                menuOffset,                                            //
                menuScroll,                                            //
                menuHeight,                                            //
                abovePage,                                             //
                belowPage;                                             //
                                                                       //
            $item = $item || module.get.selectedItem();                // 2055
            $menu = $item.closest(selector.menu);                      // 2056
            hasActive = $item && $item.length > 0;                     // 2057
            forceScroll = forceScroll !== undefined ? forceScroll : false;
            if ($item && $menu.length > 0 && hasActive) {              // 2062
              itemOffset = $item.position().top;                       // 2063
                                                                       //
              $menu.addClass(className.loading);                       // 2065
              menuScroll = $menu.scrollTop();                          // 2066
              menuOffset = $menu.offset().top;                         // 2067
              itemOffset = $item.offset().top;                         // 2068
              offset = menuScroll - menuOffset + itemOffset;           // 2069
              if (!forceScroll) {                                      // 2070
                menuHeight = $menu.height();                           // 2071
                belowPage = menuScroll + menuHeight < offset + edgeTolerance;
                abovePage = offset - edgeTolerance < menuScroll;       // 2073
              }                                                        //
              module.debug('Scrolling to active item', offset);        // 2075
              if (forceScroll || abovePage || belowPage) {             // 2076
                $menu.scrollTop(offset);                               // 2077
              }                                                        //
              $menu.removeClass(className.loading);                    // 2079
            }                                                          //
          },                                                           //
          text: function (text) {                                      // 2082
            if (settings.action !== 'select') {                        // 2083
              if (settings.action == 'combo') {                        // 2084
                module.debug('Changing combo button text', text, $combo);
                if (settings.preserveHTML) {                           // 2086
                  $combo.html(text);                                   // 2087
                } else {                                               //
                  $combo.text(text);                                   // 2090
                }                                                      //
              } else {                                                 //
                if (text !== module.get.placeholderText()) {           // 2094
                  $text.removeClass(className.placeholder);            // 2095
                }                                                      //
                module.debug('Changing text', text, $text);            // 2097
                $text.removeClass(className.filtered);                 // 2098
                if (settings.preserveHTML) {                           // 2101
                  $text.html(text);                                    // 2102
                } else {                                               //
                  $text.text(text);                                    // 2105
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
          selectedLetter: function (letter) {                          // 2110
            var $selectedItem = $item.filter('.' + className.selected),
                alreadySelectedLetter = $selectedItem.length > 0 && module.has.firstLetter($selectedItem, letter),
                $nextValue = false,                                    //
                $nextItem;                                             //
            // check next of same letter                               //
            if (alreadySelectedLetter) {                               // 2118
              $nextItem = $selectedItem.nextAll($item).eq(0);          // 2119
              if (module.has.firstLetter($nextItem, letter)) {         // 2120
                $nextValue = $nextItem;                                // 2121
              }                                                        //
            }                                                          //
            // check all values                                        //
            if (!$nextValue) {                                         // 2125
              $item.each(function () {                                 // 2126
                if (module.has.firstLetter($(this), letter)) {         // 2128
                  $nextValue = $(this);                                // 2129
                  return false;                                        // 2130
                }                                                      //
              });                                                      //
            }                                                          //
            // set next value                                          //
            if ($nextValue) {                                          // 2136
              module.verbose('Scrolling to next value with letter', letter);
              module.set.scrollPosition($nextValue);                   // 2138
              $selectedItem.removeClass(className.selected);           // 2139
              $nextValue.addClass(className.selected);                 // 2140
            }                                                          //
          },                                                           //
          direction: function ($menu) {                                // 2143
            if (settings.direction == 'auto') {                        // 2144
              if (module.is.onScreen($menu)) {                         // 2145
                module.remove.upward($menu);                           // 2146
              } else {                                                 //
                module.set.upward($menu);                              // 2149
              }                                                        //
            } else if (settings.direction == 'upward') {               //
              module.set.upward($menu);                                // 2153
            }                                                          //
          },                                                           //
          upward: function ($menu) {                                   // 2156
            var $element = $menu || $module;                           // 2157
            $element.addClass(className.upward);                       // 2158
          },                                                           //
          value: function (value, text, $selected) {                   // 2160
            var hasInput = $input.length > 0,                          // 2161
                isAddition = !module.has.value(value),                 //
                currentValue = module.get.values(),                    //
                stringValue = value !== undefined ? String(value) : value,
                newValue;                                              //
            if (hasInput) {                                            // 2170
              if (stringValue == currentValue) {                       // 2171
                module.verbose('Skipping value update already same value', value, currentValue);
                if (!module.is.initialLoad()) {                        // 2173
                  return;                                              // 2174
                }                                                      //
              }                                                        //
                                                                       //
              if (module.is.single() && module.has.selectInput() && module.can.extendSelect()) {
                module.debug('Adding user option', value);             // 2179
                module.add.optionValue(value);                         // 2180
              }                                                        //
              module.debug('Updating input value', value, currentValue);
              internalChange = true;                                   // 2183
              $input.val(value);                                       // 2184
              if (settings.fireOnInit === false && module.is.initialLoad()) {
                module.debug('Input native change event ignored on initial load');
              } else {                                                 //
                $input.trigger('change');                              // 2191
              }                                                        //
              internalChange = false;                                  // 2193
            } else {                                                   //
              module.verbose('Storing value in metadata', value, $input);
              if (value !== currentValue) {                            // 2197
                $module.data(metadata.value, stringValue);             // 2198
              }                                                        //
            }                                                          //
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onChange);
            } else {                                                   //
              settings.onChange.call(element, value, text, $selected);
            }                                                          //
          },                                                           //
          active: function () {                                        // 2208
            $module.addClass(className.active);                        // 2209
          },                                                           //
          multiple: function () {                                      // 2213
            $module.addClass(className.multiple);                      // 2214
          },                                                           //
          visible: function () {                                       // 2216
            $module.addClass(className.visible);                       // 2217
          },                                                           //
          exactly: function (value, $selectedItem) {                   // 2219
            module.debug('Setting selected to exact values');          // 2220
            module.clear();                                            // 2221
            module.set.selected(value, $selectedItem);                 // 2222
          },                                                           //
          selected: function (value, $selectedItem) {                  // 2224
            var isMultiple = module.is.multiple(),                     // 2225
                $userSelectedItem;                                     //
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);
            if (!$selectedItem) {                                      // 2233
              return;                                                  // 2234
            }                                                          //
            module.debug('Setting selected menu item to', $selectedItem);
            if (module.is.single()) {                                  // 2237
              module.remove.activeItem();                              // 2238
              module.remove.selectedItem();                            // 2239
            } else if (settings.useLabels) {                           //
              module.remove.selectedItem();                            // 2242
            }                                                          //
            // select each item                                        //
            $selectedItem.each(function () {                           // 2245
              var $selected = $(this),                                 // 2247
                  selectedText = module.get.choiceText($selected),     //
                  selectedValue = module.get.choiceValue($selected, selectedText),
                  isFiltered = $selected.hasClass(className.filtered),
                  isActive = $selected.hasClass(className.active),     //
                  isUserValue = $selected.hasClass(className.addition),
                  shouldAnimate = isMultiple && $selectedItem.length == 1;
              if (isMultiple) {                                        // 2257
                if (!isActive || isUserValue) {                        // 2258
                  if (settings.apiSettings && settings.saveRemoteData) {
                    module.save.remoteData(selectedText, selectedValue);
                  }                                                    //
                  if (settings.useLabels) {                            // 2262
                    module.add.value(selectedValue, selectedText, $selected);
                    module.add.label(selectedValue, selectedText, shouldAnimate);
                    module.set.activeItem($selected);                  // 2265
                    module.filterActive();                             // 2266
                    module.select.nextAvailable($selectedItem);        // 2267
                  } else {                                             //
                    module.add.value(selectedValue, selectedText, $selected);
                    module.set.text(module.add.variables(message.count));
                    module.set.activeItem($selected);                  // 2272
                  }                                                    //
                } else if (!isFiltered) {                              //
                  module.debug('Selected active value, removing label');
                  module.remove.selected(selectedValue);               // 2277
                }                                                      //
              } else {                                                 //
                if (settings.apiSettings && settings.saveRemoteData) {
                  module.save.remoteData(selectedText, selectedValue);
                }                                                      //
                module.set.text(selectedText);                         // 2284
                module.set.value(selectedValue, selectedText, $selected);
                $selected.addClass(className.active).addClass(className.selected);
              }                                                        //
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 2296
          label: function (value, text, shouldAnimate) {               // 2297
            var $next = module.is.searchSelection() ? $search : $text,
                $label;                                                //
            $label = $('<a />').addClass(className.label).attr('data-value', value).html(templates.label(value, text));
            $label = settings.onLabelCreate.call($label, value, text);
                                                                       //
            if (module.has.label(value)) {                             // 2311
              module.debug('Label already exists, skipping', value);   // 2312
              return;                                                  // 2313
            }                                                          //
            if (settings.label.variation) {                            // 2315
              $label.addClass(settings.label.variation);               // 2316
            }                                                          //
            if (shouldAnimate === true) {                              // 2318
              module.debug('Animating in label', $label);              // 2319
              $label.addClass(className.hidden).insertBefore($next).transition(settings.label.transition, settings.label.duration);
            } else {                                                   //
              module.debug('Adding selection label', $label);          // 2327
              $label.insertBefore($next);                              // 2328
            }                                                          //
          },                                                           //
          message: function (message) {                                // 2333
            var $message = $menu.children(selector.message),           // 2334
                html = settings.templates.message(module.add.variables(message));
            if ($message.length > 0) {                                 // 2338
              $message.html(html);                                     // 2339
            } else {                                                   //
              $message = $('<div/>').html(html).addClass(className.message).appendTo($menu);
            }                                                          //
          },                                                           //
          optionValue: function (value) {                              // 2351
            var $option = $input.find('option[value="' + value + '"]'),
                hasOption = $option.length > 0;                        //
            if (hasOption) {                                           // 2356
              return;                                                  // 2357
            }                                                          //
            // temporarily disconnect observer                         //
            if (selectObserver) {                                      // 2360
              selectObserver.disconnect();                             // 2361
              module.verbose('Temporarily disconnecting mutation observer', value);
            }                                                          //
            if (module.is.single()) {                                  // 2364
              module.verbose('Removing previous user addition');       // 2365
              $input.find('option.' + className.addition).remove();    // 2366
            }                                                          //
            $('<option/>').prop('value', value).addClass(className.addition).html(value).appendTo($input);
            module.verbose('Adding user addition as an <option>', value);
            if (selectObserver) {                                      // 2375
              selectObserver.observe($input[0], {                      // 2376
                childList: true,                                       // 2377
                subtree: true                                          // 2378
              });                                                      //
            }                                                          //
          },                                                           //
          userSuggestion: function (value) {                           // 2382
            var $addition = $menu.children(selector.addition),         // 2383
                $existingItem = module.get.item(value),                //
                alreadyHasValue = $existingItem && $existingItem.not(selector.addition).length,
                hasUserSuggestion = $addition.length > 0,              //
                html;                                                  //
            if (settings.useLabels && module.has.maxSelections()) {    // 2390
              return;                                                  // 2391
            }                                                          //
            if (value === '' || alreadyHasValue) {                     // 2393
              $addition.remove();                                      // 2394
              return;                                                  // 2395
            }                                                          //
            $item.removeClass(className.selected);                     // 2397
            if (hasUserSuggestion) {                                   // 2400
              html = settings.templates.addition(module.add.variables(message.addResult, value));
              $addition.html(html).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).removeClass(className.filtered).addClass(className.selected);
              module.verbose('Replacing user suggestion with new value', $addition);
            } else {                                                   //
              $addition = module.create.userChoice(value);             // 2412
              $addition.prependTo($menu).addClass(className.selected);
              module.verbose('Adding item choice to menu corresponding with user choice addition', $addition);
            }                                                          //
          },                                                           //
          variables: function (message, term) {                        // 2420
            var hasCount = message.search('{count}') !== -1,           // 2421
                hasMaxCount = message.search('{maxCount}') !== -1,     //
                hasTerm = message.search('{term}') !== -1,             //
                values,                                                //
                count,                                                 //
                query;                                                 //
            module.verbose('Adding templated variables to message', message);
            if (hasCount) {                                            // 2430
              count = module.get.selectionCount();                     // 2431
              message = message.replace('{count}', count);             // 2432
            }                                                          //
            if (hasMaxCount) {                                         // 2434
              count = module.get.selectionCount();                     // 2435
              message = message.replace('{maxCount}', settings.maxSelections);
            }                                                          //
            if (hasTerm) {                                             // 2438
              query = term || module.get.query();                      // 2439
              message = message.replace('{term}', query);              // 2440
            }                                                          //
            return message;                                            // 2442
          },                                                           //
          value: function (addedValue, addedText, $selectedItem) {     // 2444
            var currentValue = module.get.values(),                    // 2445
                newValue;                                              //
            if (addedValue === '') {                                   // 2449
              module.debug('Cannot select blank values from multiselect');
              return;                                                  // 2451
            }                                                          //
            // extend current array                                    //
            if ($.isArray(currentValue)) {                             // 2454
              newValue = currentValue.concat([addedValue]);            // 2455
              newValue = module.get.uniqueArray(newValue);             // 2456
            } else {                                                   //
              newValue = [addedValue];                                 // 2459
            }                                                          //
            // add values                                              //
            if (module.has.selectInput()) {                            // 2462
              if (module.can.extendSelect()) {                         // 2463
                module.debug('Adding value to select', addedValue, newValue, $input);
                module.add.optionValue(addedValue);                    // 2465
              }                                                        //
            } else {                                                   //
              newValue = newValue.join(settings.delimiter);            // 2469
              module.debug('Setting hidden input to delimited value', newValue, $input);
            }                                                          //
                                                                       //
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('Skipping onadd callback on initial load', settings.onAdd);
            } else {                                                   //
              settings.onAdd.call(element, addedValue, addedText, $selectedItem);
            }                                                          //
            module.set.value(newValue, addedValue, addedText, $selectedItem);
            module.check.maxSelections();                              // 2480
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 2484
          active: function () {                                        // 2485
            $module.removeClass(className.active);                     // 2486
          },                                                           //
          activeLabel: function () {                                   // 2488
            $module.find(selector.label).removeClass(className.active);
          },                                                           //
          loading: function () {                                       // 2491
            $module.removeClass(className.loading);                    // 2492
          },                                                           //
          initialLoad: function () {                                   // 2494
            initialLoad = false;                                       // 2495
          },                                                           //
          upward: function ($menu) {                                   // 2497
            var $element = $menu || $module;                           // 2498
            $element.removeClass(className.upward);                    // 2499
          },                                                           //
          visible: function () {                                       // 2501
            $module.removeClass(className.visible);                    // 2502
          },                                                           //
          activeItem: function () {                                    // 2504
            $item.removeClass(className.active);                       // 2505
          },                                                           //
          filteredItem: function () {                                  // 2507
            if (settings.useLabels && module.has.maxSelections()) {    // 2508
              return;                                                  // 2509
            }                                                          //
            if (settings.useLabels && module.is.multiple()) {          // 2511
              $item.not('.' + className.active).removeClass(className.filtered);
            } else {                                                   //
              $item.removeClass(className.filtered);                   // 2515
            }                                                          //
          },                                                           //
          optionValue: function (value) {                              // 2518
            var $option = $input.find('option[value="' + value + '"]'),
                hasOption = $option.length > 0;                        //
            if (!hasOption || !$option.hasClass(className.addition)) {
              return;                                                  // 2524
            }                                                          //
            // temporarily disconnect observer                         //
            if (selectObserver) {                                      // 2527
              selectObserver.disconnect();                             // 2528
              module.verbose('Temporarily disconnecting mutation observer', value);
            }                                                          //
            $option.remove();                                          // 2531
            module.verbose('Removing user addition as an <option>', value);
            if (selectObserver) {                                      // 2533
              selectObserver.observe($input[0], {                      // 2534
                childList: true,                                       // 2535
                subtree: true                                          // 2536
              });                                                      //
            }                                                          //
          },                                                           //
          message: function () {                                       // 2540
            $menu.children(selector.message).remove();                 // 2541
          },                                                           //
          searchTerm: function () {                                    // 2543
            module.verbose('Cleared search term');                     // 2544
            $search.val('');                                           // 2545
            module.set.filtered();                                     // 2546
          },                                                           //
          selected: function (value, $selectedItem) {                  // 2548
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);
                                                                       //
            if (!$selectedItem) {                                      // 2554
              return false;                                            // 2555
            }                                                          //
                                                                       //
            $selectedItem.each(function () {                           // 2558
              var $selected = $(this),                                 // 2560
                  selectedText = module.get.choiceText($selected),     //
                  selectedValue = module.get.choiceValue($selected, selectedText);
              if (module.is.multiple()) {                              // 2565
                if (settings.useLabels) {                              // 2566
                  module.remove.value(selectedValue, selectedText, $selected);
                  module.remove.label(selectedValue);                  // 2568
                } else {                                               //
                  module.remove.value(selectedValue, selectedText, $selected);
                  if (module.get.selectionCount() === 0) {             // 2572
                    module.set.placeholderText();                      // 2573
                  } else {                                             //
                    module.set.text(module.add.variables(message.count));
                  }                                                    //
                }                                                      //
              } else {                                                 //
                module.remove.value(selectedValue, selectedText, $selected);
              }                                                        //
              $selected.removeClass(className.filtered).removeClass(className.active);
              if (settings.useLabels) {                                // 2587
                $selected.removeClass(className.selected);             // 2588
              }                                                        //
            });                                                        //
          },                                                           //
          selectedItem: function () {                                  // 2593
            $item.removeClass(className.selected);                     // 2594
          },                                                           //
          value: function (removedValue, removedText, $removedItem) {  // 2596
            var values = module.get.values(),                          // 2597
                newValue;                                              //
            if (module.has.selectInput()) {                            // 2601
              module.verbose('Input is <select> removing selected option', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              module.remove.optionValue(removedValue);                 // 2604
            } else {                                                   //
              module.verbose('Removing from delimited values', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              newValue = newValue.join(settings.delimiter);            // 2609
            }                                                          //
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onRemove);
            } else {                                                   //
              settings.onRemove.call(element, removedValue, removedText, $removedItem);
            }                                                          //
            module.set.value(newValue, removedText, $removedItem);     // 2617
            module.check.maxSelections();                              // 2618
          },                                                           //
          arrayValue: function (removedValue, values) {                // 2620
            if (!$.isArray(values)) {                                  // 2621
              values = [values];                                       // 2622
            }                                                          //
            values = $.grep(values, function (value) {                 // 2624
              return removedValue != value;                            // 2625
            });                                                        //
            module.verbose('Removed value from delimited string', removedValue, values);
            return values;                                             // 2628
          },                                                           //
          label: function (value, shouldAnimate) {                     // 2630
            var $labels = $module.find(selector.label),                // 2631
                $removedLabel = $labels.filter('[data-value="' + value + '"]');
            module.verbose('Removing label', $removedLabel);           // 2635
            $removedLabel.remove();                                    // 2636
          },                                                           //
          activeLabels: function ($activeLabels) {                     // 2638
            $activeLabels = $activeLabels || $module.find(selector.label).filter('.' + className.active);
            module.verbose('Removing active label selections', $activeLabels);
            module.remove.labels($activeLabels);                       // 2641
          },                                                           //
          labels: function ($labels) {                                 // 2643
            $labels = $labels || $module.find(selector.label);         // 2644
            module.verbose('Removing labels', $labels);                // 2645
            $labels.each(function () {                                 // 2646
              var value = $(this).data(metadata.value),                // 2648
                  stringValue = value !== undefined ? String(value) : value,
                  isUserValue = module.is.userValue(stringValue);      //
              if (isUserValue) {                                       // 2655
                module.remove.value(stringValue);                      // 2656
                module.remove.label(stringValue);                      // 2657
              } else {                                                 //
                // selected will also remove label                     //
                module.remove.selected(stringValue);                   // 2661
              }                                                        //
            });                                                        //
          },                                                           //
          tabbable: function () {                                      // 2666
            if (module.has.search()) {                                 // 2667
              module.debug('Searchable dropdown initialized');         // 2668
              $search.attr('tabindex', '-1');                          // 2669
              $menu.attr('tabindex', '-1');                            // 2672
            } else {                                                   //
              module.debug('Simple selection dropdown initialized');   // 2677
              $module.attr('tabindex', '-1');                          // 2678
              $menu.attr('tabindex', '-1');                            // 2681
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 2688
          search: function () {                                        // 2689
            return $search.length > 0;                                 // 2690
          },                                                           //
          selectInput: function () {                                   // 2692
            return $input.is('select');                                // 2693
          },                                                           //
          firstLetter: function ($item, letter) {                      // 2695
            var text, firstLetter;                                     // 2696
            if (!$item || $item.length === 0 || typeof letter !== 'string') {
              return false;                                            // 2701
            }                                                          //
            text = module.get.choiceText($item, false);                // 2703
            letter = letter.toLowerCase();                             // 2704
            firstLetter = String(text).charAt(0).toLowerCase();        // 2705
            return letter == firstLetter;                              // 2706
          },                                                           //
          input: function () {                                         // 2708
            return $input.length > 0;                                  // 2709
          },                                                           //
          items: function () {                                         // 2711
            return $item.length > 0;                                   // 2712
          },                                                           //
          menu: function () {                                          // 2714
            return $menu.length > 0;                                   // 2715
          },                                                           //
          message: function () {                                       // 2717
            return $menu.children(selector.message).length !== 0;      // 2718
          },                                                           //
          label: function (value) {                                    // 2720
            var $labels = $module.find(selector.label);                // 2721
            return $labels.filter('[data-value="' + value + '"]').length > 0;
          },                                                           //
          maxSelections: function () {                                 // 2726
            return settings.maxSelections && module.get.selectionCount() >= settings.maxSelections;
          },                                                           //
          allResultsFiltered: function () {                            // 2729
            return $item.filter(selector.unselectable).length === $item.length;
          },                                                           //
          query: function () {                                         // 2732
            return module.get.query() !== '';                          // 2733
          },                                                           //
          value: function (value) {                                    // 2735
            var values = module.get.values(),                          // 2736
                hasValue = $.isArray(values) ? values && $.inArray(value, values) !== -1 : values == value;
            return hasValue ? true : false;                            // 2742
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 2749
          active: function () {                                        // 2750
            return $module.hasClass(className.active);                 // 2751
          },                                                           //
          alreadySetup: function () {                                  // 2753
            return $module.is('select') && $module.parent(selector.dropdown).length > 0 && $module.prev().length === 0;
          },                                                           //
          animating: function ($subMenu) {                             // 2756
            return $subMenu ? $subMenu.transition && $subMenu.transition('is animating') : $menu.transition && $menu.transition('is animating');
          },                                                           //
          disabled: function () {                                      // 2762
            return $module.hasClass(className.disabled);               // 2763
          },                                                           //
          focused: function () {                                       // 2765
            return document.activeElement === $module[0];              // 2766
          },                                                           //
          focusedOnSearch: function () {                               // 2768
            return document.activeElement === $search[0];              // 2769
          },                                                           //
          allFiltered: function () {                                   // 2771
            return (module.is.multiple() || module.has.search()) && !module.has.message() && module.has.allResultsFiltered();
          },                                                           //
          hidden: function ($subMenu) {                                // 2774
            return !module.is.visible($subMenu);                       // 2775
          },                                                           //
          initialLoad: function () {                                   // 2777
            return initialLoad;                                        // 2778
          },                                                           //
          onScreen: function ($subMenu) {                              // 2780
            var $currentMenu = $subMenu || $menu,                      // 2781
                canOpenDownward = true,                                //
                onScreen = {},                                         //
                calculations;                                          //
            $currentMenu.addClass(className.loading);                  // 2787
            calculations = {                                           // 2788
              context: {                                               // 2789
                scrollTop: $context.scrollTop(),                       // 2790
                height: $context.outerHeight()                         // 2791
              },                                                       //
              menu: {                                                  // 2793
                offset: $currentMenu.offset(),                         // 2794
                height: $currentMenu.outerHeight()                     // 2795
              }                                                        //
            };                                                         //
            onScreen = {                                               // 2798
              above: calculations.context.scrollTop <= calculations.menu.offset.top - calculations.menu.height,
              below: calculations.context.scrollTop + calculations.context.height >= calculations.menu.offset.top + calculations.menu.height
            };                                                         //
            if (onScreen.below) {                                      // 2802
              module.verbose('Dropdown can fit in context downward', onScreen);
              canOpenDownward = true;                                  // 2804
            } else if (!onScreen.below && !onScreen.above) {           //
              module.verbose('Dropdown cannot fit in either direction, favoring downward', onScreen);
              canOpenDownward = true;                                  // 2808
            } else {                                                   //
              module.verbose('Dropdown cannot fit below, opening upward', onScreen);
              canOpenDownward = false;                                 // 2812
            }                                                          //
            $currentMenu.removeClass(className.loading);               // 2814
            return canOpenDownward;                                    // 2815
          },                                                           //
          inObject: function (needle, object) {                        // 2817
            var found = false;                                         // 2818
            $.each(object, function (index, property) {                // 2821
              if (property == needle) {                                // 2822
                found = true;                                          // 2823
                return true;                                           // 2824
              }                                                        //
            });                                                        //
            return found;                                              // 2827
          },                                                           //
          multiple: function () {                                      // 2829
            return $module.hasClass(className.multiple);               // 2830
          },                                                           //
          single: function () {                                        // 2832
            return !module.is.multiple();                              // 2833
          },                                                           //
          selectMutation: function (mutations) {                       // 2835
            var selectChanged = false;                                 // 2836
            $.each(mutations, function (index, mutation) {             // 2839
              if (mutation.target && $(mutation.target).is('select')) {
                selectChanged = true;                                  // 2841
                return true;                                           // 2842
              }                                                        //
            });                                                        //
            return selectChanged;                                      // 2845
          },                                                           //
          search: function () {                                        // 2847
            return $module.hasClass(className.search);                 // 2848
          },                                                           //
          searchSelection: function () {                               // 2850
            return module.has.search() && $search.parent(selector.dropdown).length === 1;
          },                                                           //
          selection: function () {                                     // 2853
            return $module.hasClass(className.selection);              // 2854
          },                                                           //
          userValue: function (value) {                                // 2856
            return $.inArray(value, module.get.userValues()) !== -1;   // 2857
          },                                                           //
          upward: function ($menu) {                                   // 2859
            var $element = $menu || $module;                           // 2860
            return $element.hasClass(className.upward);                // 2861
          },                                                           //
          visible: function ($subMenu) {                               // 2863
            return $subMenu ? $subMenu.hasClass(className.visible) : $menu.hasClass(className.visible);
          }                                                            //
        },                                                             //
                                                                       //
        can: {                                                         // 2871
          activate: function ($item) {                                 // 2872
            if (settings.useLabels) {                                  // 2873
              return true;                                             // 2874
            }                                                          //
            if (!module.has.maxSelections()) {                         // 2876
              return true;                                             // 2877
            }                                                          //
            if (module.has.maxSelections() && $item.hasClass(className.active)) {
              return true;                                             // 2880
            }                                                          //
            return false;                                              // 2882
          },                                                           //
          click: function () {                                         // 2884
            return hasTouch || settings.on == 'click';                 // 2885
          },                                                           //
          extendSelect: function () {                                  // 2887
            return settings.allowAdditions || settings.apiSettings;    // 2888
          },                                                           //
          show: function () {                                          // 2890
            return !module.is.disabled() && (module.has.items() || module.has.message());
          },                                                           //
          useAPI: function () {                                        // 2893
            return $.fn.api !== undefined;                             // 2894
          }                                                            //
        },                                                             //
                                                                       //
        animate: {                                                     // 2898
          show: function (callback, $subMenu) {                        // 2899
            var $currentMenu = $subMenu || $menu,                      // 2900
                start = $subMenu ? function () {} : function () {      //
              module.hideSubMenus();                                   // 2905
              module.hideOthers();                                     // 2906
              module.set.active();                                     // 2907
            },                                                         //
                transition;                                            //
            callback = $.isFunction(callback) ? callback : function () {};
            module.verbose('Doing menu show animation', $currentMenu);
            module.set.direction($subMenu);                            // 2916
            transition = module.get.transition($subMenu);              // 2917
            if (module.is.selection()) {                               // 2918
              module.set.scrollPosition(module.get.selectedItem(), true);
            }                                                          //
            if (module.is.hidden($currentMenu) || module.is.animating($currentMenu)) {
              if (transition == 'none') {                              // 2922
                start();                                               // 2923
                $currentMenu.transition('show');                       // 2924
                callback.call(element);                                // 2925
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({                              // 2928
                  animation: transition + ' in',                       // 2930
                  debug: settings.debug,                               // 2931
                  verbose: settings.verbose,                           // 2932
                  duration: settings.duration,                         // 2933
                  queue: true,                                         // 2934
                  onStart: start,                                      // 2935
                  onComplete: function () {                            // 2936
                    callback.call(element);                            // 2937
                  }                                                    //
                });                                                    //
              } else {                                                 //
                module.error(error.noTransition, transition);          // 2943
              }                                                        //
            }                                                          //
          },                                                           //
          hide: function (callback, $subMenu) {                        // 2947
            var $currentMenu = $subMenu || $menu,                      // 2948
                duration = $subMenu ? settings.duration * 0.9 : settings.duration,
                start = $subMenu ? function () {} : function () {      //
              if (module.can.click()) {                                // 2956
                module.unbind.intent();                                // 2957
              }                                                        //
              module.remove.active();                                  // 2959
            },                                                         //
                transition = module.get.transition($subMenu);          //
            callback = $.isFunction(callback) ? callback : function () {};
            if (module.is.visible($currentMenu) || module.is.animating($currentMenu)) {
              module.verbose('Doing menu hide animation', $currentMenu);
                                                                       //
              if (transition == 'none') {                              // 2970
                start();                                               // 2971
                $currentMenu.transition('hide');                       // 2972
                callback.call(element);                                // 2973
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({                              // 2976
                  animation: transition + ' out',                      // 2978
                  duration: settings.duration,                         // 2979
                  debug: settings.debug,                               // 2980
                  verbose: settings.verbose,                           // 2981
                  queue: true,                                         // 2982
                  onStart: start,                                      // 2983
                  onComplete: function () {                            // 2984
                    if (settings.direction == 'auto') {                // 2985
                      module.remove.upward($subMenu);                  // 2986
                    }                                                  //
                    callback.call(element);                            // 2988
                  }                                                    //
                });                                                    //
              } else {                                                 //
                module.error(error.transition);                        // 2994
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hideAndClear: function () {                                    // 3000
          module.remove.searchTerm();                                  // 3001
          if (module.has.maxSelections()) {                            // 3002
            return;                                                    // 3003
          }                                                            //
          if (module.has.search()) {                                   // 3005
            module.hide(function () {                                  // 3006
              module.remove.filteredItem();                            // 3007
            });                                                        //
          } else {                                                     //
            module.hide();                                             // 3011
          }                                                            //
        },                                                             //
                                                                       //
        delay: {                                                       // 3015
          show: function () {                                          // 3016
            module.verbose('Delaying show event to ensure user intent');
            clearTimeout(module.timer);                                // 3018
            module.timer = setTimeout(module.show, settings.delay.show);
          },                                                           //
          hide: function () {                                          // 3021
            module.verbose('Delaying hide event to ensure user intent');
            clearTimeout(module.timer);                                // 3023
            module.timer = setTimeout(module.hide, settings.delay.hide);
          }                                                            //
        },                                                             //
                                                                       //
        escape: {                                                      // 3028
          regExp: function (text) {                                    // 3029
            text = String(text);                                       // 3030
            return text.replace(regExp.escape, '\\$&');                // 3031
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 3035
          module.debug('Changing setting', name, value);               // 3036
          if ($.isPlainObject(name)) {                                 // 3037
            $.extend(true, settings, name);                            // 3038
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 3041
          } else {                                                     //
            return settings[name];                                     // 3044
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 3047
          if ($.isPlainObject(name)) {                                 // 3048
            $.extend(true, module, name);                              // 3049
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 3052
          } else {                                                     //
            return module[name];                                       // 3055
          }                                                            //
        },                                                             //
        debug: function () {                                           // 3058
          if (settings.debug) {                                        // 3059
            if (settings.performance) {                                // 3060
              module.performance.log(arguments);                       // 3061
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 3065
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 3069
          if (settings.verbose && settings.debug) {                    // 3070
            if (settings.performance) {                                // 3071
              module.performance.log(arguments);                       // 3072
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 3076
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 3080
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 3082
        },                                                             //
        performance: {                                                 // 3084
          log: function (message) {                                    // 3085
            var currentTime, executionTime, previousTime;              // 3086
            if (settings.performance) {                                // 3091
              currentTime = new Date().getTime();                      // 3092
              previousTime = time || currentTime;                      // 3093
              executionTime = currentTime - previousTime;              // 3094
              time = currentTime;                                      // 3095
              performance.push({                                       // 3096
                'Name': message[0],                                    // 3097
                'Arguments': [].slice.call(message, 1) || '',          // 3098
                'Element': element,                                    // 3099
                'Execution Time': executionTime                        // 3100
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 3103
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 3106
            var title = settings.name + ':',                           // 3107
                totalTime = 0;                                         //
            time = false;                                              // 3111
            clearTimeout(module.performance.timer);                    // 3112
            $.each(performance, function (index, data) {               // 3113
              totalTime += data['Execution Time'];                     // 3114
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 3116
            if (moduleSelector) {                                      // 3117
              title += ' \'' + moduleSelector + '\'';                  // 3118
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 3121
              if (console.table) {                                     // 3122
                console.table(performance);                            // 3123
              } else {                                                 //
                $.each(performance, function (index, data) {           // 3126
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 3130
            }                                                          //
            performance = [];                                          // 3132
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 3135
          var object = instance,                                       // 3136
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 3142
          context = element || context;                                // 3143
          if (typeof query == 'string' && object !== undefined) {      // 3144
            query = query.split(/[\. ]/);                              // 3145
            maxDepth = query.length - 1;                               // 3146
            $.each(query, function (depth, value) {                    // 3147
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 3153
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 3156
                return false;                                          // 3157
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 3160
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 3163
                return false;                                          // 3164
              } else {                                                 //
                module.error(error.method, query);                     // 3167
                return false;                                          // 3168
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 3172
            response = found.apply(context, passedArguments);          // 3173
          } else if (found !== undefined) {                            //
            response = found;                                          // 3176
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 3178
            returnedValue.push(response);                              // 3179
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 3182
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 3185
          }                                                            //
          return found;                                                // 3187
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 3191
        if (instance === undefined) {                                  // 3192
          module.initialize();                                         // 3193
        }                                                              //
        module.invoke(query);                                          // 3195
      } else {                                                         //
        if (instance !== undefined) {                                  // 3198
          instance.invoke('destroy');                                  // 3199
        }                                                              //
        module.initialize();                                           // 3201
      }                                                                //
    });                                                                //
    return returnedValue !== undefined ? returnedValue : $allModules;  // 3205
  };                                                                   //
                                                                       //
  $.fn.dropdown.settings = {                                           // 3211
                                                                       //
    debug: false,                                                      // 3213
    verbose: false,                                                    // 3214
    performance: true,                                                 // 3215
                                                                       //
    on: 'click', // what event should show menu action on item selection
    action: 'activate', // action on item selection (nothing, activate, select, combo, hide, function(){})
                                                                       //
    apiSettings: false,                                                // 3221
    saveRemoteData: true, // Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh
    throttle: 200, // How long to wait after last user input to search remotely
                                                                       //
    context: window, // Context to use when determining if on screen   // 3225
    direction: 'auto', // Whether dropdown should always open in one direction
    keepOnScreen: true, // Whether dropdown should check whether it is on screen before showing
                                                                       //
    match: 'both', // what to match against with search selection (both, text, or label)
    fullTextSearch: false, // search anywhere in value                 // 3230
                                                                       //
    placeholder: 'auto', // whether to convert blank <select> values to placeholder text
    preserveHTML: true, // preserve html when selecting value          // 3233
    sortSelect: false, // sort selection on init                       // 3234
                                                                       //
    forceSelection: true, // force a choice on blur with search selection
    allowAdditions: false, // whether multiple select should allow user added values
                                                                       //
    maxSelections: false, // When set to a number limits the number of selections to this count
    useLabels: true, // whether multiple select should filter currently active selections from choices
    delimiter: ',', // when multiselect uses normal <input> the values will be delimited with this character
                                                                       //
    showOnFocus: true, // show menu on focus                           // 3243
    allowTab: true, // add tabindex to element                         // 3244
    allowCategorySelection: false, // allow elements with sub-menus to be selected
                                                                       //
    fireOnInit: false, // Whether callbacks should fire when initializing dropdown values
                                                                       //
    transition: 'auto', // auto transition will slide down or up based on direction
    duration: 200, // duration of transition                           // 3250
                                                                       //
    glyphWidth: 1.0714, // widest glyph width in em (W is 1.0714 em) used to calculate multiselect input width
                                                                       //
    // label settings on multi-select                                  //
    label: {                                                           // 3255
      transition: 'scale',                                             // 3256
      duration: 200,                                                   // 3257
      variation: false                                                 // 3258
    },                                                                 //
                                                                       //
    // delay before event                                              //
    delay: {                                                           // 3262
      hide: 300,                                                       // 3263
      show: 200,                                                       // 3264
      search: 20,                                                      // 3265
      touch: 50                                                        // 3266
    },                                                                 //
                                                                       //
    /* Callbacks */                                                    //
    onChange: function (value, text, $selected) {},                    // 3270
    onAdd: function (value, text, $selected) {},                       // 3271
    onRemove: function (value, text, $selected) {},                    // 3272
                                                                       //
    onLabelSelect: function ($selectedLabels) {},                      // 3274
    onLabelCreate: function (value, text) {                            // 3275
      return $(this);                                                  // 3275
    },                                                                 //
    onNoResults: function (searchTerm) {                               // 3276
      return true;                                                     // 3276
    },                                                                 //
    onShow: function () {},                                            // 3277
    onHide: function () {},                                            // 3278
                                                                       //
    /* Component */                                                    //
    name: 'Dropdown',                                                  // 3281
    namespace: 'dropdown',                                             // 3282
                                                                       //
    message: {                                                         // 3284
      addResult: 'Add <b>{term}</b>',                                  // 3285
      count: '{count} selected',                                       // 3286
      maxSelections: 'Max {maxCount} selections',                      // 3287
      noResults: 'No results found.',                                  // 3288
      serverError: 'There was an error contacting the server'          // 3289
    },                                                                 //
                                                                       //
    error: {                                                           // 3292
      action: 'You called a dropdown action that was not defined',     // 3293
      alreadySetup: 'Once a select has been initialized behaviors must be called on the created ui dropdown',
      labels: 'Allowing user additions currently requires the use of labels.',
      missingMultiple: '<select> requires multiple property to be set to correctly preserve multiple values',
      method: 'The method you called is not defined.',                 // 3297
      noAPI: 'The API module is required to load resources remotely',  // 3298
      noStorage: 'Saving remote data requires session storage',        // 3299
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>'
    },                                                                 //
                                                                       //
    regExp: {                                                          // 3303
      escape: /[-[\]{}()*+?.,\\^$|#\s]/g                               // 3304
    },                                                                 //
                                                                       //
    metadata: {                                                        // 3307
      defaultText: 'defaultText',                                      // 3308
      defaultValue: 'defaultValue',                                    // 3309
      placeholderText: 'placeholder',                                  // 3310
      text: 'text',                                                    // 3311
      value: 'value'                                                   // 3312
    },                                                                 //
                                                                       //
    // property names for remote query                                 //
    fields: {                                                          // 3316
      values: 'values', // grouping for all dropdown values            // 3317
      name: 'name', // displayed dropdown text                         // 3318
      value: 'value' // actual dropdown value                          // 3319
    },                                                                 //
                                                                       //
    selector: {                                                        // 3322
      addition: '.addition',                                           // 3323
      dropdown: '.ui.dropdown',                                        // 3324
      icon: '> .dropdown.icon',                                        // 3325
      input: '> input[type="hidden"], > select',                       // 3326
      item: '.item',                                                   // 3327
      label: '> .label',                                               // 3328
      remove: '> .label > .delete.icon',                               // 3329
      siblingLabel: '.label',                                          // 3330
      menu: '.menu',                                                   // 3331
      message: '.message',                                             // 3332
      menuIcon: '.dropdown.icon',                                      // 3333
      search: 'input.search, .menu > .search > input',                 // 3334
      text: '> .text:not(.icon)',                                      // 3335
      unselectable: '.disabled, .filtered'                             // 3336
    },                                                                 //
                                                                       //
    className: {                                                       // 3339
      active: 'active',                                                // 3340
      addition: 'addition',                                            // 3341
      animating: 'animating',                                          // 3342
      disabled: 'disabled',                                            // 3343
      dropdown: 'ui dropdown',                                         // 3344
      filtered: 'filtered',                                            // 3345
      hidden: 'hidden transition',                                     // 3346
      item: 'item',                                                    // 3347
      label: 'ui label',                                               // 3348
      loading: 'loading',                                              // 3349
      menu: 'menu',                                                    // 3350
      message: 'message',                                              // 3351
      multiple: 'multiple',                                            // 3352
      placeholder: 'default',                                          // 3353
      search: 'search',                                                // 3354
      selected: 'selected',                                            // 3355
      selection: 'selection',                                          // 3356
      upward: 'upward',                                                // 3357
      visible: 'visible'                                               // 3358
    }                                                                  //
                                                                       //
  };                                                                   //
                                                                       //
  /* Templates */                                                      //
  $.fn.dropdown.settings.templates = {                                 // 3364
                                                                       //
    // generates dropdown from select values                           //
    dropdown: function (select) {                                      // 3367
      var placeholder = select.placeholder || false,                   // 3368
          values = select.values || {},                                //
          html = '';                                                   //
      html += '<i class="dropdown icon"></i>';                         // 3373
      if (select.placeholder) {                                        // 3374
        html += '<div class="default text">' + placeholder + '</div>';
      } else {                                                         //
        html += '<div class="text"></div>';                            // 3378
      }                                                                //
      html += '<div class="menu">';                                    // 3380
      $.each(select.values, function (index, option) {                 // 3381
        html += option.disabled ? '<div class="disabled item" data-value="' + option.value + '">' + option.name + '</div>' : '<div class="item" data-value="' + option.value + '">' + option.name + '</div>';
      });                                                              //
      html += '</div>';                                                // 3387
      return html;                                                     // 3388
    },                                                                 //
                                                                       //
    // generates just menu from select                                 //
    menu: function (response, fields) {                                // 3392
      var values = response.values || {},                              // 3393
          html = '';                                                   //
      $.each(response[fields.values], function (index, option) {       // 3397
        html += '<div class="item" data-value="' + option[fields.value] + '">' + option[fields.name] + '</div>';
      });                                                              //
      return html;                                                     // 3400
    },                                                                 //
                                                                       //
    // generates label for multiselect                                 //
    label: function (value, text) {                                    // 3404
      return text + '<i class="delete icon"></i>';                     // 3405
    },                                                                 //
                                                                       //
    // generates messages like "No results"                            //
    message: function (message) {                                      // 3410
      return message;                                                  // 3411
    },                                                                 //
                                                                       //
    // generates user addition to selection menu                       //
    addition: function (choice) {                                      // 3415
      return choice;                                                   // 3416
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
