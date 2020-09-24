//GraphQL only fields

/*
Allows a course to return all its starred folders/notes
*/
export const apiSchema = {
    folders: {
        typeName: "[Folder]",
        //arguments: 'starred: String = "foo"',
        resolver: (course, args, context) => {
            const folder_list = context.Folders.find({ courseId: course._id, starred: true }).fetch();
            //console.log(args);
            return context.Users.restrictViewableFields(
                context.currentUser,
                context.Folders,
                folder_list
            );
        },
    },
    notes: {
        typeName: "[Note]",
        resolver: (course, args, context) => {
            const notes_list = context.Notes.find({courseId: course._id, starred: true}).fetch();
            return context.Users.restrictViewableFields(
                context.currentUser,
                context.Notes,
                notes_list
            );
        },
    },
};