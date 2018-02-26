let keystone = require('keystone');


let Types = keystone.Field.Types;
let Employee = new keystone.List('Employee');

Employee.add({
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
    url: {
        type: Types.Text,
        initial: true,
        required: true
    },
    imgUrl: {
        type: Types.Text,
        initial: true,
        required: true
    },
    orderNum: {
        type: Types.Number,
        initial: true,
        required: true,
        note: 'Place in employee list, 1 is the first position.'
    }
});

Employee.register();
