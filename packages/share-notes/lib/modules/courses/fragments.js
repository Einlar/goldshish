import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
    fragment CoursesPage on Course {
        _id
        title
        content
        slug
        noteId
    }
`);

registerFragment(`
    fragment CoursesNotes on Course {
        _id
        title
        content
        slug
        noteUrl
    }
`);