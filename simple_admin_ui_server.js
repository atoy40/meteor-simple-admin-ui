Meteor.publish("allUsers", function() {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find({}, {sort: {'profile.name': 1}});
  }

  return null;
});

Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});