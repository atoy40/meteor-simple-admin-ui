Meteor.methods({
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