let keystone = require('keystone');

let Types = keystone.Field.Types;
let BimModel = new keystone.List('BimModel');

BimModel.add({
    name: {
        type: Types.Text,
        initial: true,
        required: true
    },
    autodeskUrl: {
        type: Types.Text,
        initial: true,
        required: true
    },
    image: {
        type: Types.Text,
        initial: true,
        required: true
    }
});

BimModel.register();