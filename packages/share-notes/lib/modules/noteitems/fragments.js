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