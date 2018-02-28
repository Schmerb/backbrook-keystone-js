let keystone = require('keystone');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	let officeImages = [
		'conf-room-from-front-door.jpg',
		'conf-room-facing-stairs.jpg',
		'conf-room-from-stairs.jpg',
		'wine-cellar.jpg',
		'ladies-room.jpg',
		'johnny-f-office-reduced.jpg',
		'joe-a-office.jpg',
		'hallway-to-shop-reduced.jpg',
		'front-desk-area.jpg'
	];

	locals.officeImages = officeImages;
	// Render the view
	view.render('index');
};
