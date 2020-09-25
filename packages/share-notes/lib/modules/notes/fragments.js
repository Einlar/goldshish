import { registerFragment } from 'meteor/vulcan:core';

//Returns all files attached to a note, along with their data
registerFragment(
    `fragment NoteFiles on Note {
        _id
        noteName
        files {
            _id
            createdAt
            user {
                _id
                username
            }
            version
            description
            noteUrl {
                name
                type
                url
            }
        }
    }
`);

//Returns the standard information about a Note
registerFragment(`
    fragment NotePage on Note {
        _id
        slug
        noteName
        description
        course {
            _id
            slug
            courseName
        }
        professor {
            _id
            professorName
        }
        years
        date
    }
`);

registerFragment(`
    fragment noteFragment on Note {
        _id
        noteName
        slug
        description
        course {
            courseName
        }
        folder {
            folderName
        }
        professor {
            professorName
        }
        latest_verId
        starred
        years
        date
    }
`);
//latest ver id