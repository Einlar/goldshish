import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Courses = createCollection({
    collectionName: 'Courses',
    typeName: 'Course',
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
            slug: 'asc',
        },
    },
});

export default Courses;