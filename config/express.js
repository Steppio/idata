var config = require('./config')
	, express = require('express')
	, sassMiddleware = require('node-sass-middleware')
	, morgan = require('morgan')
	, compress = require('compression')
	, path = require('path')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, session = require('express-session')
	, flash = require('connect-flash')
	, passport = require('passport')
	, favicon = require('serve-favicon');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	var srcPath = path.join(__dirname, '../public/sass');
	var destPath = path.join(__dirname, '../public');

	// app.use(express.favicon(__dirname, '/public/favicon.ico'));

	console.log('srcPath: ' + srcPath);
	console.log('destPath: ' + destPath);
	console.log('static: ' + path.join(__dirname, '../public'));

	app.use(sassMiddleware({
		src: srcPath,
		dest: destPath,
		debug: true,
		outputStyle: 'compressed'
	}));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.static('./public'));
	app.use(favicon(path.join(__dirname,'../public','favicon.ico')));
	// app.use(favicon(__dirname + './public/favicon.ico'));

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	return app;
};