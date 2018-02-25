const keystone = require('keystone');


// - - - - - - - - - - - - - - - - - - - - - -
// Gets all projects for a specific category
// - - - - - - - - - - - - - - - - - - - - - -
exports.getCategoryProjects = (req, res) => {
    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'projects';

    let { categoryType } = req.params;

    let Project  = keystone.list('Project').model;
    let Category = keystone.list('Category').model;
    Category
        .find()
        .exec()
        .then(categories => {
            locals.category_list = categories; // expose categories
            return Category
                .findOne()
                .where('slug', categoryType)
                .exec()
        })
        .then(categoryObj => {
            locals.categoryObj = categoryObj; // expose category object
            if(categoryType === 'all') {
                return Project
                    .find()
                    .exec(); // return all projects
            }
            return Project
                .find()
                .where(`category.${categoryObj.categoryType}`, true)
                .exec();
        })
        .then(projects => {
            locals.project_list = projects; // expose projects

            // Render category VIEW
            view.render('category');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
}

// - - - - - - - - - - - - - - - - - - - - - -
// Gets a specific project
// - - - - - - - - - - - - - - - - - - - - - -
exports.getProject = (req, res) => {
    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'projects';

    let { projectName } = req.params;

    projectName = projectName.replace(/-/g, ' ');

    let Project = keystone.list('Project').model;
    Project
        .find()
        .where('name', projectName)
        .exec()
        .then(project => {

            locals.project = project;
        
            // TODO: Calculate next/prev projects to pass into view


            // Render projects VIEW
            view.render('projects');
        })

}


