// Generated by CoffeeScript 1.6.3
(function() {
  requirejs.config({
    paths: {
      "jquery": "../vendor/jquery/dist/jquery.min",
      "underscore": "../vendor/underscore/underscore",
      "backbone": "../vendor/backbone/backbone"
    }
  });

  require(["underscore", "backbone", "modules/router", "models/list", "views/userlist", "views/edituser"], function(_, Backbone, Router, List, UserList, EditUser) {
    var edit_user, router, user_list;
    user_list = new UserList({
      model: new List
    });
    edit_user = new EditUser;
    router = new Router;
    router.on("route:home", function() {
      return user_list.render();
    });
    router.on("route:editUser", function() {
      return edit_user.render();
    });
    return Backbone.history.start();
  });

}).call(this);