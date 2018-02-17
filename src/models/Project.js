var keystone = require('keystone');


var Types = keystone.Field.Types;
var Project = new keystone.List('Project');


Project.add({
    name: { 
        type: Types.Text, 
        initial: true, 
        required: true 
    },
    location: {
        type: Types.Select, options: 'NJ, NY',
        initial: true, 
        required: true
    },
    client: {
        type: Types.Text, 
        initial: true, 
        required: true 
    },
    value: {
        type: Types.Money, 
        initial: true, 
        required: true 
    },
    highlights: {
        type: Types.Text, 
        initial: true, 
        required: true 
    },
    category: { 
        Commercial:  { type: Types.Boolean, initial: true },
        Education:   { type: Types.Boolean, initial: true },
        Industrial:  { type: Types.Boolean, initial: true },
        Restoration: { type: Types.Boolean, initial: true },
        Rainscreen:  { type: Types.Boolean, initial: true }
    },
    completed_date: {
        type: Types.Date, 
        default: Date.now, 
        initial: true,
        required: true
    }
});

Project.register();