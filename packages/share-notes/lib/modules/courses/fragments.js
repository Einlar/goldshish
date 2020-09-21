import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
    fragment CoursesPage on Course {
        _id
        title
        content
        slug
    }
`);