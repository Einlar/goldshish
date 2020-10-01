import SimpleSchema from 'simpl-schema';

//Sub schema for file highlights
const highlightSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
    fileId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
    date: {
        type: Date,
        optional: false,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
    content: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
        blackbox: true,
    },
    position: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
        blackbox: true,
    },
    comment: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
        blackbox: true,
    },
    hidden: {
        type: Boolean,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    resolved: {
        type: Boolean,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    userId: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    userName: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    answers: {
        type: Array,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        blackbox: true,
    },
    'answers.$': {
        type: Object,
        optional: true,
    },
});

export default highlightSchema;