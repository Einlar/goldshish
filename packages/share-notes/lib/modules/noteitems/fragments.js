import { registerFragment } from 'meteor/vulcan:core';


registerFragment(`
    fragment NoteItemsPage on NoteItem {
        _id
        description
        parentNote
        noteUrl {
            name
            type
            url
        }
    }
`);

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