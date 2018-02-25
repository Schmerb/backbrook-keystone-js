let keystone = require('keystone');

let Types = keystone.Field.Types;
let Category = new keystone.List('Category');

Category.add({
    categoryType: {
        type: Types.Text,
        initial: true,
        required: true
    },
    url: {
        type: Types.Text,
        initial: true,
        required: true
    },
    slug: {
        type: Types.Text,
        initial: true,
        required: true
    },
    image: {
        type: Types.Text,
        initial: true,
        required: true
    },
    description: {
        type: Types.Text,
        initial: true,
        required: true
    }
});

Category.register();