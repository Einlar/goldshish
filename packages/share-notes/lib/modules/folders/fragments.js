import { registerFragment } from 'meteor/vulcan:core';

registerFragment(
    `fragment FolderPage on Folder {
        _id
        folderName
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
        slug
        description
        course {
            courseName
        }
        starred
    }
`);


