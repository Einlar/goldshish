const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },
    userId: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },
    content: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
};

export default schema;