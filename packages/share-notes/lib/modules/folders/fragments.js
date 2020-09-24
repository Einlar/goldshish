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

registerFragment(
    `fragment CourseFolders on Course {
        _id
        courseName
        folders {
            _id
            folderName
            starred
            slug
        }
        notes {
            _id
            noteName
            starred
            slug
        }
    }
`);

