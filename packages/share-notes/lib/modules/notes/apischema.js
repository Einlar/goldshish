//GraphQL only fields

/*
Given a note, returns all files attached to it
*/
export const apiSchema = {
    files: {
        typeName: "[NoteItem]",
        resolver: (note, args, context) => {
            const files_list = context.NoteItems.find({
                parentNote: note._id}).fetch();
            return context.Users.restrictViewableFields(
                context.currentUser,
                context.NoteItems,
                files_list
            );
        },
    },
};