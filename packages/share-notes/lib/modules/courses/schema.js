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
        input: 'Editor',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
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