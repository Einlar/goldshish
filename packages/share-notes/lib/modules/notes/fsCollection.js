import { createFSCollection } from 'meteor/vulcan-files';

export default createFSCollection({
    collectionName: 'NoteFiles',
    storagePath: '/home/ubuntu/projects/uploads',
});

