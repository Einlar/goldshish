import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

const UploadedFiles = createCollection({
  collectionName: 'UploadedFiles',
  typeName: 'UploadedFile',
  schema,
  permissions: {
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['owners', 'admins', 'staff'],
  },
});

export default UploadedFiles;
