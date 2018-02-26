let keystone = require('keystone');

exports = module.exports = (req, res) => {

    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'bim';


    view.render('bim');
};

exports.getBIMExample = (req, res) => {
    let view   = new keystone.View(req, res);
    let locals = res.locals;

    const { model } = req.params;

    locals.section = 'bim';
    locals.model = model;

    view.render('model');
}
