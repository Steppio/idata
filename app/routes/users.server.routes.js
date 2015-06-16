var users = require('../../app/controllers/users.server.controller')
	, passport = require('passport');

module.exports = function(app) {
	app.route('/signup').get(users.renderSignup).post(users.signup);

	app.route('/signin').get(users.renderSignin).post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true
	}));

	app.get('/signout', users.signout);

	app.route('/users').post(users.create).get(users.list);

	app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

	// due to the parameter being set above, the param() method runs the userById middleware before anything else
	// a parameter in a route is always set with a colon before it
	app.param('userId', users.userById);

	// app.get('/oauth/facebook', passport.authenticate('facebook', {
	// 	failureRedirect: '/signin'
	// }));

	// app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
	// 	failureRedirect: '/signin',
	// 	successRedirect: '/'
	// }));
};