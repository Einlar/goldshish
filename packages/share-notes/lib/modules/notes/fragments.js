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
        courseName {
            _id
            slug
            courseName
        }
        professorName {
            _id
            professorName
        }
        years
        date
    }
`);

registerFragment(`
    fragment NoteYears on Note {
        _id
        slug
        years
    }
`);