var keystone = require('keystone');

exports = module.exports = (req, res) => {

    var view   = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'projects';

    var Project = keystone.list('Project').model;
    Project.find().exec((err, data) => {
        locals.project_list = data;

        view.render('project');
    });
};


