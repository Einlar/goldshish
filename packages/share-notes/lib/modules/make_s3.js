import { Connectors } from 'meteor/vulcan:core';

export const S3Collections = [];

export const makeS3 = collection => {

  S3Collections.push(collection);

  collection.addField([
    /**
     All uploadedFiles on the document
     */
    {
      fieldName: 'UploadedFiles',
      fieldSchema: {
        type: Array,
        optional: true,
        canRead: ['owners', 'admins', 'staff'],
        canCreate: ['members', 'admins', 'staff'],
        canUpdate: ['admins', 'staff'],
        resolveAs: {
          type: '[UploadedFile]',
          resolver: async (document, args, {Users, UploadedFiles, currentUser}) => {
            const uploadedFiles = await Connectors.find(UploadedFiles, {documentId: document._id});
            if (!uploadedFiles.length) return [];
            return uploadedFiles;
          },

        },
      },
    },
    {
      fieldName: 'UploadedFiles.$',
      fieldSchema: {
        type: Object,
        optional: true,
      },
    },
  ]);
};
