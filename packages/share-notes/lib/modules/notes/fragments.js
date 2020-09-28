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
        language
        collaborators {
            name
            email
            notes
        }
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
            content
        }
        collaborators {
            name
            email
            notes
        }
    }
`);