import { registerFragment } from 'meteor/vulcan:core';

registerFragment(
    `fragment FolderPage on Folder {
        _id
        folderName
        userId
        starred
        description
        course {
            _id
            courseName
        }
    }
`);

//for datatable
registerFragment(`
    fragment folderFragment on Folder {
        _id
        folderName
        userId
        slug
        description
        course {
            courseName
        }
        starred
    }
`);


