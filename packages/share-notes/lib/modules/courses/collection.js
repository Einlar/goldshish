import { createCollection, extendCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import { apiSchema } from './apischema.js';

const Courses = createCollection({
    collectionName: 'Courses',
    typeName: 'Course',
    schema,
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
    // customFilters: [
    //     {
    //         name: "_withStarred",
    //         arguments: 'starred: Boolean',
    //         filter: ({ input, context, filterArguments }) => {
    //             const { starred } = filterArguments;
    //             console.log("Received", starred)
    //             return {
    //                 selector: { 'folders.starred': starred },
    //                 options: {},
    //             };
    //         },
    //     },
    // ],
});

//Add GraphQL only fields
extendCollection(Courses, { apiSchema });

export default Courses;