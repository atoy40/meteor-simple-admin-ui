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
        label: "Username"
      },
      {
        key: 'profile.name',
        label: "Name"
      },
      {
        key: 'roles',
        label: "Roles",
        fn: function(value) {
          if (_.isArray(value) && value.length > 0) {
            var roles = _.sortBy(value, function(val) { return val; });
            var html = Template.sauRolesColumn({ roles: roles });
            return new Handlebars.SafeString(html);
          } else {
            return "no role";
          }
        }
      },
      {
        key: 'emails',
        label: "Addresses",
        fn: function(value) {
          if (_.isArray(value) && value.length > 0) {
            return _.map(value, function(val) { return val.address; });
          } else {
            return "no email";
          }
        }
      }
    ],
    attrs:  { 'user-id': '_id' }
  };
};

Template.sauAddroles.events({
  'submit form': function(e) {
    e.preventDefault();

    var rolename = $(e.currentTarget).find("[name=rolename]");

    Meteor.call('createRole', rolename.val(), function(error) {
      if (!error) rolename.val("");
    });
  }
});

Template.sauAffectrole.roles = function() {
  return Meteor.roles.find();
}

Template.sauAffectrole.users = function() {
  return Meteor.users.find();
}

Template.sauAffectrole.events({
  'submit form': function(e) {
    e.preventDefault();
    Meteor.call('addToRole',
                $(e.currentTarget).find("[name=users]").val(),
                $(e.currentTarget).find("[name=roles]").val()
               );
  }
});

Template.sauRolesColumn.events({
  'click .remove-role': function(e) {
    var role = this;
    var userid = $(e.currentTarget).closest('tr').attr('user-id');
    Meteor.call('removeFromRole', userid, role.valueOf());
  }
});