import { Utils } from 'meteor/vulcan:core';

const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
    },
    courseName: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        searchable: true,
    },
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            return Utils.slugify(data.courseName);
        },
        onUpdate: ({ data }) => {
            if (data.courseName) {
                return Utils.slugify(data.courseName);
            }
        },
    },
    description: {
        type: String,
        optional: true,
        input: 'textarea',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
    },
};

export default schema;