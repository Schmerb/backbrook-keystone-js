const keystone = require('keystone');

let Types = keystone.Field.Types;
let Resume = new keystone.List('Resume');

Resume.add({
    name: { 
        type: Types.Text, 
        initial: true, 
        required: true 
    },
    jobTitle: {
        type: Types.Text,
        initial: true,
        required: true
    },
    imgUrl: {
        type: Types.Text,
        initial: true,
        required: true
    },
    items: {
        type: Types.TextArray,
        initial: true, 
        required: true 
    }
});

Resume.register();