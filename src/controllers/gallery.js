let keystone = require('keystone');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	// Set locals
	locals.section = 'gallery';

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

	// Render the view
	view.render('gallery');

};
