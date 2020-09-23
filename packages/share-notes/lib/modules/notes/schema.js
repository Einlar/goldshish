import { Utils } from 'meteor/vulcan:core';

const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
    },
    noteName: {
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
            return Utils.slugify(data.noteName);
        },
        onUpdate: ({ data }) => {
            if (data.noteName) {
                return Utils.slugify(data.noteName);
            }
        },
    },
    description: {
        type: String,
        optional: true,
        input: 'textarea',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        searchable: true,
    },
    courseId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        relation: {
            fieldName: 'course',
            typeName: 'Course',
            kind: 'hasOne',
        },
    },
    folderId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        relation: {
            fieldName: 'folder',
            typeName: 'Folder',
            kind: 'hasOne',
        },
    },
    professorId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        relation: {
            fieldName: 'professor',
            typeName: 'Professor',
            kind: 'hasOne',
        },
    },
    latest_verId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        relation: {
            fieldName: 'latest_ver',
            typeName: 'NoteItem',
            kind: 'hasOne'
        },
    },
    starred: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    years: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    date: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
    }
};

export default schema;