import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
    fragment FilesPage on File {
        _id
        title
        content
        slug
    }
`);