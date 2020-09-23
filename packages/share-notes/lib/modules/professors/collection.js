import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Professors = createCollection({
    collectionName: 'Professors',
    typeName: 'Professor',
    schema,
    permissions: {
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        canDelete: ['owners', 'admins'],
    },
});

export default Professors;