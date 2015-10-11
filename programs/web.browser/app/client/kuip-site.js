(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/kuip-site.js                                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
syncPosition = function (el) {                                         // 2
  var current = this.currentItem;                                      // 3
  $("#sync2").find(".owl-item").removeClass("synced").eq(current).addClass("synced");
  if ($("#sync2").data("owlCarousel") !== undefined) {                 // 9
    center(current);                                                   // 10
  }                                                                    //
};                                                                     //
                                                                       //
center = function (number) {                                           // 14
  var sync2visible = sync2.data("owlCarousel").owl.visibleItems;       // 15
  var num = number;                                                    // 16
  var found = false;                                                   // 17
  for (var i in babelHelpers.sanitizeForInObject(sync2visible)) {      // 18
    if (num === sync2visible[i]) {                                     // 19
      var found = true;                                                // 20
    }                                                                  //
  }                                                                    //
                                                                       //
  if (found === false) {                                               // 24
    if (num > sync2visible[sync2visible.length - 1]) {                 // 25
      sync2.trigger("owl.goTo", num - sync2visible.length + 2);        // 26
    } else {                                                           //
      if (num - 1 === -1) {                                            // 28
        num = 0;                                                       // 29
      }                                                                //
      sync2.trigger("owl.goTo", num);                                  // 31
    }                                                                  //
  } else if (num === sync2visible[sync2visible.length - 1]) {          //
    sync2.trigger("owl.goTo", sync2visible[1]);                        // 34
  } else if (num === sync2visible[0]) {                                //
    sync2.trigger("owl.goTo", num - 1);                                // 36
  }                                                                    //
};                                                                     //
                                                                       //
progressRun = function () {                                            // 42
  //var horse= $(".horse")                                             //
  //horse.css({left: initTime+"%"})                                    //
  console.log('progressRun');                                          // 45
  tick = setInterval(interval, 10);                                    // 46
};                                                                     //
                                                                       //
interval = function () {                                               // 49
  var horse = $(".horse");                                             // 50
  //alert("f")                                                         //
  if (percentTime > 80) {                                              // 52
    percentTime = initTime;                                            // 53
    $("#sync1").data('owlCarousel').next();                            // 54
  }                                                                    //
  percentTime += 2000 / time;                                          // 56
  horse.css({ left: percentTime + "%" });                              // 57
};                                                                     //
                                                                       //
var initTime = -15,                                                    // 61
    percentTime = initTime,                                            //
    time = 10000;                                                      //
var sync1, sync2;                                                      // 62
                                                                       //
Template.carousel.onRendered(function () {                             // 64
                                                                       //
  sync1 = $("#sync1");                                                 // 66
  sync2 = $("#sync2");                                                 // 67
                                                                       //
  $("#sync1 .item").append('<img class="horse" src="run.svg" >');      // 69
                                                                       //
  sync1.owlCarousel({                                                  // 71
    singleItem: true,                                                  // 72
    autoPlay: time,                                                    // 73
    slideSpeed: 1000,                                                  // 74
    //navigation: true,                                                //
    pagination: false,                                                 // 76
    afterAction: syncPosition,                                         // 77
    responsiveRefreshRate: 200,                                        // 78
    afterInit: progressRun                                             // 79
  });                                                                  //
                                                                       //
  sync2.owlCarousel({                                                  // 83
    items: 7,                                                          // 84
    itemsDesktop: [1199, 7],                                           // 85
    itemsDesktopSmall: [979, 6],                                       // 86
    itemsTablet: [768, 4],                                             // 87
    itemsMobile: [479, 2],                                             // 88
    pagination: true,                                                  // 89
    responsiveRefreshRate: 100,                                        // 90
    afterInit: function (el) {                                         // 91
      el.find(".owl-item").eq(0).addClass("synced");                   // 92
    }                                                                  //
  });                                                                  //
                                                                       //
  $("#sync2").on("click", ".owl-item", function (e) {                  // 97
    e.preventDefault();                                                // 98
    var number = $(this).data("owlItem");                              // 99
    sync1.trigger("owl.goTo", number);                                 // 100
  });                                                                  //
  /*                                                                   //
  this.autorun(function() {                                            //
    var win = Session.get("window")                                    //
    var w = Math.min(win.w,win.sw)                                     //
    if(w <= 768)                                                       //
      $('.content').css('width', '100%')                               //
    else if(w <= 979)                                                  //
      $('.content').css('width', '80%')                                //
    else if(w <= 1199)                                                 //
      $('.content').css('width', '65%')                                //
    else                                                               //
      $('.content').css('width', '50%')                                //
    //$('.stage').css('height', win.h+'px')                            //
  })*/                                                                 //
});                                                                    //
                                                                       //
Template.navbar.onRendered(function () {                               // 119
  $('.sticky').sticky();                                               // 120
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
