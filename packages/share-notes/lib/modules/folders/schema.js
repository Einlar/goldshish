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
        control: 'select',
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        query: `query CoursesQuery {
                courses {
                    results {
                    _id
                    courseName
                    }
                }
            }
        `,
        resolveAs: {
            fieldName: 'courseName',
            type: 'Course',
            relation: 'hasOne',
            addOriginalField: true,
        },
        options: ({ data }) => 
        data.courses.results.map(course => ({
            value: course._id,
            label: course.courseName,
        })),
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