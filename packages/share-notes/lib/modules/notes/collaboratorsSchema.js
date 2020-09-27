import SimpleSchema from 'simpl-schema';

const collaboratorsSchema = new SimpleSchema({
    name: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
    email: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
    notes: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
    },
});

export default collaboratorsSchema;