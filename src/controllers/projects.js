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
    let { category } = req.query;

    locals.category = category;

    let name = projectName;
    if(name !== 'Alcatel-Lucent' 
    && name !== 'Dwight-Englewood-School-STEM-Building'
    && name !== 'Merck-12') {
        projectName = projectName.replace(/-/g, ' ');
    }

    let Project = keystone.list('Project').model;
    let currentProject,
        allCategories = [];
    Project
        .findOne()
        .where('name', projectName)
        .exec()
        .then(project => {
            locals.project = project; // expose project obj to view
            currentProject = project;
            let { category } = project;
            let queries = [];
            let categoryTypes = ['Rainscreen', 'Restoration', 'Industrial', 'Education', 'Commercial'];
            categoryTypes.forEach(type => {
                if(category[type]) {
                    let key = `category.${type}`;
                    queries.push({ [key]: true });
                    allCategories.push(type);
                }
            })
            return Project
                .find({ $or: queries }) // returns all projects with matching categories
                .exec()
        })
        .then(projects => {
            // calculate next/prev projects to pass into view
            const { nextProj, prevProj } = getPrevNextProjects(projects, currentProject);

            // remove current project from list
            projects = projects.filter(proj => proj.name !== currentProject.name); 

            locals.project_list = projects; // expose projects with matching category types to view
            locals.project_controls = { nextProj, prevProj, allCategories };
            // Render projects VIEW
            view.render('project');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns urls for projects before and after current project
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getPrevNextProjects(projects, currentProject) {
    let index = 0;
    for(let i=0; i<projects.lengthl; i++) {
        if(projects[i].name === currentProject.name) {
            index = i;
            break;
        }
    }
    let nextProj = projects[index + 1] || projects[0]; // if end is met, return to the beginning
    let prevProj = projects[index - 1] || projects[projects.length - 1]; // if first member, return last member
    // infinite carousel 
    nextProj = nextProj.getURL() // link to next project page
    prevProj = prevProj.getURL() // link to previous project page
    currentProject: currentProject.getURL()

    // console.log({currentProject, nextProj, prevProj});
    // console.log('index: ', index);
    return { nextProj, prevProj };
}


