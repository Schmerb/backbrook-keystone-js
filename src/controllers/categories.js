let keystone = require('keystone');

exports = module.exports = (req, res) => {

    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'categories';

    let Category = keystone.list('Category').model;
    
    Category
        .find()
        .sort({'categoryType': 1})
        .exec()
        .then(categories => {
            locals.category_list = categories;
            view.render('categories');
        });
};



