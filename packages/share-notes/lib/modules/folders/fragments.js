import { registerFragment } from 'meteor/vulcan:core';

registerFragment(
    `fragment FolderPage on Folder {
        _id
        folderName
        starred
        description
        courseName {
            _id
            courseName
        }
    }
`);



