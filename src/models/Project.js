const keystone = require('keystone');
const formatCurrency = require('format-currency');

let Types = keystone.Field.Types;
let Project = new keystone.List('Project');

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
        type: Types.Money, format: '$0,0.00',
        initial: true, 
        required: true 
    },
    highlights: {
        type: Types.Textarea, 
        height: 200,
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
    image: {
        type: Types.CloudinaryImage, 
        select : true,
        width: 400,
        height: 300,
        initial: true,
        required: true
    },
    completed_date: {
        type: Types.Date, 
        default: Date.now, 
        initial: true,
        required: true
    }
});

// return correct url format for project
Project.schema.methods.getURL = function() {
    let name = this.name.replace(/ /g, '-');
    name = name.replace(/#/g, '=');
    return `/projects/${name}`;
}

Project.schema.methods.getValue = function() {
    let opts = { format: '%s%v', code: '', symbol: '$' };
    let formattedValue = formatCurrency(this.value, opts);
    return formattedValue.slice(0,-3);
}

Project.register();