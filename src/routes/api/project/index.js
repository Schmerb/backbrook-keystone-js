var keystone = require('keystone');
var Project  = keystone.list('Project').model;

var handlers = {
    getProjects: (req, res) => {
        Project.find().exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('DB Error');
            }
            res.status(200).send(data);
        });
    }
}
module.exports = handlers;