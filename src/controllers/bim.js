let keystone = require('keystone');

exports = module.exports = (req, res) => {

    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'bim';

    let BimModel = keystone.list('BimModel').model;
    BimModel 
        .find()
        .exec()
        .then(models => {
            locals.models = models;
            view.render('bim');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
};

exports.getBIMExample = (req, res) => {
    let view   = new keystone.View(req, res);
    let locals = res.locals;

    const { model } = req.params;

    locals.section = 'bim';
    locals.model = model;

    let BimModel = keystone.list('BimModel').model;
    BimModel 
        .find()
        .exec()
        .then(models => {
            locals.models = models;
            view.render('model');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
}
