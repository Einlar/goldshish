import { registerFragment } from 'meteor/vulcan:core';

//Returns all files attached to a note, along with their data
// registerFragment(
//     `fragment NoteFiles on Note {
//         _id
//         noteName
//         slug
//         createdAt
//         files {
//             _id
//             createdAt
//             user {
//                 _id
//                 username
//             }
//             version
//             description
//             files {
//                 name
//                 type
//                 url
//             }
//         }
//     }
// `);

//Returns the standard information about a Note
registerFragment(`
    fragment NotePage on Note {
        _id
        noteName
        slug
        description
        user {
            username
        }
        course {
            _id
            courseName
        }
        folder {
            _id
            folderName
        }
        professor {
            _id
            professorName
        }
        files {
            _id
            name
            url
        }
        highlights {
            fileId
            content
        }
        noteFiles
        starred
        years
        date
    }
`);

//Highlights edit
registerFragment(`
    fragment noteHighlights on Note {
        slug
        noteFiles
        highlights {
            fileId
            content
        }
    }
`);

registerFragment(`
    fragment noteFragment on Note {
        _id
        noteName
        slug
        description
        user {
            username
        }
        course {
            _id
            courseName
        }
        folder {
            _id
            folderName
        }
        professor {
            _id
            professorName
        }
        files {
            _id
            name
        }
        starred
        years
        date
    }
`);

//queryFragment for editing
registerFragment(`
    fragment noteEditQuery on Note {
        _id
        noteName
        slug
        description
        courseId
        folderId
        professorId
        noteFiles
        files {
            _id
            name
        }
        starred
        years
        date
        highlights {
            _id
            fileId
            content
        }
    }
`);