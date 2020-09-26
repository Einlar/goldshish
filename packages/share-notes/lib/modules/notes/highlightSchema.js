import SimpleSchema from 'simpl-schema';

//Sub schema for file highlights
const highlightSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },
    fileId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
    content: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
});

export default highlightSchema;