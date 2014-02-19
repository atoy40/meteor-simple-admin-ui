Meteor.publish("allUsers", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return 
		[
			Meteor.users.find({}, { username : 1,
								   profile : 1,
								   roles : 1,
								   emails : 1,								  
								   sort: {'profile.name': 1}}),
			Meteor.roles.find({})
		];
	}
	return null;
});