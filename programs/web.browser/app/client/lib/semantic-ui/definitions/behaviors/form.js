(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/behaviors/form.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Form Validation                                     //
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
  $.fn.form = function (parameters) {                                  // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        legacyParameters = arguments[1],                               //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 34
      var $module = $(this),                                           // 36
          element = this,                                              //
          formErrors = [],                                             //
          keyHeldDown = false,                                         //
                                                                       //
      // set at run-time                                               //
      $field,                                                          // 44
          $group,                                                      //
          $message,                                                    //
          $prompt,                                                     //
          $submit,                                                     //
          $clear,                                                      //
          $reset,                                                      //
          settings,                                                    //
          validation,                                                  //
          metadata,                                                    //
          selector,                                                    //
          className,                                                   //
          error,                                                       //
          namespace,                                                   //
          moduleNamespace,                                             //
          eventNamespace,                                              //
          instance,                                                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 68
                                                                       //
        initialize: function () {                                      // 70
                                                                       //
          // settings grabbed at run time                              //
          module.get.settings();                                       // 73
          if (methodInvoked) {                                         // 74
            if (instance === undefined) {                              // 75
              module.instantiate();                                    // 76
            }                                                          //
            module.invoke(query);                                      // 78
          } else {                                                     //
            module.verbose('Initializing form validation', $module, settings);
            module.bindEvents();                                       // 82
            module.set.defaults();                                     // 83
            module.instantiate();                                      // 84
          }                                                            //
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 88
          module.verbose('Storing instance of module', module);        // 89
          instance = module;                                           // 90
          $module.data(moduleNamespace, module);                       // 91
        },                                                             //
                                                                       //
        destroy: function () {                                         // 96
          module.verbose('Destroying previous module', instance);      // 97
          module.removeEvents();                                       // 98
          $module.removeData(moduleNamespace);                         // 99
        },                                                             //
                                                                       //
        refresh: function () {                                         // 104
          module.verbose('Refreshing selector cache');                 // 105
          $field = $module.find(selector.field);                       // 106
          $group = $module.find(selector.group);                       // 107
          $message = $module.find(selector.message);                   // 108
          $prompt = $module.find(selector.prompt);                     // 109
                                                                       //
          $submit = $module.find(selector.submit);                     // 111
          $clear = $module.find(selector.clear);                       // 112
          $reset = $module.find(selector.reset);                       // 113
        },                                                             //
                                                                       //
        submit: function () {                                          // 116
          module.verbose('Submitting form', $module);                  // 117
          $module.submit();                                            // 118
        },                                                             //
                                                                       //
        attachEvents: function (selector, action) {                    // 123
          action = action || 'submit';                                 // 124
          $(selector).on('click' + eventNamespace, function (event) {  // 125
            module[action]();                                          // 127
            event.preventDefault();                                    // 128
          });                                                          //
        },                                                             //
                                                                       //
        bindEvents: function () {                                      // 133
          module.verbose('Attaching form events');                     // 134
          $module.on('submit' + eventNamespace, module.validate.form).on('blur' + eventNamespace, selector.field, module.event.field.blur).on('click' + eventNamespace, selector.submit, module.submit).on('click' + eventNamespace, selector.reset, module.reset).on('click' + eventNamespace, selector.clear, module.clear);
          if (settings.keyboardShortcuts) {                            // 142
            $module.on('keydown' + eventNamespace, selector.field, module.event.field.keydown);
          }                                                            //
          $field.each(function () {                                    // 147
            var $input = $(this),                                      // 149
                type = $input.prop('type'),                            //
                inputEvent = module.get.changeEvent(type, $input);     //
            $(this).on(inputEvent + eventNamespace, module.event.field.change);
          });                                                          //
        },                                                             //
                                                                       //
        clear: function () {                                           // 161
          $field.each(function () {                                    // 162
            var $field = $(this),                                      // 164
                $element = $field.parent(),                            //
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.find(selector.prompt),           //
                defaultValue = $field.data(metadata.defaultValue) || '',
                isCheckbox = $element.is(selector.uiCheckbox),         //
                isDropdown = $element.is(selector.uiDropdown),         //
                isErrored = $fieldGroup.hasClass(className.error);     //
            if (isErrored) {                                           // 174
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);                // 176
              $prompt.remove();                                        // 177
            }                                                          //
            if (isDropdown) {                                          // 179
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('clear');                              // 181
            } else if (isCheckbox) {                                   //
              $field.prop('checked', false);                           // 184
            } else {                                                   //
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val('');                                          // 188
            }                                                          //
          });                                                          //
        },                                                             //
                                                                       //
        reset: function () {                                           // 194
          $field.each(function () {                                    // 195
            var $field = $(this),                                      // 197
                $element = $field.parent(),                            //
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.find(selector.prompt),           //
                defaultValue = $field.data(metadata.defaultValue),     //
                isCheckbox = $element.is(selector.uiCheckbox),         //
                isDropdown = $element.is(selector.uiDropdown),         //
                isErrored = $fieldGroup.hasClass(className.error);     //
            if (defaultValue === undefined) {                          // 207
              return;                                                  // 208
            }                                                          //
            if (isErrored) {                                           // 210
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);                // 212
              $prompt.remove();                                        // 213
            }                                                          //
            if (isDropdown) {                                          // 215
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('restore defaults');                   // 217
            } else if (isCheckbox) {                                   //
              module.verbose('Resetting checkbox value', $element, defaultValue);
              $field.prop('checked', defaultValue);                    // 221
            } else {                                                   //
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val(defaultValue);                                // 225
            }                                                          //
          });                                                          //
        },                                                             //
                                                                       //
        is: {                                                          // 231
          bracketedRule: function (rule) {                             // 232
            return rule.type && rule.type.match(settings.regExp.bracket);
          },                                                           //
          valid: function () {                                         // 235
            var allValid = true;                                       // 236
            module.verbose('Checking if form is valid');               // 239
            $.each(validation, function (fieldName, field) {           // 240
              if (!module.validate.field(field, fieldName)) {          // 241
                allValid = false;                                      // 242
              }                                                        //
            });                                                        //
            return allValid;                                           // 245
          }                                                            //
        },                                                             //
                                                                       //
        removeEvents: function () {                                    // 249
          $module.off(eventNamespace);                                 // 250
          $field.off(eventNamespace);                                  // 253
          $submit.off(eventNamespace);                                 // 256
          $field.off(eventNamespace);                                  // 259
        },                                                             //
                                                                       //
        event: {                                                       // 264
          field: {                                                     // 265
            keydown: function (event) {                                // 266
              var $field = $(this),                                    // 267
                  key = event.which,                                   //
                  keyCode = {                                          //
                enter: 13,                                             // 271
                escape: 27                                             // 272
              };                                                       //
              if (key == keyCode.escape) {                             // 275
                module.verbose('Escape key pressed blurring field');   // 276
                $field.blur();                                         // 277
              }                                                        //
              if (!event.ctrlKey && key == keyCode.enter && $field.is(selector.input) && $field.not(selector.checkbox).length > 0) {
                if (!keyHeldDown) {                                    // 282
                  $field.one('keyup' + eventNamespace, module.event.field.keyup);
                  module.submit();                                     // 286
                  module.debug('Enter pressed on input submitting form');
                }                                                      //
                keyHeldDown = true;                                    // 289
              }                                                        //
            },                                                         //
            keyup: function () {                                       // 292
              keyHeldDown = false;                                     // 293
            },                                                         //
            blur: function (event) {                                   // 295
              var $field = $(this),                                    // 296
                  $fieldGroup = $field.closest($group),                //
                  validationRules = module.get.validation($field);     //
              if ($fieldGroup.hasClass(className.error)) {             // 301
                module.debug('Revalidating field', $field, validationRules);
                module.validate.form.call(module, event, true);        // 303
              } else if (settings.on == 'blur' || settings.on == 'change') {
                module.validate.field(validationRules);                // 306
              }                                                        //
            },                                                         //
            change: function (event) {                                 // 309
              var $field = $(this),                                    // 310
                  $fieldGroup = $field.closest($group);                //
              if (settings.on == 'change' || $fieldGroup.hasClass(className.error) && settings.revalidate) {
                clearTimeout(module.timer);                            // 315
                module.timer = setTimeout(function () {                // 316
                  module.debug('Revalidating field', $field, module.get.validation($field));
                  module.validate.form.call(module, event, true);      // 318
                }, settings.delay);                                    //
              }                                                        //
            }                                                          //
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        get: {                                                         // 326
          ancillaryValue: function (rule) {                            // 327
            if (!rule.type || !module.is.bracketedRule(rule)) {        // 328
              return false;                                            // 329
            }                                                          //
            return rule.type.match(settings.regExp.bracket)[1] + '';   // 331
          },                                                           //
          ruleName: function (rule) {                                  // 333
            if (module.is.bracketedRule(rule)) {                       // 334
              return rule.type.replace(rule.type.match(settings.regExp.bracket)[0], '');
            }                                                          //
            return rule.type;                                          // 337
          },                                                           //
          changeEvent: function (type, $input) {                       // 339
            if (type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
              return 'change';                                         // 341
            } else {                                                   //
              return module.get.inputEvent();                          // 344
            }                                                          //
          },                                                           //
          inputEvent: function () {                                    // 347
            return document.createElement('input').oninput !== undefined ? 'input' : document.createElement('input').onpropertychange !== undefined ? 'propertychange' : 'keyup';
          },                                                           //
          prompt: function (rule, field) {                             // 355
            var ruleName = module.get.ruleName(rule),                  // 356
                ancillary = module.get.ancillaryValue(rule),           //
                prompt = rule.prompt || settings.prompt[ruleName] || settings.text.unspecifiedRule,
                requiresValue = prompt.search('{value}') !== -1,       //
                requiresName = prompt.search('{name}') !== -1,         //
                $label,                                                //
                $field,                                                //
                name;                                                  //
            if (requiresName || requiresValue) {                       // 366
              $field = module.get.field(field.identifier);             // 367
            }                                                          //
            if (requiresValue) {                                       // 369
              prompt = prompt.replace('{value}', $field.val());        // 370
            }                                                          //
            if (requiresName) {                                        // 372
              $label = $field.closest(selector.group).find('label').eq(0);
              name = $label.size() == 1 ? $label.text() : $field.prop('placeholder') || settings.text.unspecifiedField;
              prompt = prompt.replace('{name}', name);                 // 378
            }                                                          //
            prompt = prompt.replace('{identifier}', field.identifier);
            prompt = prompt.replace('{ruleValue}', ancillary);         // 381
            if (!rule.prompt) {                                        // 382
              module.verbose('Using default validation prompt for type', prompt, ruleName);
            }                                                          //
            return prompt;                                             // 385
          },                                                           //
          settings: function () {                                      // 387
            if ($.isPlainObject(parameters)) {                         // 388
              var keys = Object.keys(parameters),                      // 389
                  isLegacySettings = keys.length > 0 ? parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined : false,
                  ruleKeys;                                            //
              if (isLegacySettings) {                                  // 396
                // 1.x (ducktyped)                                     //
                settings = $.extend(true, {}, $.fn.form.settings, legacyParameters);
                validation = $.extend({}, $.fn.form.settings.defaults, parameters);
                module.error(settings.error.oldSyntax, element);       // 400
                module.verbose('Extending settings from legacy parameters', validation, settings);
              } else {                                                 //
                // 2.x                                                 //
                if (parameters.fields) {                               // 405
                  ruleKeys = Object.keys(parameters.fields);           // 406
                  if (typeof parameters.fields[ruleKeys[0]] == 'string' || $.isArray(parameters.fields[ruleKeys[0]])) {
                    $.each(parameters.fields, function (name, rules) {
                      if (typeof rules == 'string') {                  // 409
                        rules = [rules];                               // 410
                      }                                                //
                      parameters.fields[name] = {                      // 412
                        rules: []                                      // 413
                      };                                               //
                      $.each(rules, function (index, rule) {           // 415
                        parameters.fields[name].rules.push({ type: rule });
                      });                                              //
                    });                                                //
                  }                                                    //
                }                                                      //
                                                                       //
                settings = $.extend(true, {}, $.fn.form.settings, parameters);
                validation = $.extend({}, $.fn.form.settings.defaults, settings.fields);
                module.verbose('Extending settings', validation, settings);
              }                                                        //
            } else {                                                   //
              settings = $.fn.form.settings;                           // 428
              validation = $.fn.form.settings.defaults;                // 429
              module.verbose('Using default form validation', validation, settings);
            }                                                          //
                                                                       //
            // shorthand                                               //
            namespace = settings.namespace;                            // 434
            metadata = settings.metadata;                              // 435
            selector = settings.selector;                              // 436
            className = settings.className;                            // 437
            error = settings.error;                                    // 438
            moduleNamespace = 'module-' + namespace;                   // 439
            eventNamespace = '.' + namespace;                          // 440
                                                                       //
            // grab instance                                           //
            instance = $module.data(moduleNamespace);                  // 443
                                                                       //
            // refresh selector cache                                  //
            module.refresh();                                          // 446
          },                                                           //
          field: function (identifier) {                               // 448
            module.verbose('Finding field with identifier', identifier);
            if ($field.filter('#' + identifier).length > 0) {          // 450
              return $field.filter('#' + identifier);                  // 451
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return $field.filter('[name="' + identifier + '"]');     // 454
            } else if ($field.filter('[name="' + identifier + '[]"]').length > 0) {
              return $field.filter('[name="' + identifier + '[]"]');   // 457
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return $field.filter('[data-' + metadata.validate + '="' + identifier + '"]');
            }                                                          //
            return $('<input/>');                                      // 462
          },                                                           //
          fields: function (fields) {                                  // 464
            var $fields = $();                                         // 465
            $.each(fields, function (index, name) {                    // 468
              $fields = $fields.add(module.get.field(name));           // 469
            });                                                        //
            return $fields;                                            // 471
          },                                                           //
          validation: function ($field) {                              // 473
            var fieldValidation, identifier;                           // 474
            if (!validation) {                                         // 478
              return false;                                            // 479
            }                                                          //
            $.each(validation, function (fieldName, field) {           // 481
              identifier = field.identifier || fieldName;              // 482
              if (module.get.field(identifier)[0] == $field[0]) {      // 483
                field.identifier = identifier;                         // 484
                fieldValidation = field;                               // 485
              }                                                        //
            });                                                        //
            return fieldValidation || false;                           // 488
          },                                                           //
          value: function (field) {                                    // 490
            var fields = [],                                           // 491
                results;                                               //
            fields.push(field);                                        // 495
            results = module.get.values.call(element, fields);         // 496
            return results[field];                                     // 497
          },                                                           //
          values: function (fields) {                                  // 499
            var $fields = $.isArray(fields) ? module.get.fields(fields) : $field,
                values = {};                                           //
            $fields.each(function (index, field) {                     // 506
              var $field = $(field),                                   // 507
                  type = $field.prop('type'),                          //
                  name = $field.prop('name'),                          //
                  value = $field.val(),                                //
                  isCheckbox = $field.is(selector.checkbox),           //
                  isRadio = $field.is(selector.radio),                 //
                  isMultiple = name.indexOf('[]') !== -1,              //
                  isChecked = isCheckbox ? $field.is(':checked') : false;
              if (name) {                                              // 519
                if (isMultiple) {                                      // 520
                  name = name.replace('[]', '');                       // 521
                  if (!values[name]) {                                 // 522
                    values[name] = [];                                 // 523
                  }                                                    //
                  if (isCheckbox) {                                    // 525
                    if (isChecked) {                                   // 526
                      values[name].push(value || true);                // 527
                    } else {                                           //
                      values[name].push(false);                        // 530
                    }                                                  //
                  } else {                                             //
                    values[name].push(value);                          // 534
                  }                                                    //
                } else {                                               //
                  if (isRadio) {                                       // 538
                    if (isChecked) {                                   // 539
                      values[name] = value;                            // 540
                    }                                                  //
                  } else if (isCheckbox) {                             //
                    if (isChecked) {                                   // 544
                      values[name] = value || true;                    // 545
                    } else {                                           //
                      values[name] = false;                            // 548
                    }                                                  //
                  } else {                                             //
                    values[name] = value;                              // 552
                  }                                                    //
                }                                                      //
              }                                                        //
            });                                                        //
            return values;                                             // 557
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 561
                                                                       //
          field: function (identifier) {                               // 563
            module.verbose('Checking for existence of a field with identifier', identifier);
            if (typeof identifier !== 'string') {                      // 565
              module.error(error.identifier, identifier);              // 566
            }                                                          //
            if ($field.filter('#' + identifier).length > 0) {          // 568
              return true;                                             // 569
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return true;                                             // 572
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return true;                                             // 575
            }                                                          //
            return false;                                              // 577
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        add: {                                                         // 582
          prompt: function (identifier, errors) {                      // 583
            var $field = module.get.field(identifier),                 // 584
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.children(selector.prompt),       //
                promptExists = $prompt.length !== 0;                   //
            errors = typeof errors == 'string' ? [errors] : errors;    // 590
            module.verbose('Adding field error state', identifier);    // 594
            $fieldGroup.addClass(className.error);                     // 595
            if (settings.inline) {                                     // 598
              if (!promptExists) {                                     // 599
                $prompt = settings.templates.prompt(errors);           // 600
                $prompt.appendTo($fieldGroup);                         // 601
              }                                                        //
              $prompt.html(errors[0]);                                 // 605
              if (!promptExists) {                                     // 608
                if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                  module.verbose('Displaying error with css transition', settings.transition);
                  $prompt.transition(settings.transition + ' in', settings.duration);
                } else {                                               //
                  module.verbose('Displaying error with fallback javascript animation');
                  $prompt.fadeIn(settings.duration);                   // 615
                }                                                      //
              } else {                                                 //
                module.verbose('Inline errors are disabled, no inline error added', identifier);
              }                                                        //
            }                                                          //
          },                                                           //
          errors: function (errors) {                                  // 625
            module.debug('Adding form error messages', errors);        // 626
            module.set.error();                                        // 627
            $message.html(settings.templates.error(errors));           // 628
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 634
          prompt: function (identifier) {                              // 635
            var $field = module.get.field(identifier),                 // 636
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.children(selector.prompt);       //
            $fieldGroup.removeClass(className.error);                  // 641
            if (settings.inline && $prompt.is(':visible')) {           // 644
              module.verbose('Removing prompt for field', identifier);
              if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                $prompt.transition(settings.transition + ' out', settings.duration, function () {
                  $prompt.remove();                                    // 648
                });                                                    //
              } else {                                                 //
                $prompt.fadeOut(settings.duration, function () {       // 652
                  $prompt.remove();                                    // 654
                });                                                    //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 662
          success: function () {                                       // 663
            $module.removeClass(className.error).addClass(className.success);
          },                                                           //
          defaults: function () {                                      // 669
            $field.each(function () {                                  // 670
              var $field = $(this),                                    // 672
                  isCheckbox = $field.filter(selector.checkbox).length > 0,
                  value = isCheckbox ? $field.is(':checked') : $field.val();
              $field.data(metadata.defaultValue, value);               // 679
            });                                                        //
          },                                                           //
          error: function () {                                         // 683
            $module.removeClass(className.success).addClass(className.error);
          },                                                           //
          value: function (field, value) {                             // 689
            var fields = {};                                           // 690
            fields[field] = value;                                     // 693
            return module.set.values.call(element, fields);            // 694
          },                                                           //
          values: function (fields) {                                  // 696
            if ($.isEmptyObject(fields)) {                             // 697
              return;                                                  // 698
            }                                                          //
            $.each(fields, function (key, value) {                     // 700
              var $field = module.get.field(key),                      // 701
                  $element = $field.parent(),                          //
                  isMultiple = $.isArray(value),                       //
                  isCheckbox = $element.is(selector.uiCheckbox),       //
                  isDropdown = $element.is(selector.uiDropdown),       //
                  isRadio = $field.is(selector.radio) && isCheckbox,   //
                  fieldExists = $field.length > 0,                     //
                  $multipleField;                                      //
              if (fieldExists) {                                       // 711
                if (isMultiple && isCheckbox) {                        // 712
                  module.verbose('Selecting multiple', value, $field);
                  $element.checkbox('uncheck');                        // 714
                  $.each(value, function (index, value) {              // 715
                    $multipleField = $field.filter('[value="' + value + '"]');
                    $element = $multipleField.parent();                // 717
                    if ($multipleField.length > 0) {                   // 718
                      $element.checkbox('check');                      // 719
                    }                                                  //
                  });                                                  //
                } else if (isRadio) {                                  //
                  module.verbose('Selecting radio value', value, $field);
                  $field.filter('[value="' + value + '"]').parent(selector.uiCheckbox).checkbox('check');
                } else if (isCheckbox) {                               //
                  module.verbose('Setting checkbox value', value, $element);
                  if (value === true) {                                // 732
                    $element.checkbox('check');                        // 733
                  } else {                                             //
                    $element.checkbox('uncheck');                      // 736
                  }                                                    //
                } else if (isDropdown) {                               //
                  module.verbose('Setting dropdown value', value, $element);
                  $element.dropdown('set selected', value);            // 741
                } else {                                               //
                  module.verbose('Setting field value', value, $field);
                  $field.val(value);                                   // 745
                }                                                      //
              }                                                        //
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        validate: {                                                    // 752
                                                                       //
          form: function (event, ignoreCallbacks) {                    // 754
            var values = module.get.values(),                          // 755
                apiRequest;                                            //
                                                                       //
            // input keydown event will fire submit repeatedly by browser default
            if (keyHeldDown) {                                         // 761
              return false;                                            // 762
            }                                                          //
                                                                       //
            // reset errors                                            //
            formErrors = [];                                           // 766
            if (module.is.valid()) {                                   // 767
              module.debug('Form has no validation errors, submitting');
              module.set.success();                                    // 769
              if (ignoreCallbacks !== true) {                          // 770
                return settings.onSuccess.call(element, event, values);
              }                                                        //
            } else {                                                   //
              module.debug('Form has errors');                         // 775
              module.set.error();                                      // 776
              if (!settings.inline) {                                  // 777
                module.add.errors(formErrors);                         // 778
              }                                                        //
              // prevent ajax submit                                   //
              if ($module.data('moduleApi') !== undefined) {           // 781
                event.stopImmediatePropagation();                      // 782
              }                                                        //
              if (ignoreCallbacks !== true) {                          // 784
                return settings.onFailure.call(element, formErrors, values);
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          // takes a validation object and returns whether field passes validation
          field: function (field, fieldName) {                         // 791
            var identifier = field.identifier || fieldName,            // 792
                $field = module.get.field(identifier),                 //
                fieldValid = true,                                     //
                fieldErrors = [];                                      //
            if (!field.identifier) {                                   // 798
              module.debug('Using field name as identifier', identifier);
              field.identifier = identifier;                           // 800
            }                                                          //
            if ($field.prop('disabled')) {                             // 802
              module.debug('Field is disabled. Skipping', identifier);
              fieldValid = true;                                       // 804
            } else if (field.optional && $.trim($field.val()) === '') {
              module.debug('Field is optional and empty. Skipping', identifier);
              fieldValid = true;                                       // 808
            } else if (field.rules !== undefined) {                    //
              $.each(field.rules, function (index, rule) {             // 811
                if (module.has.field(identifier) && !module.validate.rule(field, rule)) {
                  module.debug('Field is invalid', identifier, rule.type);
                  fieldErrors.push(module.get.prompt(rule, field));    // 814
                  fieldValid = false;                                  // 815
                }                                                      //
              });                                                      //
            }                                                          //
            if (fieldValid) {                                          // 819
              module.remove.prompt(identifier, fieldErrors);           // 820
              settings.onValid.call($field);                           // 821
            } else {                                                   //
              formErrors = formErrors.concat(fieldErrors);             // 824
              module.add.prompt(identifier, fieldErrors);              // 825
              settings.onInvalid.call($field, fieldErrors);            // 826
              return false;                                            // 827
            }                                                          //
            return true;                                               // 829
          },                                                           //
                                                                       //
          // takes validation rule and returns whether field passes rule
          rule: function (field, rule) {                               // 833
            var $field = module.get.field(field.identifier),           // 834
                type = rule.type,                                      //
                value = $field.val(),                                  //
                isValid = true,                                        //
                ancillary = module.get.ancillaryValue(rule),           //
                ruleName = module.get.ruleName(rule),                  //
                ruleFunction = settings.rules[ruleName];               //
            if (!$.isFunction(ruleFunction)) {                         // 843
              module.error(error.noRule, ruleName);                    // 844
              return;                                                  // 845
            }                                                          //
            // cast to string avoiding encoding special values         //
            value = value === undefined || value === '' || value === null ? '' : $.trim(value + '');
            return ruleFunction.call($field, value, ancillary);        // 852
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 856
          if ($.isPlainObject(name)) {                                 // 857
            $.extend(true, settings, name);                            // 858
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 861
          } else {                                                     //
            return settings[name];                                     // 864
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 867
          if ($.isPlainObject(name)) {                                 // 868
            $.extend(true, module, name);                              // 869
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 872
          } else {                                                     //
            return module[name];                                       // 875
          }                                                            //
        },                                                             //
        debug: function () {                                           // 878
          if (settings.debug) {                                        // 879
            if (settings.performance) {                                // 880
              module.performance.log(arguments);                       // 881
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 885
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 889
          if (settings.verbose && settings.debug) {                    // 890
            if (settings.performance) {                                // 891
              module.performance.log(arguments);                       // 892
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 896
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 900
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 902
        },                                                             //
        performance: {                                                 // 904
          log: function (message) {                                    // 905
            var currentTime, executionTime, previousTime;              // 906
            if (settings.performance) {                                // 911
              currentTime = new Date().getTime();                      // 912
              previousTime = time || currentTime;                      // 913
              executionTime = currentTime - previousTime;              // 914
              time = currentTime;                                      // 915
              performance.push({                                       // 916
                'Name': message[0],                                    // 917
                'Arguments': [].slice.call(message, 1) || '',          // 918
                'Element': element,                                    // 919
                'Execution Time': executionTime                        // 920
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 923
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 926
            var title = settings.name + ':',                           // 927
                totalTime = 0;                                         //
            time = false;                                              // 931
            clearTimeout(module.performance.timer);                    // 932
            $.each(performance, function (index, data) {               // 933
              totalTime += data['Execution Time'];                     // 934
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 936
            if (moduleSelector) {                                      // 937
              title += ' \'' + moduleSelector + '\'';                  // 938
            }                                                          //
            if ($allModules.length > 1) {                              // 940
              title += ' ' + '(' + $allModules.length + ')';           // 941
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 944
              if (console.table) {                                     // 945
                console.table(performance);                            // 946
              } else {                                                 //
                $.each(performance, function (index, data) {           // 949
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 953
            }                                                          //
            performance = [];                                          // 955
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 958
          var object = instance,                                       // 959
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 965
          context = element || context;                                // 966
          if (typeof query == 'string' && object !== undefined) {      // 967
            query = query.split(/[\. ]/);                              // 968
            maxDepth = query.length - 1;                               // 969
            $.each(query, function (depth, value) {                    // 970
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 976
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 979
                return false;                                          // 980
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 983
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 986
                return false;                                          // 987
              } else {                                                 //
                return false;                                          // 990
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 994
            response = found.apply(context, passedArguments);          // 995
          } else if (found !== undefined) {                            //
            response = found;                                          // 998
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1000
            returnedValue.push(response);                              // 1001
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1004
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1007
          }                                                            //
          return found;                                                // 1009
        }                                                              //
      };                                                               //
      module.initialize();                                             // 1012
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1016
  };                                                                   //
                                                                       //
  $.fn.form.settings = {                                               // 1022
                                                                       //
    name: 'Form',                                                      // 1024
    namespace: 'form',                                                 // 1025
                                                                       //
    debug: false,                                                      // 1027
    verbose: false,                                                    // 1028
    performance: true,                                                 // 1029
                                                                       //
    fields: false,                                                     // 1031
                                                                       //
    keyboardShortcuts: true,                                           // 1033
    on: 'submit',                                                      // 1034
    inline: false,                                                     // 1035
                                                                       //
    delay: 200,                                                        // 1037
    revalidate: true,                                                  // 1038
                                                                       //
    transition: 'scale',                                               // 1040
    duration: 200,                                                     // 1041
                                                                       //
    onValid: function () {},                                           // 1043
    onInvalid: function () {},                                         // 1044
    onSuccess: function () {                                           // 1045
      return true;                                                     // 1045
    },                                                                 //
    onFailure: function () {                                           // 1046
      return false;                                                    // 1046
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1048
      defaultValue: 'default',                                         // 1049
      validate: 'validate'                                             // 1050
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1053
      bracket: /\[(.*)\]/i,                                            // 1054
      decimal: /^\-?\d*(\.\d+)?$/,                                     // 1055
      email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,                   // 1057
      flags: /^\/(.*)\/(.*)?/,                                         // 1058
      integer: /^\-?\d+$/,                                             // 1059
      number: /^\-?\d*(\.\d+)?$/,                                      // 1060
      url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
    },                                                                 //
                                                                       //
    text: {                                                            // 1064
      unspecifiedRule: 'Please enter a valid value',                   // 1065
      unspecifiedField: 'This field'                                   // 1066
    },                                                                 //
                                                                       //
    prompt: {                                                          // 1069
      empty: '{name} must have a value',                               // 1070
      checked: '{name} must be checked',                               // 1071
      email: '{name} must be a valid e-mail',                          // 1072
      url: '{name} must be a valid url',                               // 1073
      regExp: '{name} is not formatted correctly',                     // 1074
      integer: '{name} must be an integer',                            // 1075
      decimal: '{name} must be a decimal number',                      // 1076
      number: '{name} must be set to a number',                        // 1077
      is: '{name} must be "{ruleValue}"',                              // 1078
      isExactly: '{name} must be exactly "{ruleValue}"',               // 1079
      not: '{name} cannot be set to "{ruleValue}"',                    // 1080
      notExactly: '{name} cannot be set to exactly "{ruleValue}"',     // 1081
      contain: '{name} cannot contain "{ruleValue}"',                  // 1082
      containExactly: '{name} cannot contain exactly "{ruleValue}"',   // 1083
      doesntContain: '{name} must contain  "{ruleValue}"',             // 1084
      doesntContainExactly: '{name} must contain exactly "{ruleValue}"',
      minLength: '{name} must be at least {ruleValue} characters',     // 1086
      length: '{name} must be at least {ruleValue} characters',        // 1087
      exactLength: '{name} must be exactly {ruleValue} characters',    // 1088
      maxLength: '{name} cannot be longer than {ruleValue} characters',
      match: '{name} must match {ruleValue} field',                    // 1090
      different: '{name} must have a different value than {ruleValue} field',
      creditCard: '{name} must be a valid credit card number',         // 1092
      minCount: '{name} must have at least {ruleValue} choices',       // 1093
      exactCount: '{name} must have exactly {ruleValue} choices',      // 1094
      maxCount: '{name} must have {ruleValue} or less choices'         // 1095
    },                                                                 //
                                                                       //
    selector: {                                                        // 1098
      checkbox: 'input[type="checkbox"], input[type="radio"]',         // 1099
      clear: '.clear',                                                 // 1100
      field: 'input, textarea, select',                                // 1101
      group: '.field',                                                 // 1102
      input: 'input',                                                  // 1103
      message: '.error.message',                                       // 1104
      prompt: '.prompt.label',                                         // 1105
      radio: 'input[type="radio"]',                                    // 1106
      reset: '.reset:not([type="reset"])',                             // 1107
      submit: '.submit:not([type="submit"])',                          // 1108
      uiCheckbox: '.ui.checkbox',                                      // 1109
      uiDropdown: '.ui.dropdown'                                       // 1110
    },                                                                 //
                                                                       //
    className: {                                                       // 1113
      error: 'error',                                                  // 1114
      label: 'ui prompt label',                                        // 1115
      pressed: 'down',                                                 // 1116
      success: 'success'                                               // 1117
    },                                                                 //
                                                                       //
    error: {                                                           // 1120
      identifier: 'You must specify a string identifier for each field',
      method: 'The method you called is not defined.',                 // 1122
      noRule: 'There is no rule matching the one you specified',       // 1123
      oldSyntax: 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
    },                                                                 //
                                                                       //
    templates: {                                                       // 1127
                                                                       //
      // template that produces error message                          //
      error: function (errors) {                                       // 1130
        var html = '<ul class="list">';                                // 1131
        $.each(errors, function (index, value) {                       // 1134
          html += '<li>' + value + '</li>';                            // 1135
        });                                                            //
        html += '</ul>';                                               // 1137
        return $(html);                                                // 1138
      },                                                               //
                                                                       //
      // template that produces label                                  //
      prompt: function (errors) {                                      // 1142
        return $('<div/>').addClass('ui basic red pointing prompt label').html(errors[0]);
      }                                                                //
    },                                                                 //
                                                                       //
    rules: {                                                           // 1150
                                                                       //
      // is not empty or blank string                                  //
      empty: function (value) {                                        // 1153
        return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
      },                                                               //
                                                                       //
      // checkbox checked                                              //
      checked: function () {                                           // 1158
        return $(this).filter(':checked').length > 0;                  // 1159
      },                                                               //
                                                                       //
      // is most likely an email                                       //
      email: function (value) {                                        // 1163
        var emailRegExp = new RegExp($.fn.form.settings.regExp.email, 'i');
        return emailRegExp.test(value);                                // 1167
      },                                                               //
                                                                       //
      // value is most likely url                                      //
      url: function (value) {                                          // 1171
        return $.fn.form.settings.regExp.url.test(value);              // 1172
      },                                                               //
                                                                       //
      // matches specified regExp                                      //
      regExp: function (value, regExp) {                               // 1176
        var regExpParts = regExp.match($.fn.form.settings.regExp.flags),
            flags;                                                     //
        // regular expression specified as /baz/gi (flags)             //
        if (regExpParts) {                                             // 1182
          regExp = regExpParts.length >= 2 ? regExpParts[1] : regExp;  // 1183
          flags = regExpParts.length >= 3 ? regExpParts[2] : '';       // 1187
        }                                                              //
        return value.match(new RegExp(regExp, flags));                 // 1192
      },                                                               //
                                                                       //
      // is valid integer or matches range                             //
      integer: function (value, range) {                               // 1196
        var intRegExp = $.fn.form.settings.regExp.integer,             // 1197
            min,                                                       //
            max,                                                       //
            parts;                                                     //
        if (range === undefined || range === '' || range === '..') {   // 1203
          // do nothing                                                //
        } else if (range.indexOf('..') == -1) {                        //
            if (intRegExp.test(range)) {                               // 1207
              min = max = range - 0;                                   // 1208
            }                                                          //
          } else {                                                     //
            parts = range.split('..', 2);                              // 1212
            if (intRegExp.test(parts[0])) {                            // 1213
              min = parts[0] - 0;                                      // 1214
            }                                                          //
            if (intRegExp.test(parts[1])) {                            // 1216
              max = parts[1] - 0;                                      // 1217
            }                                                          //
          }                                                            //
        return intRegExp.test(value) && (min === undefined || value >= min) && (max === undefined || value <= max);
      },                                                               //
                                                                       //
      // is valid number (with decimal)                                //
      decimal: function (value) {                                      // 1228
        return $.fn.form.settings.regExp.decimal.test(value);          // 1229
      },                                                               //
                                                                       //
      // is valid number                                               //
      number: function (value) {                                       // 1233
        return $.fn.form.settings.regExp.number.test(value);           // 1234
      },                                                               //
                                                                       //
      // is value (case insensitive)                                   //
      is: function (value, text) {                                     // 1238
        text = typeof text == 'string' ? text.toLowerCase() : text;    // 1239
        value = typeof value == 'string' ? value.toLowerCase() : value;
        return value == text;                                          // 1247
      },                                                               //
                                                                       //
      // is value                                                      //
      isExactly: function (value, text) {                              // 1251
        return value == text;                                          // 1252
      },                                                               //
                                                                       //
      // value is not another value (case insensitive)                 //
      not: function (value, notValue) {                                // 1256
        value = typeof value == 'string' ? value.toLowerCase() : value;
        notValue = typeof notValue == 'string' ? notValue.toLowerCase() : notValue;
        return value != notValue;                                      // 1265
      },                                                               //
                                                                       //
      // value is not another value (case sensitive)                   //
      notExactly: function (value, notValue) {                         // 1269
        return value != notValue;                                      // 1270
      },                                                               //
                                                                       //
      // value contains text (insensitive)                             //
      contains: function (value, text) {                               // 1274
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) !== -1;             // 1277
      },                                                               //
                                                                       //
      // value contains text (case sensitive)                          //
      containsExactly: function (value, text) {                        // 1281
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) !== -1;                  // 1284
      },                                                               //
                                                                       //
      // value contains text (insensitive)                             //
      doesntContain: function (value, text) {                          // 1288
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) === -1;             // 1291
      },                                                               //
                                                                       //
      // value contains text (case sensitive)                          //
      doesntContainExactly: function (value, text) {                   // 1295
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) === -1;                  // 1298
      },                                                               //
                                                                       //
      // is at least string length                                     //
      minLength: function (value, requiredLength) {                    // 1302
        return value !== undefined ? value.length >= requiredLength : false;
      },                                                               //
                                                                       //
      // see rls notes for 2.0.6 (this is a duplicate of minLength)    //
      length: function (value, requiredLength) {                       // 1310
        return value !== undefined ? value.length >= requiredLength : false;
      },                                                               //
                                                                       //
      // is exactly length                                             //
      exactLength: function (value, requiredLength) {                  // 1318
        return value !== undefined ? value.length == requiredLength : false;
      },                                                               //
                                                                       //
      // is less than length                                           //
      maxLength: function (value, maxLength) {                         // 1326
        return value !== undefined ? value.length <= maxLength : false;
      },                                                               //
                                                                       //
      // matches another field                                         //
      match: function (value, identifier) {                            // 1334
        var $form = $(this),                                           // 1335
            matchingValue;                                             //
        if ($('[data-validate="' + identifier + '"]').length > 0) {    // 1339
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {                   //
          matchingValue = $('#' + identifier).val();                   // 1343
        } else if ($('[name="' + identifier + '"]').length > 0) {      //
          matchingValue = $('[name="' + identifier + '"]').val();      // 1346
        } else if ($('[name="' + identifier + '[]"]').length > 0) {    //
          matchingValue = $('[name="' + identifier + '[]"]');          // 1349
        }                                                              //
        return matchingValue !== undefined ? value.toString() == matchingValue.toString() : false;
      },                                                               //
                                                                       //
      // different than another field                                  //
      different: function (value, identifier) {                        // 1358
        // use either id or name of field                              //
        var $form = $(this),                                           // 1360
            matchingValue;                                             //
        if ($('[data-validate="' + identifier + '"]').length > 0) {    // 1364
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {                   //
          matchingValue = $('#' + identifier).val();                   // 1368
        } else if ($('[name="' + identifier + '"]').length > 0) {      //
          matchingValue = $('[name="' + identifier + '"]').val();      // 1371
        } else if ($('[name="' + identifier + '[]"]').length > 0) {    //
          matchingValue = $('[name="' + identifier + '[]"]');          // 1374
        }                                                              //
        return matchingValue !== undefined ? value.toString() !== matchingValue.toString() : false;
      },                                                               //
                                                                       //
      creditCard: function (cardNumber, cardTypes) {                   // 1382
        var cards = {                                                  // 1383
          visa: {                                                      // 1385
            pattern: /^4/,                                             // 1386
            length: [16]                                               // 1387
          },                                                           //
          amex: {                                                      // 1389
            pattern: /^3[47]/,                                         // 1390
            length: [15]                                               // 1391
          },                                                           //
          mastercard: {                                                // 1393
            pattern: /^5[1-5]/,                                        // 1394
            length: [16]                                               // 1395
          },                                                           //
          discover: {                                                  // 1397
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length: [16]                                               // 1399
          },                                                           //
          unionPay: {                                                  // 1401
            pattern: /^(62|88)/,                                       // 1402
            length: [16, 17, 18, 19]                                   // 1403
          },                                                           //
          jcb: {                                                       // 1405
            pattern: /^35(2[89]|[3-8][0-9])/,                          // 1406
            length: [16]                                               // 1407
          },                                                           //
          maestro: {                                                   // 1409
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,           // 1410
            length: [12, 13, 14, 15, 16, 17, 18, 19]                   // 1411
          },                                                           //
          dinersClub: {                                                // 1413
            pattern: /^(30[0-5]|^36)/,                                 // 1414
            length: [14]                                               // 1415
          },                                                           //
          laser: {                                                     // 1417
            pattern: /^(6304|670[69]|6771)/,                           // 1418
            length: [16, 17, 18, 19]                                   // 1419
          },                                                           //
          visaElectron: {                                              // 1421
            pattern: /^(4026|417500|4508|4844|491(3|7))/,              // 1422
            length: [16]                                               // 1423
          }                                                            //
        },                                                             //
            valid = {},                                                //
            validCard = false,                                         //
            requiredTypes = typeof cardTypes == 'string' ? cardTypes.split(',') : false,
            unionPay,                                                  //
            validation;                                                //
                                                                       //
        if (typeof cardNumber !== 'string' || cardNumber.length === 0) {
          return;                                                      // 1436
        }                                                              //
                                                                       //
        // verify card types                                           //
        if (requiredTypes) {                                           // 1440
          $.each(requiredTypes, function (index, type) {               // 1441
            // verify each card type                                   //
            validation = cards[type];                                  // 1443
            if (validation) {                                          // 1444
              valid = {                                                // 1445
                length: $.inArray(cardNumber.length, validation.length) !== -1,
                pattern: cardNumber.search(validation.pattern) !== -1  // 1447
              };                                                       //
              if (valid.length && valid.pattern) {                     // 1449
                validCard = true;                                      // 1450
              }                                                        //
            }                                                          //
          });                                                          //
                                                                       //
          if (!validCard) {                                            // 1455
            return false;                                              // 1456
          }                                                            //
        }                                                              //
                                                                       //
        // skip luhn for UnionPay                                      //
        unionPay = {                                                   // 1461
          number: $.inArray(cardNumber.length, cards.unionPay.length) !== -1,
          pattern: cardNumber.search(cards.unionPay.pattern) !== -1    // 1463
        };                                                             //
        if (unionPay.number && unionPay.pattern) {                     // 1465
          return true;                                                 // 1466
        }                                                              //
                                                                       //
        // verify luhn, adapted from  <https://gist.github.com/2134376>
        var length = cardNumber.length,                                // 1470
            multiple = 0,                                              //
            producedValue = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;                                                   //
        while (length--) {                                             // 1479
          sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
          multiple ^= 1;                                               // 1481
        }                                                              //
        return sum % 10 === 0 && sum > 0;                              // 1483
      },                                                               //
                                                                       //
      minCount: function (value, minCount) {                           // 1486
        if (minCount == 0) {                                           // 1487
          return true;                                                 // 1488
        }                                                              //
        if (minCount == 1) {                                           // 1490
          return value !== '';                                         // 1491
        }                                                              //
        return value.split(',').length >= minCount;                    // 1493
      },                                                               //
                                                                       //
      exactCount: function (value, exactCount) {                       // 1496
        if (exactCount == 0) {                                         // 1497
          return value === '';                                         // 1498
        }                                                              //
        if (exactCount == 1) {                                         // 1500
          return value !== '' && value.search(',') === -1;             // 1501
        }                                                              //
        return value.split(',').length == exactCount;                  // 1503
      },                                                               //
                                                                       //
      maxCount: function (value, maxCount) {                           // 1506
        if (maxCount == 0) {                                           // 1507
          return false;                                                // 1508
        }                                                              //
        if (maxCount == 1) {                                           // 1510
          return value.search(',') === -1;                             // 1511
        }                                                              //
        return value.split(',').length <= maxCount;                    // 1513
      }                                                                //
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
