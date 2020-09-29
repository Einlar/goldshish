import { Utils } from 'meteor/vulcan:core';

const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
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
    courseName: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        searchable: true,
    },
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            //if no slug has been provided, generate one
            const slug = data.slug || Utils.slugify(data.courseName);
            return Utils.getUnusedSlugByCollectionName('Courses', slug);
        },
        onUpdate: ({ data, document: course }) => {
            //console.log("updating folder:", folder);
            if (data.slug && data.slug !== course.slug) { //if slug has changed
                const slug = data.slug;
                return Utils.getUnusedSlugByCollectionName('Courses', slug);
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

    //ResolveAs method
    // folderIds: {
    //     type: String,
    //     optional: true,
    //     canRead: ['guests'],
    //     resolveAs: {
    //         fieldName: "folders",
    //         type: "[Folder]",
    //         resolver: (course, args, context) => {
    //             const folder_list = context.Folders.find({ courseId: course._id }).fetch();
    //             return context.Users.restrictViewableFields(
    //                 context.currentUser,
    //                 context.Folders,
    //                 folder_list
    //             );
    //         },
    //     }
    // },
};

export default schema;