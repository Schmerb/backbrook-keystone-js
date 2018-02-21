const keystone  = require('keystone');

exports = module.exports = (req, res) => {
    
    var view   = new keystone.View(req, res);
    var locals = res.locals;
    var url = req.originalUrl;

    locals.section = url;
    
    if(url === "/about-us/meet-our-team") {
        var Employee = keystone.list('Employee').model;
        Employee.find().exec((err, data) => {
            locals.employees = data;
            view.render('about-us');
        });
    } else {
        view.render('about-us');
    }
};


