import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Folders = createCollection({
    collectionName: 'Folders',
    typeName: 'Folder',
    schema,
    permissions: {
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        canDelete: ['owners', 'admins'],
    },
});

export default Folders;