import { registerFragment } from 'meteor/vulcan:core';

registerFragment(
    `fragment CourseFolders on Course {
        _id
        courseName
        slug
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

registerFragment(
    `fragment CourseAllFolders on Course {
        _id
        courseName
        slug
        all_folders {
            _id
            folderName
            starred
            slug
        }
    }
`);