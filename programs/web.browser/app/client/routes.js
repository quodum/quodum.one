(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/routes.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
FlowRouter.route('/', {                                                // 1
  name: 'home',                                                        // 2
  action: function () {                                                // 3
    BlazeLayout.render('layout', { main: 'home', header: 'header', footer: 'footer', navbar: 'navbar' });
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
