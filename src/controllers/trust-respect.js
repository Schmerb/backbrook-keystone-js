let keystone = require('keystone');

exports = module.exports = (req, res) => {

    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'trust-respect';

    let Testimonial = keystone.list('Testimonial').model;
    Testimonial
        .find()
        .exec()
        .then(testimonials => {
            locals.testimonials = testimonials;
            view.render('trust-respect');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
};
