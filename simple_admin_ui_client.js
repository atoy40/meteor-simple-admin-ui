Meteor.subscribe("allUsers");

Template.simpleAdminUi.isAdmin = function() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin']);
}

Template.simpleAdminUi.users = function() {
  return Meteor.users.find();
}

Template.simpleAdminUi.settings = function() {
  return {
    fields: [
      {
        key: 'username',
        label: i18n('sau.role.userName')
      },
      {
        key: 'profile.name',
        label: i18n('sau.role.name')
      },
      {
        key: 'roles',
        label: i18n('sau.role.roles'),
        fn: function(value) {
          if (_.isArray(value) && value.length > 0) {
            var roles = _.sortBy(value, function(val) { return val; });
            //var html = UI.renderWithData(Template.sauRolesColumn, { roles: roles });
            var html = Template.sauRolesColumn.extend({data: function () { return { roles: roles }; }})
            return new Spacebars.SafeString(UI.toHTML(html));
          } else {
            return i18n('sau.role.noRole');
          }
        }
      },
      {
        key: 'emails',
        label: i18n('sau.role.addresses'),
        fn: function(value) {
          if (_.isArray(value) && value.length > 0) {
            return _.map(value, function(val) { return val.address; });
          } else {
            return i18n('sau.role.noEmail');
          }
        }
      }
    ],
    attrs:  { 'user-id': '_id' }
  };
};

Template.sauAddRoles.events({
  'submit form': function(e) {
    e.preventDefault();

    var rolename = $(e.currentTarget).find("[name=rolename]");

    Meteor.call('createRole', rolename.val(), function(error) {
      if (!error) rolename.val("");
    });
  }
});

Template.sauAffectRole.roles = function() {
  return Meteor.roles.find();
}

Template.sauAffectRole.users = function() {
  return Meteor.users.find();
}

Template.sauAffectRole.events({
  'submit form': function(e) {
    e.preventDefault();
    Meteor.call('addToRole',
                $(e.currentTarget).find("[name=users]").val(),
                $(e.currentTarget).find("[name=roles]").val()
               );
  }
});

Template.sauRolesColumn.roleStyle = function() {
  if (this == "admin") return "danger";
  
  var style = ['default', 'primary', 'success', 'info', 'warning'];
  var hash = this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  
  return style[Math.abs(hash%5)];
}
                                  
Template.sauRolesColumn.events({
  'click .remove-role': function(e) {
    var role = this;
    var userid = $(e.currentTarget).closest('tr').attr('user-id');
    Meteor.call('removeFromRole', userid, role.valueOf());
  }
});