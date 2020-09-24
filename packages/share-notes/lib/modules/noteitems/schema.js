import { Utils } from "meteor/vulcan:core";
import { Components } from 'meteor/vulcan:lib';

import once from 'lodash/once';
import isString from 'lodash/isString';
import { curryFileCheck } from 'meteor/origenstudio:files-helpers';
import { generateFieldSchema, BasicFile } from 'meteor/vulcan-files';

import NoteFiles from './fsCollection';


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
    version: { //Make this increasing
        type: Number,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
    },
    // slug: {
    //     type: String,
    //     optional: true,
    //     canRead: ["guests"],
    //     onCreate: ({ data }) => {
    //         return Utils.slugify(data.title);
    //     },
    //     onUpdate: ({ data }) => {
    //         if (data.title) {
    //             return Utils.slugify(data.title);
    //         }
    //     },
    // },
    description: {
        type: String,
        optional: true,
        input: 'textarea',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        searchable: true,
    },
    parentNote: {
      type: String,
      control: 'select',
      optional: true,
      canRead: ["guests"],
      canCreate: ['members'],
      canUpdate: ['members'],
      query: `query NotesQuery {
              notes {
                  results {
                  _id
                  noteName
                  }
              }
          }
      `,
      relation: {
          fieldName: 'noteName',
          typeName: 'Note',
          kind: 'hasOne',
      },
      options: ({ data }) => 
      data.notes.results.map(note => ({
          value: note._id,
          label: note.noteName,
      })),
  },
  ...generateFieldSchema({
    FSCollection: NoteFiles,
    fieldName: 'noteId',
    fieldSchema: {
      label: 'Note URL',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      form: {
        fileCheck: once(() => curryFileCheck({
          maxSize: 10 * 1024 * 1024, // 5Mbytes
          fileTypeRegExp:  /pdf/i,
        })),
        FileRender: once(() => BasicFile), //Use BasicFile for rendering preview
        previewFromValue: once(() => (value, index, props) => {
          if (isString(value)) {
            // is stored value
            return {
              // retrieve url from resolved field
              url: props.document.noteUrl,
              // we do not have the name of the file here, so we'll set
              // from the body of the document (this is optional)
              name: props.currentValues.body || props.document.body,
            };
          } else {
            // is an uploaded file, do nothing and preview will be retrieved
            // by `previewFromFile` prop
          }
        }),
      },
    },
    resolverName: 'noteUrl',
    // only resolve field on the server, where NoteFiles is defined
    resolver: NoteFiles
      ? async ({ noteId }) => {
          if (!noteId) {
            return null; //null
          }
          const noteFile = await NoteFiles.loader.load(noteId);
          return noteFile ? NoteFiles.link(noteFile) : null;
        }
      : null,
  }),
};

export default schema;