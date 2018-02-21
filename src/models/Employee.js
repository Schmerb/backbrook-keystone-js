var keystone = require('keystone');


var Types = keystone.Field.Types;
var Employee = new keystone.List('Employee');

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
    }
});

Employee.register();
