import { Connectors } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import UploadedFiles from './uploadedFiles/collection.js';

Users.addField([
  /**
   An array containing uploadedFiles
   */
  {
    fieldName: 'uploadedFiles',
    fieldSchema: {
      type: Array,
      optional: true,
      canRead: ['owners', 'admins', 'staff'],
      canCreate: ['owners', 'admins'],
      canUpdate: ['owners', 'admins'],
      resolveAs: {
        type: '[UploadedFile]',
        arguments: 'collectionName: String',
        resolver: async (user, args, context) => {
          const selector = {userId: user._id};
          if (args.collectionName) {
            selector.collectionName = args.collectionName;
          }
          const uploadedFiles = await Connectors.find(UploadedFiles, selector);
          return uploadedFiles;
        }
      },
    }
  },
  {
    fieldName: 'uploadedFiles.$',
    fieldSchema: {
      type: Object,
      optional: true
    }
  },
]);
