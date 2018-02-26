/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone 	   = require('keystone');
const middleware   = require('./middleware');
const importRoutes = keystone.importer(__dirname);

let apiHandlers = require('./api/project');
// Import Route Controllers
let routes = {
	views: importRoutes('../controllers/'),
};


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

	app.get('/about-us', 	  	       routes.views['about-us']);
	app.get('/about-us/meet-our-team', routes.views['about-us'].getTeam);
	app.get('/about-us/safety',        routes.views['about-us']);
	app.get('/about-us/bonding',       routes.views['about-us']);
	app.get('/about-us/genesis-of-the-backbrook-name', routes.views['about-us']);
	app.get('/about-us/jesus-was-a-stone-mason', routes.views['about-us']);
	app.get('/about-us/:employee',     routes.views['about-us']);

	app.get('/bim', routes.views.bim);

	app.get('/projects', routes.views.categories);
	app.get('/projects/categories/:categoryType', routes.views.projects.getCategoryProjects);
	app.get('/projects/:projectName', routes.views.projects.getProject);

	app.get('/trust-respect', routes.views['trust-respect']);

	app.get('/contact-us', routes.views.contact);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	// API Routes
	app.get('/api/project', apiHandlers.getProjects);
};
