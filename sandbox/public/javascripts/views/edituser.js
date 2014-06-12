// Generated by CoffeeScript 1.6.3
(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    var EditUser;
    $.fn.serailizeObject = function() {
      var a, o;
      o = {};
      a = this.serializeArray();
      $.each(a, function() {
        if (o[this.name] !== void 0) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          return o[this.name].push(this.value || "");
        } else {
          return o[this.name] = this.value || "";
        }
      });
      return o;
    };
    EditUser = Backbone.View.extend({
      el: ".page",
      render: function() {
        var template;
        template = _.template($("#edit_user").html(), {});
        return this.$el.html(template);
      },
      events: {
        "submit #edit_user_form": "saveUser"
      },
      saveUser: function(e) {
        var user_creds;
        user_creds = $(e.currentTarget).serailizeObject();
        console.log(user_creds);
        return false;
      }
    });
    return EditUser;
  });

}).call(this);
