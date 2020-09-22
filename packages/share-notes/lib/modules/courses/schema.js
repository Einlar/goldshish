import { Utils } from "meteor/vulcan:core";

// import once from 'lodash/once';
// import isString from 'lodash/isString';
// import { curryFileCheck } from 'meteor/origenstudio:files-helpers';
// import { generateFieldSchema, Image } from '../../../../vulcan-files'; //meteor/origenstudio:vulcan-files

// import NoteFiles from './fsCollection';


const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
    },
    createdAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
        onCreate: () => {
            return new Date();
        }
    },
    userId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            relation: 'hasOne',
        }
    },
    title: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
    },

    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            return Utils.slugify(data.title);
        },
        onUpdate: ({ data }) => {
            if (data.title) {
                return Utils.slugify(data.title);
            }
        },
    },

    content: {
        type: String,
        optional: true,
        input: 'textarea',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
    },

     // custom properties
    //  ...generateFieldSchema({
    //   fieldName: 'fileId',
    //   fieldSchema: {
    //     'label': 'File',
    //   },
    //   resolverName: 'file',
    //  }),
  // ...generateFieldSchema({
  //   FSCollection: NoteFiles,
  //   fieldName: 'noteId',
  //   fieldSchema: {
  //     label: 'Note URL',
  //     form: {
  //       fileCheck: once(() => curryFileCheck({
  //         maxSize: 5 * 1024 * 1024, // 5Mbytes
  //         fileTypeRegExp:  /png|jpg|jpeg/i,
  //       })),
  //       FileRender: once(() => Image),
  //       previewFromValue: once(() => (value, index, props) => {
  //         if (isString(value)) {
  //           // is stored value
  //           return {
  //             // retrieve url from resolved field
  //             url: props.document.noteUrl,
  //             // we do not have the name of the file here, so we'll set
  //             // from the body of the document (this is optional)
  //             name: props.currentValues.body || props.document.body,
  //           };
  //         } else {
  //           // is an uploaded file, do nothing and preview will be retrieved
  //           // by `previewFromFile` prop
  //         }
  //       }),
  //     },
  //   },
  //   resolverName: 'noteUrl',
  //   // only resolve field on the server, where PicsFiles is defined
  //   resolver: NoteFiles
  //     ? async ({ noteId }) => {
  //         if (!noteId) {
  //           return null;
  //         }
  //         const noteFile = await NoteFiles.loader.load(noteId);
  //         return noteFile ? NoteFiles.link(noteFile) : null;
  //       }
  //     : null,
  // }),
};

export default schema;