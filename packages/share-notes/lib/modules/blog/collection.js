import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Blog = createCollection({
    collectionName: 'Blog',
    typeName: 'Blog',
    schema,
    permissions: {
        canRead: ['guests'],
        canCreate: ['admins'],
        canUpdate: ['admins'],
        canDelete: ['admins'],
    },
});

export default Blog;