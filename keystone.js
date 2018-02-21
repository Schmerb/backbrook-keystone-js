// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var Twig = require('twig');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'backbrook',
	'brand': 'backbrook',

	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'src/templates/views',
	'view engine': 'twig',

	'twig options': { method: 'fs' }, 
	'custom engine': Twig.render,

	'emails': 'templates/emails',

	'mongo': process.env.MONGO_URI || "mongodb://localhost/backbrook",

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'N',
});
 
// Load your project's Models
keystone.import('src/models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('cloudinary config', process.env.CLOUDINARY_URL );
keystone.set('cookie secret',  process.env.SECRET);


// Load your project's Routes
keystone.set('routes', require('./src/routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	galleries: 'galleries',
	enquiries: 'enquiries',
	ns: 'ns',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();

//keystone/signin ADMIN UI
