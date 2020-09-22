import { createFSCollection } from 'meteor/vulcan-files'; //meteor/origenstudio:vulcan-files

export default createFSCollection({
    collectionName: 'NoteFiles',
    storagePath: '/home/ubuntu/projects/uploads'
});
