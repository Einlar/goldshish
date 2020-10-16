import { Utils } from 'meteor/vulcan:core';

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
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            relation: 'hasOne',
        },
    },
    postTitle: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['admins'],
        canUpdate: ['admins'],
        searchable: true,
    },
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            const slug = data.slug || Utils.slugify(data.postTitle);
            return Utils.getUnusedSlugByCollectionName('Blog', slug);
        },
        onUpdate: ({data, document: post }) => {
            if (data.slug && data.slug !== post.slug )
            {
                const slug = data.slug;
                return Utils.getUnusedSlugByCollectionName('Blog', slug);
            }
        },
    },
    createdAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
        onCreate: () => {
            return new Date();
        },
    },
    content: {
        type: String,
        optional: true,
        input: 'Editor',
        canRead: ['guests'],
        canCreate: ['admins'],
        canUpdate: ['admins'],
    },
};

export default schema;