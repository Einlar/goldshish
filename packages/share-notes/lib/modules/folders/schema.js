import { Utils } from 'meteor/vulcan:core';

const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
    },
    folderName: {
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
            return Utils.slugify(data.folderName);
        },
        onUpdate: ({ data }) => {
            if (data.folderName) {
                return Utils.slugify(data.folderName);
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
    courseId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        relation: {
            fieldName: 'course',
            typeName: 'Course',
            kind: 'hasOne',
        }
    },
    starred: {
        type: Boolean,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
    }
};

export default schema;