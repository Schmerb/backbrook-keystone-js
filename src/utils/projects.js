let categories = [
    {
        type: "ALL PROJECTS",
        url: "/projects/all",
        slug: "all",
        image: "/assets/images/compressed/categories/allprojects.jpg",
        description: "From office buildings to stadium arenas, we adapt to our clients' needs."
    },
    {
        type: "COMMERCIAL",
        url: "/projects/commercial",
        slug: "commercial",
        image: "/assets/images/compressed/categories/commercial.jpg",
        description: "From office buildings to stadium arenas, we adapt to our clients' needs."
    },
    {
        type: "EDUCATION",
        url: "/projects/education",
        slug: "education",
        image: "/assets/images/compressed/categories/education.jpg",
        description: "From office buildings to stadium arenas, we adapt to our clients' needs."
    },
    {
        type: "INDUSTRIAL",
        url: "/projects/industrial",
        slug: "industrial",
        image: "/assets/images/compressed/categories/industrial.jpg",
        description: "From office buildings to stadium arenas, we adapt to our clients' needs."
    },
    {
        type: "RAINSCREEN",
        url: "/projects/rainscreen",
        slug: "rainscreen",
        image: "/assets/images/compressed/categories/rainscreen.jpg",
        description: "From office buildings to stadium arenas, we adapt to our clients' needs."
    },
    {
        type: "RESTORATION",
        url: "/projects/restoration",
        slug: "restoration",
        image: "/assets/images/compressed/categories/restoration.jpeg",
        description: "From office buildings to stadium arenas, we adapt to our clients' needs."
    }
];

let projects = [
    {
        name: 'Newark South Ward 5th Police Precinct',
        industry: 'Commercial',
        client: 'Epic Management, Inc',
        date_completed: new Date(),
        url: '/projects/commercial/south-ward-police-precinct',
        image: '/assets/images/compressed/projects/bbm-1.jpg',
        description: "Student dormatories for Rutgers University",
        highlight: "When the original contracted masonry sub-contractor went bankrupt leaving the General Contractor in a bind, the GC called on Back Brook Masonry to complete the project. With only 70% of the interior completed and the entire exterior façade untouched, and months behind schedule, Back Brook Masonry mobilized immediately and has successfully managed the project’s masonry work to substantial completion. In addition to a timely installation effort, Back Brook Masonry has saved the General Contractor in excess of $100,000 through improved material purchasing and by engineering a smarter and more economical solution to the thin limestone material and anchorage system.",
        quote: "We called Back Brook Masonry on Wednesday and met with Michael and his team that afternoon and by Friday they were up and running full speed! The masonry work was completed very quickly, with high quality! Back Brook Masonry is a professional contractor that certainly was a pleasure to deal with! \nBack Brook Masonry also, after reviewing the material submissions, insisted on changing the limestone and limestone anchorage system on the project. They prepared new submittals, samples and engineering and were successful in gaining approval of the new product and anchorage system. Their change in material and design resulted not only in a beautiful stone façade, but also realized approximately $90,000 in savings!",
        quoteAuthor: "Bill Perlack, Project Manager"
    },
    {
        name: 'Rutgers Livingston Campus Housing',
        industry: 'Education',
        client: 'Turner Construction',
        date_completed: new Date(),
        url: '/projects/commercial/rutgers-dorms',
        image: '/assets/images/compressed/projects/bbm-1.jpg',
        description: "Student dormatories for Rutgers University",
        highlight: "The largest masonry project on-going in the state of New Jersey was entrusted to Back Brook Masonry in February, 2011. This 4-building dormitory campus consists of 150,000 structural concrete masonry unit shear walls and more than 225,000 SF of exterior facebrick and stone walls. The masonry work is well underway with completion scheduled for early 2012.",
        quote: "",
        quoteAuthor: ""
    },
    {
        name: 'St. Barnabus Medical Center, Western Expansion',
        industry: 'Commercial',
        client: 'Turner Construction',
        date_completed: new Date(),
        url: '/projects/commercial/st-barnabus',
        image: '/assets/images/compressed/projects/bbm-1.jpg',
        description: "Western Expansion for St. Barnabus Medical Center",
        highlight: "Morbi metus diam, efficitur id urna eget, hendrerit elementum orci. Etiam nec finibus nisi. Cras tincidunt varius ultrices. Etiam eget dapibus velit. Vivamus fermentum vitae dolor quis efficitur. Morbi non nunc finibus, luctus orci et, dignissim tellus. Aenean et dui convallis, dapibus odio ac, pulvinar lectus.",
        quote: "Pellentesque volutpat lacus ut ipsum tempor scelerisque. Vestibulum rutrum congue consectetur.",
        quoteAuthor: "Mike Schmerbeck"
    },
    {
        name: 'Natirar Mansion Cleaning',
        industry: 'Education',
        client: 'Natirar',
        date_completed: new Date(),
        url: '/projects/commercial/natirar-mansion',
        image: '/assets/images/compressed/projects/bbm-1.jpg',
        description: "",
        highlight: "When the owner of the new Virgin Spa Resort in Peapack, New Jersey needed to help restore the existing 100 year old mansion to it’s original splendor, he called on Back Brook Masonry to do the job! With the assistance of the scientist from EaCo Chem, Inc., we utilized various proprietary cleaning products and techniques to rid the exterior facebrick, limestone and granite of the dirt, grime and stains that have built up over the past century.",
        quote: "Back Brook Masonry did an excellent job in cleaning the more than 100 year old façade of the “Mansion House” and surrounding site walls restoring the luster and charm of the masonry facades just in time for our Wedding season. A job well done! \nWe appreciate the skill, care and professionalism Back Brook masonry exercised when working on our facility to insure no damage occurred to the brick and stone facades. The results were magnificent!",
        quoteAuthor: "Lee Chasalow, GM"
    },
];

module.exports = { categories, projects };