import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const NoteItems = createCollection({
    collectionName: 'NoteItems',
    typeName: 'NoteItem',
    schema, 
    //Use default resolvers/mutations
    permissions: {
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        canDelete: ['owners', 'admins'],
    },
    defaultInput: {
        orderBy: {
            createdAt: 'desc',
        },
    },
});

export default NoteItems;