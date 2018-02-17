/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'HOME', key: 'home', href: '/', pages: [
			{ label: 'Contact Us', subkey: 'contact-us', href: '/contact-us' }
		] },
		{ label: 'ABOUT US', key: 'about-us', href: '/about-us', pages: [
			{ label: 'Meet Our Team', subkey: 'meetourteam', href: '/who-we-are' },
			{ label: 'Safety', 	      subkey: 'safety', 	 href: '/who-we-are/safety' },
			{ label: 'Bonding', 	  subkey: 'bonding', 	 href: '/who-we-are/bonding' },
			{ label: 'Genesis of the Backbrook Name', subkey: 'genesis', href: '/who-we-are/genesis-of-the-name' },
			{ label: 'Jesus was a Stone Mason', 	  subkey: 'jesus',   href: '/who-we-are/jesus-was-a-stone-mason' }
		] },
		{ label: 'BIM', key: 'bim', href: '/BIM', pages: [
			{ label: 'Examples', subkey: 'examples', href: '/BIM/examples' }
		] },
		{ label: 'PROJECTS', key: 'projects', href: '/projects', pages: [
			{ label: 'By Category', subkey: 'by-category', href: '/projects' },
			{ label: 'View All', 	subkey: 'view-all',    href: '/projects/all' }
		] },
		{ label: 'TRUST & RESPECT', key: 'trust-respect', href: '/trust-respect', pages: [
			{ label: 'Clients',  	 subkey: 'clients',  	 href: '/trust-respect' },
			{ label: 'Testimonials', subkey: 'testimonials', href: '/trust-respect' }
		] },
		{ label: 'CONTACT', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
