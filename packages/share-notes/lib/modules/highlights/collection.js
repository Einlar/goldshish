import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Highlights = createCollection({
    collectionName: "Highlights",
    typeName: "Highlight",
    schema,
    permissions: {
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        canDelete: ['owners', 'admins'],
    },
});

export default Highlights;