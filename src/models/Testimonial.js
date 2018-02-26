const keystone = require('keystone');

const Types = keystone.Field.Types;

let Testimonial = new keystone.List('Testimonial');

Testimonial.add({
    name: {
        type: Types.Text,
        initial: true,
        required: true
    },
    quote: {
        type: Types.Textarea,
        height: 600,
        initial: true,
        required: true
    },
    position: {
        type: Types.Text,
        initial: true,
        required: true
    },
    company: {
        type: Types.Text,
        initial: true,
        required: true
    },
});

Testimonial.register();