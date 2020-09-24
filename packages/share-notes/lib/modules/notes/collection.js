import { createCollection, extendCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import { apiSchema } from './apischema.js';

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

extendCollection(Notes, { apiSchema });

export default Notes;