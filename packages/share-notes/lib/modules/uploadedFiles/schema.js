const schema = {
  // default properties
  _id: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    onCreate: ({newDocument, currentUser}) => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },
  documentId: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  collectionName: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },

  name: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  size: {
    type: Number,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  type: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  duration: {
    type: Number,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  videoHeight: {
    type: Number,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  videoWidth: {
    type: Number,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },

  height: {
    type: Number,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  width: {
    type: Number,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
  previewUrl: {
    type: String,
    optional: true,
    canRead: ['owners', 'admins', 'staff'],
    canCreate: ['members'],
    canUpdate: ['admins', 'staff'],
  },
};

export default schema;
