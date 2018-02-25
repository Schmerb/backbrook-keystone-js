let keystone = require('keystone');

exports = module.exports = (req, res) => {

    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'trust-respect';


    view.render('trust-respect');
};
