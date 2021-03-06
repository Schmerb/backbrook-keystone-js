const keystone = require('keystone');
const formatCurrency = require('format-currency');

// - - - - - - - - - - - - - - - - - - - - - -
// Gets all projects for a specific category
// - - - - - - - - - - - - - - - - - - - - - -
exports.getCategoryProjects = (req, res) => {
    let view   = new keystone.View(req, res);
    let locals = res.locals;

    locals.section = 'projects';

    let { categoryType } = req.params;
    console.log({categoryType});

    let Project  = keystone.list('Project').model,
        Category = keystone.list('Category').model;

    let categories, 
        categoryObj;
    Category
        .find()
        .sort({'categoryType': 1}) // sort alphabetically
        .exec()
        .then(_categories => {
            categories = _categories; 
            return Category
                .findOne()
                .where('slug', categoryType)
                .exec()
        })
        .then(_categoryObj => {
            categoryObj = _categoryObj; 
            if(categoryType === 'all') {
                return Project
                    .find()
                    .sort({completed_date: -1})
                    .exec(); // return all projects
            }
            return Project
                .find()
                .where(`category.${categoryObj.categoryType}`, true)
                .sort({completed_date: -1})
                .exec();
        })
        .then(projects => {
            // expose vars to local view
            locals.category_list = categories;
            locals.categoryObj   = categoryObj;
            locals.project_list  = projects; // expose projects

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
    
    let { projectName } = req.params;
    let { category } = req.query;
    
    locals.section = 'projects';
    locals.category = category;

    projectName = getCorrectProjectName(projectName);

    console.log({projectName});

    let Project = keystone.list('Project').model;
    let currentProject;
    Project
        .findOne()
        .where('name', projectName)
        .exec()
        .then(project => {
            currentProject = project;
            if(category === 'all') {
                return Project
                    .find()
                    .exec()
            }
            let query = `category.${category.slice(0,1).toUpperCase()}${category.slice(1)}`;
            return Project
                .find()
                .where(query, true)
                .exec()
        })
        .then(projects => {
            // calculate next/prev projects to pass into view
            const { nextProj, prevProj } = getPrevNextProjects(projects, currentProject, category);
            
            // remove current project from list
            projects = projects.filter(proj => proj.name !== currentProject.name); 

            // expose variables in local view
            locals.project          = currentProject; // expose project obj to view
            locals.formattedValue   = currentProject.getValue(); // exposes formatted value of project in USD
            locals.project_list     = projects; // expose projects with matching category types to view
            locals.project_controls = { nextProj, prevProj };
            // Render projects VIEW
            view.render('project');
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns urls for projects before and after current project
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getPrevNextProjects(projects, currentProject, category) {
    let index = 0;
    for(let i=0; i<projects.length; i++) {
        if(projects[i].name === currentProject.name) {
            index = i;
            break;
        }
    }

    let nextProj = projects[index + 1] || projects[0]; // if end is met, return to the beginning
    let prevProj = projects[index - 1] || projects[projects.length - 1]; // if first member, return last member
    // infinite carousel 
    nextProj = nextProj.getURL() + '?category=' + category // link to next project page
    prevProj = prevProj.getURL() + '?category=' + category  // link to previous project page

    return { nextProj, prevProj };
}

function getCorrectProjectName(name) {
    if (name === 'Dwight-Englewood-School-STEM-Building') {
        return 'Dwight-Englewood School STEM Building';
    }
    if(name !== 'Alcatel-Lucent' 
    && name !== 'Merck-12') {
        name = name.replace(/-/g, ' ');
        name = name.replace(/=/g, '#');
    }

    return name;
}


