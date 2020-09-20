import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Files = createCollection({
    collectionName: 'Files',
    typeName: 'File',
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

export default Files;