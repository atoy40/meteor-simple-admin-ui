Meteor.methods({
  createUser: function(username, password, email) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(403, "Not authorized");
    
    Accounts.createUser({username: username, email: email, password: password});
  },
  createRole: function(name) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(403, "Not authorized");

    Roles.createRole(name);
  },
  addToRole: function(userid, role) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(403, "Not authorized");

    Roles.addUsersToRoles(userid, role);
  },
  removeFromRole: function(userid, role) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(403, "Not authorized");

    Roles.removeUsersFromRoles(userid, role);
  }
});