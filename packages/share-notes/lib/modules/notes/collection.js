import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Notes = createCollection({
    collectionName: 'Notes',
    typeName: 'Note',
    schema,
    permissions: {
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        canDelete: ['owners', 'admins'],
    },
    defaultInput: {
        orderBy: {
            date: 'desc',
        },
    }
});

export default Notes;