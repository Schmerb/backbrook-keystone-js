const keystone  = require('keystone');

exports = module.exports = (req, res) => {
    
    let view   = new keystone.View(req, res);
    let locals = res.locals;
    let url = req.originalUrl;

    locals.section = url;
    
    view.render('about-us');
};

exports.getTeam = (req, res) => {
    let view   = new keystone.View(req, res);
    let locals = res.locals;
    let url = req.originalUrl;
    locals.section = url;

    let Employee = keystone.list('Employee').model;

    Employee
        .find()
        .sort({'orderNum': 1})
        .exec()
        .then(employees => {
            locals.employees = employees;
            view.render('about-us');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
}


