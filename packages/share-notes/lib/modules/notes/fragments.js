import { registerFragment } from 'meteor/vulcan:core';

//Returns the standard information about a Note
registerFragment(`
    fragment NotePage on Note {
        _id
        noteName
        author
        createdAt
        slug
        description
        userId
        user {
            username
        }
        course {
            _id
            slug
            courseName
        }
        folder {
            _id
            slug
            folderName
        }
        professor
        files {
            _id
            name
            url
        }
        noteFiles
        starred
        years
        date
        language
        collaborators {
            name
            email
            notes
        }
        changelog
        version
    }
`);

//Highlights edit
registerFragment(`
    fragment NoteHighlights on Note {
        _id
        slug
        highlights {
            _id
            fileId
            date
            hidden
            userId
            userName
            resolved
            content
            position
            comment
            answers
        }
    }
`); //        noteFiles

registerFragment(`
    fragment noteFragment on Note {
        _id
        noteName
        userId
        slug
        description
        version
        changelog
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
        professor
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
        changelog
        version
        userId
        author
        slug
        description
        courseId
        folderId
        professor
        noteFiles
        files {
            _id
            name
        }
        starred
        years
        date
        language
        highlights {
            _id
            fileId
            date
            hidden
            userId
            userName
            resolved
            content
            position
            comment
            answers
        }
        collaborators {
            name
            email
            notes
        }
    }
`);