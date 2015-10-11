(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/owl-carousel/owl.carousel.js                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
 *  jQuery OwlCarousel v1.3.3                                          //
 *                                                                     //
 *  Copyright (c) 2013 Bartosz Wojciechowski                           //
 *  http://www.owlgraphic.com/owlcarousel/                             //
 *                                                                     //
 *  Licensed under MIT                                                 //
 *                                                                     //
 */                                                                    //
                                                                       //
/*JS Lint helpers: */                                                  //
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */                                 //
                                                                       //
if (typeof Object.create !== "function") {                             // 15
    Object.create = function (obj) {                                   // 16
        function F() {}                                                // 17
        F.prototype = obj;                                             // 18
        return new F();                                                // 19
    };                                                                 //
}                                                                      //
(function ($, window, document) {                                      // 22
                                                                       //
    var Carousel = {                                                   // 24
        init: function (options, el) {                                 // 25
            var base = this;                                           // 26
            base.$elem = $(el);                                        // 27
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);
                                                                       //
            base.userOptions = options;                                // 30
            base.loadContent();                                        // 31
        },                                                             //
                                                                       //
        loadContent: function () {                                     // 34
            var base = this,                                           // 35
                url;                                                   //
                                                                       //
            function getData(data) {                                   // 37
                var i,                                                 // 38
                    content = "";                                      //
                if (typeof base.options.jsonSuccess === "function") {  // 39
                    base.options.jsonSuccess.apply(this, [data]);      // 40
                } else {                                               //
                    for (i in babelHelpers.sanitizeForInObject(data.owl)) {
                        if (data.owl.hasOwnProperty(i)) {              // 43
                            content += data.owl[i].item;               // 44
                        }                                              //
                    }                                                  //
                    base.$elem.html(content);                          // 47
                }                                                      //
                base.logIn();                                          // 49
            }                                                          //
                                                                       //
            if (typeof base.options.beforeInit === "function") {       // 52
                base.options.beforeInit.apply(this, [base.$elem]);     // 53
            }                                                          //
                                                                       //
            if (typeof base.options.jsonPath === "string") {           // 56
                url = base.options.jsonPath;                           // 57
                $.getJSON(url, getData);                               // 58
            } else {                                                   //
                base.logIn();                                          // 60
            }                                                          //
        },                                                             //
                                                                       //
        logIn: function () {                                           // 64
            var base = this;                                           // 65
                                                                       //
            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));
                                                                       //
            base.$elem.css({ opacity: 0 });                            // 70
            base.orignalItems = base.options.items;                    // 71
            base.checkBrowser();                                       // 72
            base.wrapperWidth = 0;                                     // 73
            base.checkVisible = null;                                  // 74
            base.setVars();                                            // 75
        },                                                             //
                                                                       //
        setVars: function () {                                         // 78
            var base = this;                                           // 79
            if (base.$elem.children().length === 0) {                  // 80
                return false;                                          // 80
            }                                                          //
            base.baseClass();                                          // 81
            base.eventTypes();                                         // 82
            base.$userItems = base.$elem.children();                   // 83
            base.itemsAmount = base.$userItems.length;                 // 84
            base.wrapItems();                                          // 85
            base.$owlItems = base.$elem.find(".owl-item");             // 86
            base.$owlWrapper = base.$elem.find(".owl-wrapper");        // 87
            base.playDirection = "next";                               // 88
            base.prevItem = 0;                                         // 89
            base.prevArr = [0];                                        // 90
            base.currentItem = 0;                                      // 91
            base.customEvents();                                       // 92
            base.onStartup();                                          // 93
        },                                                             //
                                                                       //
        onStartup: function () {                                       // 96
            var base = this;                                           // 97
            base.updateItems();                                        // 98
            base.calculateAll();                                       // 99
            base.buildControls();                                      // 100
            base.updateControls();                                     // 101
            base.response();                                           // 102
            base.moveEvents();                                         // 103
            base.stopOnHover();                                        // 104
            base.owlStatus();                                          // 105
                                                                       //
            if (base.options.transitionStyle !== false) {              // 107
                base.transitionTypes(base.options.transitionStyle);    // 108
            }                                                          //
            if (base.options.autoPlay === true) {                      // 110
                base.options.autoPlay = 5000;                          // 111
            }                                                          //
            base.play();                                               // 113
                                                                       //
            base.$elem.find(".owl-wrapper").css("display", "block");   // 115
                                                                       //
            if (!base.$elem.is(":visible")) {                          // 117
                base.watchVisibility();                                // 118
            } else {                                                   //
                base.$elem.css("opacity", 1);                          // 120
            }                                                          //
            base.onstartup = false;                                    // 122
            base.eachMoveUpdate();                                     // 123
            if (typeof base.options.afterInit === "function") {        // 124
                base.options.afterInit.apply(this, [base.$elem]);      // 125
            }                                                          //
        },                                                             //
                                                                       //
        eachMoveUpdate: function () {                                  // 129
            var base = this;                                           // 130
            if (base.options.lazyLoad === true) {                      // 131
                base.lazyLoad();                                       // 132
            }                                                          //
                                                                       //
            if (base.options.autoHeight === true) {                    // 135
                base.autoHeight();                                     // 136
            }                                                          //
            base.onVisibleItems();                                     // 138
                                                                       //
            if (typeof base.options.afterAction === "function") {      // 140
                base.options.afterAction.apply(this, [base.$elem]);    // 141
            }                                                          //
        },                                                             //
                                                                       //
        updateVars: function () {                                      // 145
            var base = this;                                           // 146
            if (typeof base.options.beforeUpdate === "function") {     // 147
                base.options.beforeUpdate.apply(this, [base.$elem]);   // 148
            }                                                          //
            base.watchVisibility();                                    // 150
            base.updateItems();                                        // 151
            base.calculateAll();                                       // 152
            base.updatePosition();                                     // 153
            base.updateControls();                                     // 154
            base.eachMoveUpdate();                                     // 155
            if (typeof base.options.afterUpdate === "function") {      // 156
                base.options.afterUpdate.apply(this, [base.$elem]);    // 157
            }                                                          //
        },                                                             //
                                                                       //
        reload: function () {                                          // 161
            var base = this;                                           // 162
            window.setTimeout(function () {                            // 163
                base.updateVars();                                     // 164
            }, 0);                                                     //
        },                                                             //
                                                                       //
        watchVisibility: function () {                                 // 168
            var base = this;                                           // 169
                                                                       //
            if (base.$elem.is(":visible") === false) {                 // 171
                base.$elem.css({ opacity: 0 });                        // 172
                window.clearInterval(base.autoPlayInterval);           // 173
                window.clearInterval(base.checkVisible);               // 174
            } else {                                                   //
                return false;                                          // 176
            }                                                          //
            base.checkVisible = window.setInterval(function () {       // 178
                if (base.$elem.is(":visible")) {                       // 179
                    base.reload();                                     // 180
                    base.$elem.animate({ opacity: 1 }, 200);           // 181
                    window.clearInterval(base.checkVisible);           // 182
                }                                                      //
            }, 500);                                                   //
        },                                                             //
                                                                       //
        wrapItems: function () {                                       // 187
            var base = this;                                           // 188
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");                        // 192
        },                                                             //
                                                                       //
        baseClass: function () {                                       // 195
            var base = this,                                           // 196
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);
                                                                       //
            if (!hasBaseClass) {                                       // 200
                base.$elem.addClass(base.options.baseClass);           // 201
            }                                                          //
                                                                       //
            if (!hasThemeClass) {                                      // 204
                base.$elem.addClass(base.options.theme);               // 205
            }                                                          //
        },                                                             //
                                                                       //
        updateItems: function () {                                     // 209
            var base = this,                                           // 210
                width,                                                 //
                i;                                                     //
                                                                       //
            if (base.options.responsive === false) {                   // 212
                return false;                                          // 213
            }                                                          //
            if (base.options.singleItem === true) {                    // 215
                base.options.items = base.orignalItems = 1;            // 216
                base.options.itemsCustom = false;                      // 217
                base.options.itemsDesktop = false;                     // 218
                base.options.itemsDesktopSmall = false;                // 219
                base.options.itemsTablet = false;                      // 220
                base.options.itemsTabletSmall = false;                 // 221
                base.options.itemsMobile = false;                      // 222
                return false;                                          // 223
            }                                                          //
                                                                       //
            width = $(base.options.responsiveBaseWidth).width();       // 226
                                                                       //
            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;                // 229
            }                                                          //
            if (base.options.itemsCustom !== false) {                  // 231
                //Reorder array by screen size                         //
                base.options.itemsCustom.sort(function (a, b) {        // 233
                    return a[0] - b[0];                                // 233
                });                                                    //
                                                                       //
                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {     // 236
                        base.options.items = base.options.itemsCustom[i][1];
                    }                                                  //
                }                                                      //
            } else {                                                   //
                                                                       //
                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }                                                      //
                                                                       //
                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }                                                      //
                                                                       //
                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];  // 252
                }                                                      //
                                                                       //
                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }                                                      //
                                                                       //
                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];  // 260
                }                                                      //
            }                                                          //
                                                                       //
            //if number of items is less than declared                 //
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;                 // 266
            }                                                          //
        },                                                             //
                                                                       //
        response: function () {                                        // 270
            var base = this,                                           // 271
                smallDelay,                                            //
                lastWindowWidth;                                       //
                                                                       //
            if (base.options.responsive !== true) {                    // 275
                return false;                                          // 276
            }                                                          //
            lastWindowWidth = $(window).width();                       // 278
                                                                       //
            base.resizer = function () {                               // 280
                if ($(window).width() !== lastWindowWidth) {           // 281
                    if (base.options.autoPlay !== false) {             // 282
                        window.clearInterval(base.autoPlayInterval);   // 283
                    }                                                  //
                    window.clearTimeout(smallDelay);                   // 285
                    smallDelay = window.setTimeout(function () {       // 286
                        lastWindowWidth = $(window).width();           // 287
                        base.updateVars();                             // 288
                    }, base.options.responsiveRefreshRate);            //
                }                                                      //
            };                                                         //
            $(window).resize(base.resizer);                            // 292
        },                                                             //
                                                                       //
        updatePosition: function () {                                  // 295
            var base = this;                                           // 296
            base.jumpTo(base.currentItem);                             // 297
            if (base.options.autoPlay !== false) {                     // 298
                base.checkAp();                                        // 299
            }                                                          //
        },                                                             //
                                                                       //
        appendItemsSizes: function () {                                // 303
            var base = this,                                           // 304
                roundPages = 0,                                        //
                lastItem = base.itemsAmount - base.options.items;      //
                                                                       //
            base.$owlItems.each(function (index) {                     // 308
                var $this = $(this);                                   // 309
                $this.css({ "width": base.itemWidth }).data("owl-item", Number(index));
                                                                       //
                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {                         // 315
                        roundPages += 1;                               // 316
                    }                                                  //
                }                                                      //
                $this.data("owl-roundPages", roundPages);              // 319
            });                                                        //
        },                                                             //
                                                                       //
        appendWrapperSizes: function () {                              // 323
            var base = this,                                           // 324
                width = base.$owlItems.length * base.itemWidth;        //
                                                                       //
            base.$owlWrapper.css({                                     // 327
                "width": width * 2,                                    // 328
                "left": 0                                              // 329
            });                                                        //
            base.appendItemsSizes();                                   // 331
        },                                                             //
                                                                       //
        calculateAll: function () {                                    // 334
            var base = this;                                           // 335
            base.calculateWidth();                                     // 336
            base.appendWrapperSizes();                                 // 337
            base.loops();                                              // 338
            base.max();                                                // 339
        },                                                             //
                                                                       //
        calculateWidth: function () {                                  // 342
            var base = this;                                           // 343
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },                                                             //
                                                                       //
        max: function () {                                             // 347
            var base = this,                                           // 348
                maximum = (base.itemsAmount * base.itemWidth - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {               // 350
                base.maximumItem = 0;                                  // 351
                maximum = 0;                                           // 352
                base.maximumPixels = 0;                                // 353
            } else {                                                   //
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;                          // 356
            }                                                          //
            return maximum;                                            // 358
        },                                                             //
                                                                       //
        min: function () {                                             // 361
            return 0;                                                  // 362
        },                                                             //
                                                                       //
        loops: function () {                                           // 365
            var base = this,                                           // 366
                prev = 0,                                              //
                elWidth = 0,                                           //
                i,                                                     //
                item,                                                  //
                roundPageNum;                                          //
                                                                       //
            base.positionsInArray = [0];                               // 373
            base.pagesInArray = [];                                    // 374
                                                                       //
            for (i = 0; i < base.itemsAmount; i += 1) {                // 376
                elWidth += base.itemWidth;                             // 377
                base.positionsInArray.push(-elWidth);                  // 378
                                                                       //
                if (base.options.scrollPerPage === true) {             // 380
                    item = $(base.$owlItems[i]);                       // 381
                    roundPageNum = item.data("owl-roundPages");        // 382
                    if (roundPageNum !== prev) {                       // 383
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;                           // 385
                    }                                                  //
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        buildControls: function () {                                   // 391
            var base = this;                                           // 392
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }                                                          //
            if (base.options.pagination === true) {                    // 396
                base.buildPagination();                                // 397
            }                                                          //
            if (base.options.navigation === true) {                    // 399
                base.buildButtons();                                   // 400
            }                                                          //
        },                                                             //
                                                                       //
        buildButtons: function () {                                    // 404
            var base = this,                                           // 405
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");    //
            base.owlControls.append(buttonsWrapper);                   // 407
                                                                       //
            base.buttonPrev = $("<div/>", {                            // 409
                "class": "owl-prev",                                   // 410
                "html": base.options.navigationText[0] || ""           // 411
            });                                                        //
                                                                       //
            base.buttonNext = $("<div/>", {                            // 414
                "class": "owl-next",                                   // 415
                "html": base.options.navigationText[1] || ""           // 416
            });                                                        //
                                                                       //
            buttonsWrapper.append(base.buttonPrev).append(base.buttonNext);
                                                                       //
            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();                                // 424
            });                                                        //
                                                                       //
            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();                                // 428
                if ($(this).hasClass("owl-next")) {                    // 429
                    base.next();                                       // 430
                } else {                                               //
                    base.prev();                                       // 432
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        buildPagination: function () {                                 // 437
            var base = this;                                           // 438
                                                                       //
            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);           // 441
                                                                       //
            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();                                // 444
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        updatePagination: function () {                                // 451
            var base = this,                                           // 452
                counter,                                               //
                lastPage,                                              //
                lastItem,                                              //
                i,                                                     //
                paginationButton,                                      //
                paginationButtonInner;                                 //
                                                                       //
            if (base.options.pagination === false) {                   // 460
                return false;                                          // 461
            }                                                          //
                                                                       //
            base.paginationWrapper.html("");                           // 464
                                                                       //
            counter = 0;                                               // 466
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;
                                                                       //
            for (i = 0; i < base.itemsAmount; i += 1) {                // 469
                if (i % base.options.items === 0) {                    // 470
                    counter += 1;                                      // 471
                    if (lastPage === i) {                              // 472
                        lastItem = base.itemsAmount - base.options.items;
                    }                                                  //
                    paginationButton = $("<div/>", {                   // 475
                        "class": "owl-page"                            // 476
                    });                                                //
                    paginationButtonInner = $("<span></span>", {       // 478
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });                                                //
                    paginationButton.append(paginationButtonInner);    // 482
                                                                       //
                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);  // 485
                                                                       //
                    base.paginationWrapper.append(paginationButton);   // 487
                }                                                      //
            }                                                          //
            base.checkPagination();                                    // 490
        },                                                             //
        checkPagination: function () {                                 // 492
            var base = this;                                           // 493
            if (base.options.pagination === false) {                   // 494
                return false;                                          // 495
            }                                                          //
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper.find(".owl-page").removeClass("active");
                    $(this).addClass("active");                        // 502
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        checkNavigation: function () {                                 // 507
            var base = this;                                           // 508
                                                                       //
            if (base.options.navigation === false) {                   // 510
                return false;                                          // 511
            }                                                          //
            if (base.options.rewindNav === false) {                    // 513
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");              // 515
                    base.buttonNext.addClass("disabled");              // 516
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");              // 518
                    base.buttonNext.removeClass("disabled");           // 519
                } else if (base.currentItem === base.maximumItem) {    //
                    base.buttonPrev.removeClass("disabled");           // 521
                    base.buttonNext.addClass("disabled");              // 522
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");           // 524
                    base.buttonNext.removeClass("disabled");           // 525
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        updateControls: function () {                                  // 530
            var base = this;                                           // 531
            base.updatePagination();                                   // 532
            base.checkNavigation();                                    // 533
            if (base.owlControls) {                                    // 534
                if (base.options.items >= base.itemsAmount) {          // 535
                    base.owlControls.hide();                           // 536
                } else {                                               //
                    base.owlControls.show();                           // 538
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        destroyControls: function () {                                 // 543
            var base = this;                                           // 544
            if (base.owlControls) {                                    // 545
                base.owlControls.remove();                             // 546
            }                                                          //
        },                                                             //
                                                                       //
        next: function (speed) {                                       // 550
            var base = this;                                           // 551
                                                                       //
            if (base.isTransition) {                                   // 553
                return false;                                          // 554
            }                                                          //
                                                                       //
            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? base.options.items - 1 : 0)) {
                if (base.options.rewindNav === true) {                 // 559
                    base.currentItem = 0;                              // 560
                    speed = "rewind";                                  // 561
                } else {                                               //
                    base.currentItem = base.maximumItem;               // 563
                    return false;                                      // 564
                }                                                      //
            }                                                          //
            base.goTo(base.currentItem, speed);                        // 567
        },                                                             //
                                                                       //
        prev: function (speed) {                                       // 570
            var base = this;                                           // 571
                                                                       //
            if (base.isTransition) {                                   // 573
                return false;                                          // 574
            }                                                          //
                                                                       //
            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;                                  // 578
            } else {                                                   //
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }                                                          //
            if (base.currentItem < 0) {                                // 582
                if (base.options.rewindNav === true) {                 // 583
                    base.currentItem = base.maximumItem;               // 584
                    speed = "rewind";                                  // 585
                } else {                                               //
                    base.currentItem = 0;                              // 587
                    return false;                                      // 588
                }                                                      //
            }                                                          //
            base.goTo(base.currentItem, speed);                        // 591
        },                                                             //
                                                                       //
        goTo: function (position, speed, drag) {                       // 594
            var base = this,                                           // 595
                goToPixel;                                             //
                                                                       //
            if (base.isTransition) {                                   // 598
                return false;                                          // 599
            }                                                          //
            if (typeof base.options.beforeMove === "function") {       // 601
                base.options.beforeMove.apply(this, [base.$elem]);     // 602
            }                                                          //
            if (position >= base.maximumItem) {                        // 604
                position = base.maximumItem;                           // 605
            } else if (position <= 0) {                                //
                position = 0;                                          // 607
            }                                                          //
                                                                       //
            base.currentItem = base.owl.currentItem = position;        // 610
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);                                     // 612
                if (base.browser.support3d === true) {                 // 613
                    base.transition3d(base.positionsInArray[position]);
                } else {                                               //
                    base.css2slide(base.positionsInArray[position], 1);
                }                                                      //
                base.afterGo();                                        // 618
                base.singleItemTransition();                           // 619
                return false;                                          // 620
            }                                                          //
            goToPixel = base.positionsInArray[position];               // 622
                                                                       //
            if (base.browser.support3d === true) {                     // 624
                base.isCss3Finish = false;                             // 625
                                                                       //
                if (speed === true) {                                  // 627
                    base.swapSpeed("paginationSpeed");                 // 628
                    window.setTimeout(function () {                    // 629
                        base.isCss3Finish = true;                      // 630
                    }, base.options.paginationSpeed);                  //
                } else if (speed === "rewind") {                       //
                    base.swapSpeed(base.options.rewindSpeed);          // 634
                    window.setTimeout(function () {                    // 635
                        base.isCss3Finish = true;                      // 636
                    }, base.options.rewindSpeed);                      //
                } else {                                               //
                    base.swapSpeed("slideSpeed");                      // 640
                    window.setTimeout(function () {                    // 641
                        base.isCss3Finish = true;                      // 642
                    }, base.options.slideSpeed);                       //
                }                                                      //
                base.transition3d(goToPixel);                          // 645
            } else {                                                   //
                if (speed === true) {                                  // 647
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {                       //
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {                                               //
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }                                                      //
            }                                                          //
            base.afterGo();                                            // 655
        },                                                             //
                                                                       //
        jumpTo: function (position) {                                  // 658
            var base = this;                                           // 659
            if (typeof base.options.beforeMove === "function") {       // 660
                base.options.beforeMove.apply(this, [base.$elem]);     // 661
            }                                                          //
            if (position >= base.maximumItem || position === -1) {     // 663
                position = base.maximumItem;                           // 664
            } else if (position <= 0) {                                //
                position = 0;                                          // 666
            }                                                          //
            base.swapSpeed(0);                                         // 668
            if (base.browser.support3d === true) {                     // 669
                base.transition3d(base.positionsInArray[position]);    // 670
            } else {                                                   //
                base.css2slide(base.positionsInArray[position], 1);    // 672
            }                                                          //
            base.currentItem = base.owl.currentItem = position;        // 674
            base.afterGo();                                            // 675
        },                                                             //
                                                                       //
        afterGo: function () {                                         // 678
            var base = this;                                           // 679
                                                                       //
            base.prevArr.push(base.currentItem);                       // 681
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);                                     // 683
                                                                       //
            if (base.prevItem !== base.currentItem) {                  // 685
                base.checkPagination();                                // 686
                base.checkNavigation();                                // 687
                base.eachMoveUpdate();                                 // 688
                                                                       //
                if (base.options.autoPlay !== false) {                 // 690
                    base.checkAp();                                    // 691
                }                                                      //
            }                                                          //
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);      // 695
            }                                                          //
        },                                                             //
                                                                       //
        stop: function () {                                            // 699
            var base = this;                                           // 700
            base.apStatus = "stop";                                    // 701
            window.clearInterval(base.autoPlayInterval);               // 702
        },                                                             //
                                                                       //
        checkAp: function () {                                         // 705
            var base = this;                                           // 706
            if (base.apStatus !== "stop") {                            // 707
                base.play();                                           // 708
            }                                                          //
        },                                                             //
                                                                       //
        play: function () {                                            // 712
            var base = this;                                           // 713
            base.apStatus = "play";                                    // 714
            if (base.options.autoPlay === false) {                     // 715
                return false;                                          // 716
            }                                                          //
            window.clearInterval(base.autoPlayInterval);               // 718
            base.autoPlayInterval = window.setInterval(function () {   // 719
                base.next(true);                                       // 720
            }, base.options.autoPlay);                                 //
        },                                                             //
                                                                       //
        swapSpeed: function (action) {                                 // 724
            var base = this;                                           // 725
            if (action === "slideSpeed") {                             // 726
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {                 //
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {                   //
                base.$owlWrapper.css(base.addCssSpeed(action));        // 731
            }                                                          //
        },                                                             //
                                                                       //
        addCssSpeed: function (speed) {                                // 735
            return {                                                   // 736
                "-webkit-transition": "all " + speed + "ms ease",      // 737
                "-moz-transition": "all " + speed + "ms ease",         // 738
                "-o-transition": "all " + speed + "ms ease",           // 739
                "transition": "all " + speed + "ms ease"               // 740
            };                                                         //
        },                                                             //
                                                                       //
        removeTransition: function () {                                // 744
            return {                                                   // 745
                "-webkit-transition": "",                              // 746
                "-moz-transition": "",                                 // 747
                "-o-transition": "",                                   // 748
                "transition": ""                                       // 749
            };                                                         //
        },                                                             //
                                                                       //
        doTranslate: function (pixels) {                               // 753
            return {                                                   // 754
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"  // 759
            };                                                         //
        },                                                             //
                                                                       //
        transition3d: function (value) {                               // 763
            var base = this;                                           // 764
            base.$owlWrapper.css(base.doTranslate(value));             // 765
        },                                                             //
                                                                       //
        css2move: function (value) {                                   // 768
            var base = this;                                           // 769
            base.$owlWrapper.css({ "left": value });                   // 770
        },                                                             //
                                                                       //
        css2slide: function (value, speed) {                           // 773
            var base = this;                                           // 774
                                                                       //
            base.isCssFinish = false;                                  // 776
            base.$owlWrapper.stop(true, true).animate({                // 777
                "left": value                                          // 778
            }, {                                                       //
                duration: speed || base.options.slideSpeed,            // 780
                complete: function () {                                // 781
                    base.isCssFinish = true;                           // 782
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        checkBrowser: function () {                                    // 787
            var base = this,                                           // 788
                translate3D = "translate3d(0px, 0px, 0px)",            //
                tempElem = document.createElement("div"),              //
                regex,                                                 //
                asSupport,                                             //
                support3d,                                             //
                isTouch;                                               //
                                                                       //
            tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;                   // 801
            asSupport = tempElem.style.cssText.match(regex);           // 802
            support3d = asSupport !== null && asSupport.length === 1;  // 803
                                                                       //
            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;
                                                                       //
            base.browser = {                                           // 807
                "support3d": support3d,                                // 808
                "isTouch": isTouch                                     // 809
            };                                                         //
        },                                                             //
                                                                       //
        moveEvents: function () {                                      // 813
            var base = this;                                           // 814
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();                                       // 816
                base.disabledEvents();                                 // 817
            }                                                          //
        },                                                             //
                                                                       //
        eventTypes: function () {                                      // 821
            var base = this,                                           // 822
                types = ["s", "e", "x"];                               //
                                                                       //
            base.ev_types = {};                                        // 825
                                                                       //
            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = ["mousedown.owl", "mousemove.owl", "mouseup.owl"];
            }                                                          //
                                                                       //
            base.ev_types.start = types[0];                            // 847
            base.ev_types.move = types[1];                             // 848
            base.ev_types.end = types[2];                              // 849
        },                                                             //
                                                                       //
        disabledEvents: function () {                                  // 852
            var base = this;                                           // 853
            base.$elem.on("dragstart.owl", function (event) {          // 854
                event.preventDefault();                                // 854
            });                                                        //
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });                                                        //
        },                                                             //
                                                                       //
        gestures: function () {                                        // 860
            /*jslint unparam: true*/                                   //
            var base = this,                                           // 862
                locals = {                                             //
                offsetX: 0,                                            // 864
                offsetY: 0,                                            // 865
                baseElWidth: 0,                                        // 866
                relativePos: 0,                                        // 867
                position: null,                                        // 868
                minSwipe: null,                                        // 869
                maxSwipe: null,                                        // 870
                sliding: null,                                         // 871
                dargging: null,                                        // 872
                targetElement: null                                    // 873
            };                                                         //
                                                                       //
            base.isCssFinish = true;                                   // 876
                                                                       //
            function getTouches(event) {                               // 878
                if (event.touches !== undefined) {                     // 879
                    return {                                           // 880
                        x: event.touches[0].pageX,                     // 881
                        y: event.touches[0].pageY                      // 882
                    };                                                 //
                }                                                      //
                                                                       //
                if (event.touches === undefined) {                     // 886
                    if (event.pageX !== undefined) {                   // 887
                        return {                                       // 888
                            x: event.pageX,                            // 889
                            y: event.pageY                             // 890
                        };                                             //
                    }                                                  //
                    if (event.pageX === undefined) {                   // 893
                        return {                                       // 894
                            x: event.clientX,                          // 895
                            y: event.clientY                           // 896
                        };                                             //
                    }                                                  //
                }                                                      //
            }                                                          //
                                                                       //
            function swapEvents(type) {                                // 902
                if (type === "on") {                                   // 903
                    $(document).on(base.ev_types.move, dragMove);      // 904
                    $(document).on(base.ev_types.end, dragEnd);        // 905
                } else if (type === "off") {                           //
                    $(document).off(base.ev_types.move);               // 907
                    $(document).off(base.ev_types.end);                // 908
                }                                                      //
            }                                                          //
                                                                       //
            function dragStart(event) {                                // 912
                var ev = event.originalEvent || event || window.event,
                    position;                                          //
                                                                       //
                if (ev.which === 3) {                                  // 916
                    return false;                                      // 917
                }                                                      //
                if (base.itemsAmount <= base.options.items) {          // 919
                    return;                                            // 920
                }                                                      //
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;                                      // 923
                }                                                      //
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;                                      // 926
                }                                                      //
                                                                       //
                if (base.options.autoPlay !== false) {                 // 929
                    window.clearInterval(base.autoPlayInterval);       // 930
                }                                                      //
                                                                       //
                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");             // 934
                }                                                      //
                                                                       //
                base.newPosX = 0;                                      // 937
                base.newRelativeX = 0;                                 // 938
                                                                       //
                $(this).css(base.removeTransition());                  // 940
                                                                       //
                position = $(this).position();                         // 942
                locals.relativePos = position.left;                    // 943
                                                                       //
                locals.offsetX = getTouches(ev).x - position.left;     // 945
                locals.offsetY = getTouches(ev).y - position.top;      // 946
                                                                       //
                swapEvents("on");                                      // 948
                                                                       //
                locals.sliding = false;                                // 950
                locals.targetElement = ev.target || ev.srcElement;     // 951
            }                                                          //
                                                                       //
            function dragMove(event) {                                 // 954
                var ev = event.originalEvent || event || window.event,
                    minSwipe,                                          //
                    maxSwipe;                                          //
                                                                       //
                base.newPosX = getTouches(ev).x - locals.offsetX;      // 959
                base.newPosY = getTouches(ev).y - locals.offsetY;      // 960
                base.newRelativeX = base.newPosX - locals.relativePos;
                                                                       //
                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;                            // 964
                    base.options.startDragging.apply(base, [base.$elem]);
                }                                                      //
                                                                       //
                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && base.browser.isTouch === true) {
                    if (ev.preventDefault !== undefined) {             // 969
                        ev.preventDefault();                           // 970
                    } else {                                           //
                        ev.returnValue = false;                        // 972
                    }                                                  //
                    locals.sliding = true;                             // 974
                }                                                      //
                                                                       //
                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");                  // 978
                }                                                      //
                                                                       //
                minSwipe = function () {                               // 981
                    return base.newRelativeX / 5;                      // 982
                };                                                     //
                                                                       //
                maxSwipe = function () {                               // 985
                    return base.maximumPixels + base.newRelativeX / 5;
                };                                                     //
                                                                       //
                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {                 // 990
                    base.transition3d(base.newPosX);                   // 991
                } else {                                               //
                    base.css2move(base.newPosX);                       // 993
                }                                                      //
            }                                                          //
                                                                       //
            function dragEnd(event) {                                  // 997
                var ev = event.originalEvent || event || window.event,
                    newPosition,                                       //
                    handlers,                                          //
                    owlStopEvent;                                      //
                                                                       //
                ev.target = ev.target || ev.srcElement;                // 1003
                                                                       //
                locals.dragging = false;                               // 1005
                                                                       //
                if (base.browser.isTouch !== true) {                   // 1007
                    base.$owlWrapper.removeClass("grabbing");          // 1008
                }                                                      //
                                                                       //
                if (base.newRelativeX < 0) {                           // 1011
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {                                               //
                    base.dragDirection = base.owl.dragDirection = "right";
                }                                                      //
                                                                       //
                if (base.newRelativeX !== 0) {                         // 1017
                    newPosition = base.getNewPosition();               // 1018
                    base.goTo(newPosition, false, "drag");             // 1019
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();             // 1022
                            ev.stopPropagation();                      // 1023
                            ev.preventDefault();                       // 1024
                            $(ev.target).off("click.disable");         // 1025
                        });                                            //
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();                 // 1028
                        handlers.splice(0, 0, owlStopEvent);           // 1029
                    }                                                  //
                }                                                      //
                swapEvents("off");                                     // 1032
            }                                                          //
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },                                                             //
                                                                       //
        getNewPosition: function () {                                  // 1037
            var base = this,                                           // 1038
                newPosition = base.closestItem();                      //
                                                                       //
            if (newPosition > base.maximumItem) {                      // 1041
                base.currentItem = base.maximumItem;                   // 1042
                newPosition = base.maximumItem;                        // 1043
            } else if (base.newPosX >= 0) {                            //
                newPosition = 0;                                       // 1045
                base.currentItem = 0;                                  // 1046
            }                                                          //
            return newPosition;                                        // 1048
        },                                                             //
        closestItem: function () {                                     // 1050
            var base = this,                                           // 1051
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,                                   //
                closest = null;                                        //
                                                                       //
            $.each(array, function (i, v) {                            // 1056
                if (goal - base.itemWidth / 20 > array[i + 1] && goal - base.itemWidth / 20 < v && base.moveDirection() === "left") {
                    closest = v;                                       // 1058
                    if (base.options.scrollPerPage === true) {         // 1059
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {                                           //
                        base.currentItem = i;                          // 1062
                    }                                                  //
                } else if (goal + base.itemWidth / 20 < v && goal + base.itemWidth / 20 > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {         // 1065
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {                                           //
                        closest = array[i + 1];                        // 1069
                        base.currentItem = i + 1;                      // 1070
                    }                                                  //
                }                                                      //
            });                                                        //
            return base.currentItem;                                   // 1074
        },                                                             //
                                                                       //
        moveDirection: function () {                                   // 1077
            var base = this,                                           // 1078
                direction;                                             //
            if (base.newRelativeX < 0) {                               // 1080
                direction = "right";                                   // 1081
                base.playDirection = "next";                           // 1082
            } else {                                                   //
                direction = "left";                                    // 1084
                base.playDirection = "prev";                           // 1085
            }                                                          //
            return direction;                                          // 1087
        },                                                             //
                                                                       //
        customEvents: function () {                                    // 1090
            /*jslint unparam: true*/                                   //
            var base = this;                                           // 1092
            base.$elem.on("owl.next", function () {                    // 1093
                base.next();                                           // 1094
            });                                                        //
            base.$elem.on("owl.prev", function () {                    // 1096
                base.prev();                                           // 1097
            });                                                        //
            base.$elem.on("owl.play", function (event, speed) {        // 1099
                base.options.autoPlay = speed;                         // 1100
                base.play();                                           // 1101
                base.hoverStatus = "play";                             // 1102
            });                                                        //
            base.$elem.on("owl.stop", function () {                    // 1104
                base.stop();                                           // 1105
                base.hoverStatus = "stop";                             // 1106
            });                                                        //
            base.$elem.on("owl.goTo", function (event, item) {         // 1108
                base.goTo(item);                                       // 1109
            });                                                        //
            base.$elem.on("owl.jumpTo", function (event, item) {       // 1111
                base.jumpTo(item);                                     // 1112
            });                                                        //
        },                                                             //
                                                                       //
        stopOnHover: function () {                                     // 1116
            var base = this;                                           // 1117
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {               // 1119
                    base.stop();                                       // 1120
                });                                                    //
                base.$elem.on("mouseout", function () {                // 1122
                    if (base.hoverStatus !== "stop") {                 // 1123
                        base.play();                                   // 1124
                    }                                                  //
                });                                                    //
            }                                                          //
        },                                                             //
                                                                       //
        lazyLoad: function () {                                        // 1130
            var base = this,                                           // 1131
                i,                                                     //
                $item,                                                 //
                itemNumber,                                            //
                $lazyImg,                                              //
                follow;                                                //
                                                                       //
            if (base.options.lazyLoad === false) {                     // 1138
                return false;                                          // 1139
            }                                                          //
            for (i = 0; i < base.itemsAmount; i += 1) {                // 1141
                $item = $(base.$owlItems[i]);                          // 1142
                                                                       //
                if ($item.data("owl-loaded") === "loaded") {           // 1144
                    continue;                                          // 1145
                }                                                      //
                                                                       //
                itemNumber = $item.data("owl-item");                   // 1148
                $lazyImg = $item.find(".lazyOwl");                     // 1149
                                                                       //
                if (typeof $lazyImg.data("src") !== "string") {        // 1151
                    $item.data("owl-loaded", "loaded");                // 1152
                    continue;                                          // 1153
                }                                                      //
                if ($item.data("owl-loaded") === undefined) {          // 1155
                    $lazyImg.hide();                                   // 1156
                    $item.addClass("loading").data("owl-loaded", "checked");
                }                                                      //
                if (base.options.lazyFollow === true) {                // 1159
                    follow = itemNumber >= base.currentItem;           // 1160
                } else {                                               //
                    follow = true;                                     // 1162
                }                                                      //
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    base.lazyPreload($item, $lazyImg);                 // 1165
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        lazyPreload: function ($item, $lazyImg) {                      // 1170
            var base = this,                                           // 1171
                iterations = 0,                                        //
                isBackgroundImg;                                       //
                                                                       //
            if ($lazyImg.prop("tagName") === "DIV") {                  // 1175
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;                                // 1177
            } else {                                                   //
                $lazyImg[0].src = $lazyImg.data("src");                // 1179
            }                                                          //
                                                                       //
            function showImage() {                                     // 1182
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");                       // 1184
                if (base.options.lazyEffect === "fade") {              // 1185
                    $lazyImg.fadeIn(400);                              // 1186
                } else {                                               //
                    $lazyImg.show();                                   // 1188
                }                                                      //
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }                                                      //
            }                                                          //
                                                                       //
            function checkLazyImage() {                                // 1195
                iterations += 1;                                       // 1196
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();                                       // 1198
                } else if (iterations <= 100) {                        //
                    //if image loads in less than 10 seconds           //
                    window.setTimeout(checkLazyImage, 100);            // 1200
                } else {                                               //
                    showImage();                                       // 1202
                }                                                      //
            }                                                          //
                                                                       //
            checkLazyImage();                                          // 1206
        },                                                             //
                                                                       //
        autoHeight: function () {                                      // 1209
            var base = this,                                           // 1210
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;                                            //
                                                                       //
            function addHeight() {                                     // 1214
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");  // 1216
                if (!base.wrapperOuter.hasClass("autoHeight")) {       // 1217
                    window.setTimeout(function () {                    // 1218
                        base.wrapperOuter.addClass("autoHeight");      // 1219
                    }, 0);                                             //
                }                                                      //
            }                                                          //
                                                                       //
            function checkImage() {                                    // 1224
                iterations += 1;                                       // 1225
                if (base.completeImg($currentimg.get(0))) {            // 1226
                    addHeight();                                       // 1227
                } else if (iterations <= 100) {                        //
                    //if image loads in less than 10 seconds           //
                    window.setTimeout(checkImage, 100);                // 1229
                } else {                                               //
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }                                                      //
            }                                                          //
                                                                       //
            if ($currentimg.get(0) !== undefined) {                    // 1235
                iterations = 0;                                        // 1236
                checkImage();                                          // 1237
            } else {                                                   //
                addHeight();                                           // 1239
            }                                                          //
        },                                                             //
                                                                       //
        completeImg: function (img) {                                  // 1243
            var naturalWidthType;                                      // 1244
                                                                       //
            if (!img.complete) {                                       // 1246
                return false;                                          // 1247
            }                                                          //
            naturalWidthType = typeof img.naturalWidth;                // 1249
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;                                          // 1251
            }                                                          //
            return true;                                               // 1253
        },                                                             //
                                                                       //
        onVisibleItems: function () {                                  // 1256
            var base = this,                                           // 1257
                i;                                                     //
                                                                       //
            if (base.options.addClassActive === true) {                // 1260
                base.$owlItems.removeClass("active");                  // 1261
            }                                                          //
            base.visibleItems = [];                                    // 1263
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);                             // 1265
                                                                       //
                if (base.options.addClassActive === true) {            // 1267
                    $(base.$owlItems[i]).addClass("active");           // 1268
                }                                                      //
            }                                                          //
            base.owl.visibleItems = base.visibleItems;                 // 1271
        },                                                             //
                                                                       //
        transitionTypes: function (className) {                        // 1274
            var base = this;                                           // 1275
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";               // 1277
            base.inClass = "owl-" + className + "-in";                 // 1278
        },                                                             //
                                                                       //
        singleItemTransition: function () {                            // 1281
            var base = this,                                           // 1282
                outClass = base.outClass,                              //
                inClass = base.inClass,                                //
                $currentItem = base.$owlItems.eq(base.currentItem),    //
                $prevItem = base.$owlItems.eq(base.prevItem),          //
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
                                                                       //
            base.isTransition = true;                                  // 1291
                                                                       //
            base.$owlWrapper.addClass('owl-origin').css({              // 1293
                "-webkit-transform-origin": origin + "px",             // 1296
                "-moz-perspective-origin": origin + "px",              // 1297
                "perspective-origin": origin + "px"                    // 1298
            });                                                        //
            function transStyles(prevPos) {                            // 1300
                return {                                               // 1301
                    "position": "relative",                            // 1302
                    "left": prevPos + "px"                             // 1303
                };                                                     //
            }                                                          //
                                                                       //
            $prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function () {
                base.endPrev = true;                                   // 1311
                $prevItem.off(animEnd);                                // 1312
                base.clearTransStyle($prevItem, outClass);             // 1313
            });                                                        //
                                                                       //
            $currentItem.addClass(inClass).on(animEnd, function () {   // 1316
                base.endCurrent = true;                                // 1319
                $currentItem.off(animEnd);                             // 1320
                base.clearTransStyle($currentItem, inClass);           // 1321
            });                                                        //
        },                                                             //
                                                                       //
        clearTransStyle: function (item, classToRemove) {              // 1325
            var base = this;                                           // 1326
            item.css({                                                 // 1327
                "position": "",                                        // 1328
                "left": ""                                             // 1329
            }).removeClass(classToRemove);                             //
                                                                       //
            if (base.endPrev && base.endCurrent) {                     // 1332
                base.$owlWrapper.removeClass('owl-origin');            // 1333
                base.endPrev = false;                                  // 1334
                base.endCurrent = false;                               // 1335
                base.isTransition = false;                             // 1336
            }                                                          //
        },                                                             //
                                                                       //
        owlStatus: function () {                                       // 1340
            var base = this;                                           // 1341
            base.owl = {                                               // 1342
                "userOptions": base.userOptions,                       // 1343
                "baseElement": base.$elem,                             // 1344
                "userItems": base.$userItems,                          // 1345
                "owlItems": base.$owlItems,                            // 1346
                "currentItem": base.currentItem,                       // 1347
                "prevItem": base.prevItem,                             // 1348
                "visibleItems": base.visibleItems,                     // 1349
                "isTouch": base.browser.isTouch,                       // 1350
                "browser": base.browser,                               // 1351
                "dragDirection": base.dragDirection                    // 1352
            };                                                         //
        },                                                             //
                                                                       //
        clearEvents: function () {                                     // 1356
            var base = this;                                           // 1357
            base.$elem.off(".owl owl mousedown.disableTextSelect");    // 1358
            $(document).off(".owl owl");                               // 1359
            $(window).off("resize", base.resizer);                     // 1360
        },                                                             //
                                                                       //
        unWrap: function () {                                          // 1363
            var base = this;                                           // 1364
            if (base.$elem.children().length !== 0) {                  // 1365
                base.$owlWrapper.unwrap();                             // 1366
                base.$userItems.unwrap().unwrap();                     // 1367
                if (base.owlControls) {                                // 1368
                    base.owlControls.remove();                         // 1369
                }                                                      //
            }                                                          //
            base.clearEvents();                                        // 1372
            base.$elem.attr("style", base.$elem.data("owl-originalStyles") || "").attr("class", base.$elem.data("owl-originalClasses"));
        },                                                             //
                                                                       //
        destroy: function () {                                         // 1378
            var base = this;                                           // 1379
            base.stop();                                               // 1380
            window.clearInterval(base.checkVisible);                   // 1381
            base.unWrap();                                             // 1382
            base.$elem.removeData();                                   // 1383
        },                                                             //
                                                                       //
        reinit: function (newOptions) {                                // 1386
            var base = this,                                           // 1387
                options = $.extend({}, base.userOptions, newOptions);  //
            base.unWrap();                                             // 1389
            base.init(options, base.$elem);                            // 1390
        },                                                             //
                                                                       //
        addItem: function (htmlString, targetPosition) {               // 1393
            var base = this,                                           // 1394
                position;                                              //
                                                                       //
            if (!htmlString) {                                         // 1397
                return false;                                          // 1397
            }                                                          //
                                                                       //
            if (base.$elem.children().length === 0) {                  // 1399
                base.$elem.append(htmlString);                         // 1400
                base.setVars();                                        // 1401
                return false;                                          // 1402
            }                                                          //
            base.unWrap();                                             // 1404
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;                                         // 1406
            } else {                                                   //
                position = targetPosition;                             // 1408
            }                                                          //
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);              // 1411
            } else {                                                   //
                base.$userItems.eq(position).before(htmlString);       // 1413
            }                                                          //
                                                                       //
            base.setVars();                                            // 1416
        },                                                             //
                                                                       //
        removeItem: function (targetPosition) {                        // 1419
            var base = this,                                           // 1420
                position;                                              //
                                                                       //
            if (base.$elem.children().length === 0) {                  // 1423
                return false;                                          // 1424
            }                                                          //
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;                                         // 1427
            } else {                                                   //
                position = targetPosition;                             // 1429
            }                                                          //
                                                                       //
            base.unWrap();                                             // 1432
            base.$userItems.eq(position).remove();                     // 1433
            base.setVars();                                            // 1434
        }                                                              //
                                                                       //
    };                                                                 //
                                                                       //
    $.fn.owlCarousel = function (options) {                            // 1439
        return this.each(function () {                                 // 1440
            if ($(this).data("owl-init") === true) {                   // 1441
                return false;                                          // 1442
            }                                                          //
            $(this).data("owl-init", true);                            // 1444
            var carousel = Object.create(Carousel);                    // 1445
            carousel.init(options, this);                              // 1446
            $.data(this, "owlCarousel", carousel);                     // 1447
        });                                                            //
    };                                                                 //
                                                                       //
    $.fn.owlCarousel.options = {                                       // 1451
                                                                       //
        items: 5,                                                      // 1453
        itemsCustom: false,                                            // 1454
        itemsDesktop: [1199, 4],                                       // 1455
        itemsDesktopSmall: [979, 3],                                   // 1456
        itemsTablet: [768, 2],                                         // 1457
        itemsTabletSmall: false,                                       // 1458
        itemsMobile: [479, 1],                                         // 1459
        singleItem: false,                                             // 1460
        itemsScaleUp: false,                                           // 1461
                                                                       //
        slideSpeed: 200,                                               // 1463
        paginationSpeed: 800,                                          // 1464
        rewindSpeed: 1000,                                             // 1465
                                                                       //
        autoPlay: false,                                               // 1467
        stopOnHover: false,                                            // 1468
                                                                       //
        navigation: false,                                             // 1470
        navigationText: ["prev", "next"],                              // 1471
        rewindNav: true,                                               // 1472
        scrollPerPage: false,                                          // 1473
                                                                       //
        pagination: true,                                              // 1475
        paginationNumbers: false,                                      // 1476
                                                                       //
        responsive: true,                                              // 1478
        responsiveRefreshRate: 200,                                    // 1479
        responsiveBaseWidth: window,                                   // 1480
                                                                       //
        baseClass: "owl-carousel",                                     // 1482
        theme: "owl-theme",                                            // 1483
                                                                       //
        lazyLoad: false,                                               // 1485
        lazyFollow: true,                                              // 1486
        lazyEffect: "fade",                                            // 1487
                                                                       //
        autoHeight: false,                                             // 1489
                                                                       //
        jsonPath: false,                                               // 1491
        jsonSuccess: false,                                            // 1492
                                                                       //
        dragBeforeAnimFinish: true,                                    // 1494
        mouseDrag: true,                                               // 1495
        touchDrag: true,                                               // 1496
                                                                       //
        addClassActive: false,                                         // 1498
        transitionStyle: false,                                        // 1499
                                                                       //
        beforeUpdate: false,                                           // 1501
        afterUpdate: false,                                            // 1502
        beforeInit: false,                                             // 1503
        afterInit: false,                                              // 1504
        beforeMove: false,                                             // 1505
        afterMove: false,                                              // 1506
        afterAction: false,                                            // 1507
        startDragging: false,                                          // 1508
        afterLazyLoad: false                                           // 1509
    };                                                                 //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
