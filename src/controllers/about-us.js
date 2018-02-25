const keystone  = require('keystone');

exports = module.exports = (req, res) => {
    
    let view   = new keystone.View(req, res);
    let locals = res.locals;
    let url = req.originalUrl;

    locals.section = url;
    
    if(url === "/about-us/meet-our-team") {
        let Employee = keystone.list('Employee').model;
        Employee.find().exec((err, data) => {
            locals.employees = data;
            view.render('about-us');
        });
    } else {
        view.render('about-us');
    }
};


