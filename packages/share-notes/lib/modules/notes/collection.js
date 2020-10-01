import { createCollection, extendCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const Notes = createCollection({
    collectionName: 'Notes',
    typeName: 'Note',
    schema,
    permissions: {
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members', 'admins'], //Field level permission: necessary, since all members can post highlights
        canDelete: ['owners', 'admins'],
    },
    customFilters: [ //return all notes that are in the folder identified by slug
        {
            name: '_byFolder',
            arguments: 'slug: String',
            filter: ({ input, context, filterArguments }) => {
                const { slug } = filterArguments;
                const folder = context.Folders.findOne({ slug: slug });
                return {
                    selector: { folderId: folder._id },
                };
            },
        },
    ],
});


export default Notes;