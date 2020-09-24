import { createCollection, extendCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import { apiSchema } from './apischema.js';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

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

extendCollection(Notes, { apiSchema });

export default Notes;