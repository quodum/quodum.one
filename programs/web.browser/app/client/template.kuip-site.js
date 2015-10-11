(function(){
Template.__checkName("header");
Template["header"] = new Template("Template.header", (function() {
  var view = this;
  return "";
}));

Template.__checkName("navbar");
Template["navbar"] = new Template("Template.navbar", (function() {
  var view = this;
  return HTML.Raw('<div class="ui sticky fixed bottom center aligned" style="right:0px;left:0px;text-align:center;">\n    <div class="ui three item inverted grey menu">\n      <a class="active item">\n        <img class="ui tiny image" src="http://oroboro-oroboro.rhcloud.com/file/E7gtNbP9NfKLWt6iw/0.05">\n        <!--<img class="ui tiny image" src="http://oroboro-oroboro.rhcloud.com/file/xvuWirTu7AvYprzzK/0.05">-->\n      </a>\n      <a class="item" href="#services">Services</a>\n      <a class="item" href="#contact">Contact</a>\n    </div>\n  </div>');
}));

Template.__checkName("footer");
Template["footer"] = new Template("Template.footer", (function() {
  var view = this;
  return "";
}));

Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("carousel")), "\n  ", Spacebars.include(view.lookupTemplate("services")), "\n  ", Spacebars.include(view.lookupTemplate("contact")) ];
}));

Template.__checkName("carousel");
Template["carousel"] = new Template("Template.carousel", (function() {
  var view = this;
  return HTML.Raw('<div class="content">\n\n  <div id="sync1" class="owl-carousel">\n    <div class="item">\n      <a href="http://owlgraphic.com/owlcarousel/demos/sync.html" target="_blank"><img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/DSTH6LATvdPaBTBHD"></a>\n      \n    </div>\n    <div class="item">\n      <a href="http://owlgraphic.com/owlcarousel/demos/sync.html" target="_blank"><img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/Gi4Hk42DwQ7hEkWJW"></a>\n    </div>\n    <div class="item">\n      <a href="http://orobo.go.ro:4500/prev/j9SLxp3ffTWwGJkTY" target="_blank">\n      <img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/8F8xZdTH3cR3sCkC7">\n    </a>\n    </div>\n    <div class="item">\n      <img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/uNavXWyQpL27iqmxs">\n    </div>\n    <div class="item">\n      <a href="https://vimeo.com/129704353" target="_blank">\n      <img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/Zs6r8kFHXtsFu89JB">\n    </a>\n    </div>\n    <div class="item">\n      <img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/oqHzDWD8ghTvurt2i">\n    </div>\n    <div class="item">\n      <a href="https://vimeo.com/129704353" target="_blank">\n      <img class="stage" src="http://oroboro-oroboro.rhcloud.com/file/uKrNHyXAogKvr3ruK">\n    </a>\n    </div>\n  </div>\n  <div class="content2">\n  <div id="sync2" class="owl-carousel">\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/DSTH6LATvdPaBTBHD/0.05">\n    </div>\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/Gi4Hk42DwQ7hEkWJW/0.05">\n    </div>\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/8F8xZdTH3cR3sCkC7/0.05">\n    </div>\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/uNavXWyQpL27iqmxs/0.05">\n    </div>\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/Zs6r8kFHXtsFu89JB/0.05">\n    </div>\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/oqHzDWD8ghTvurt2i/0.05">\n    </div>\n    <div class="item">\n      <img src="http://oroboro-oroboro.rhcloud.com/file/uKrNHyXAogKvr3ruK/0.05">\n    </div>\n  </div>\n  </div>\n  </div>');
}));

Template.__checkName("services");
Template["services"] = new Template("Template.services", (function() {
  var view = this;
  return HTML.Raw('<a name="services">\n    <div class="ui horizontal divider">\n      Services\n    </div>\n  </a>\n\n  <div class="ui one column wide grid items container">\n    <div class="item">\n      <div class="ui large image">\n        <img src="http://oroboro-oroboro.rhcloud.com/file/TXx6LvjycGttc6Pba">\n      </div>\n      <div class="content">\n        <a><div class="ui huge header">Specs Consultancy</div></a>\n        <div class="meta bigtext">\n          <p>Tired of inextensible projects and personally training project new-commers ?</p>\n          <p>We offer consultancy on creating UML and API specifications for your project. </p>\n          <p> Heck! We have made our own UML editor in SVG and Meteor and have our own <a class="ui link" href="http://orobo.go.ro:4500/prev/j9SLxp3ffTWwGJkTY" target="_blank">UML for project tackling.</a></p>\n        </div>\n      </div>\n    </div>\n    <div class="item" style="margin-top: 60px !important;">\n      <div class="ui large image">\n        <img src="/images/meteor-logo.png">\n      </div>\n      <div class="content">\n        <a class="ui link" href="https://www.meteor.com/" target="_blank"><div class="ui huge header">Meteor.JS Development</div></a>\n        <div class="meta bigtext">\n          <p>We offer Web &amp; Mobile Development in Meteor.</p>\n          <p>Why ?</p>\n          <ul>\n            <li>Fast prototyping</li>\n            <li>Full freedom</li>\n            <li>Great community</li>\n            <li>Incredible User Experience</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <div class="item" style="margin-top: 60px !important;">\n      <div class="ui large image">\n        <img src="http://oroboro-oroboro.rhcloud.com/file/SzvW7PjwnchXPFwnj">\n      </div>\n      <div class="content">\n        <a><div class="ui huge header">SVG Expertise</div></a>\n        <div class="meta bigtext">\n          <p>We programmed a complex SVG editor combining powerful SVG editing features with creating and maintaining an online database for sharing, showcasing works, live-collaboration on projects and even creating and performing tutorials and presentations. <a href="https://vimeo.com/129704353" target="_blank">Oroboro</a></p>\n          <p>We have custom algorithms for morphing, processing SVG paths</p>\n        </div>\n      </div>\n    </div>\n  </div>');
}));

Template.__checkName("contact");
Template["contact"] = new Template("Template.contact", (function() {
  var view = this;
  return HTML.Raw('<a name="contact">\n    <div class="ui horizontal divider">\n      Contact\n    </div>\n  </a>\n  <div class="ui one column wide grid center aligned container bigtext" style="display: block !important;">\n    <div><a href="mailto:kuip.ltd@gmail.com">kuip.ltd@gmail.com</a></div>\n    <br>\n    <div>18-19 College Green, Dublin 2, Ireland</div>\n  </div>\n  <br><br><br><br><br><br><br><br>');
}));

}).call(this);
