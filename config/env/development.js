module.exports = {
	// Development configuration options
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'developmentSessionSecret',

	facebook: {
		clientID: '609017362573631',
		clientSecret: '950440ab9547c72bcb965536e4e32ef3',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}
};