(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/startup.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
  $(window).resize(function (evt) {                                    // 2
    Session.set("window", { w: $(window).width(), h: $(window).height(), sw: screen.width, sh: screen.height });
  });                                                                  //
});                                                                    //
                                                                       //
Session.set("window", { w: $(window).width(), h: $(window).height(), sw: screen.width, sh: screen.height });
/////////////////////////////////////////////////////////////////////////

}).call(this);
