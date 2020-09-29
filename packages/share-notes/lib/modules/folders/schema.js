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
        canUpdate: ['owners', 'admins'],
        searchable: true,
    },
    userId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            relation: 'hasOne',
        }
    },
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            //if no slug has been provided, generate one
            const slug = data.slug || Utils.slugify(data.folderName);
            return Utils.getUnusedSlugByCollectionName('Folders', slug);
        },
        onUpdate: ({ data, document: folder }) => {
            //console.log("updating folder:", folder);
            if (data.slug && data.slug !== folder.slug) { //if slug has changed
                const slug = data.slug;
                return Utils.getUnusedSlugByCollectionName('Folders', slug);
            }
        },
    },
    description: {
        type: String,
        optional: true,
        input: 'Editor',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins']
    },
    courseId: {
        type: String,
        control: 'select',
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
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
            fieldName: 'course',
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
        canUpdate: ['owners', 'admins']
    }
};

export default schema;