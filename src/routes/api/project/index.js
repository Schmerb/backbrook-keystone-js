var keystone = require('keystone');
var Project  = keystone.list('Project').model;

var handlers = {
    getProjects: (req, res) => {
        Project
            .find()
            .exec()
            .then(projects => {
                res.status(200).json({ projects: projects });
            })
            .catch(err => res.status(500).json({message: 'Internal server error', err}));
    }
}
module.exports = handlers;