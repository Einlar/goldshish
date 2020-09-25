import SimpleSchema from 'simpl-schema';

import once from 'lodash/once';
import isString from 'lodash/isString';
import { curryFileCheck } from 'meteor/origenstudio:files-helpers';
import { generateFieldSchema, BasicFile } from 'meteor/vulcan-files';

import NoteFiles from '../noteitems/fsCollection';


const filesSchema = new SimpleSchema({
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
    description: {
        type: String,
        optional: true,
        input: 'textarea',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        searchable: true,
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
        fileCheck: once(() => 
        { 
        console.log("fileChecking...");    
        return curryFileCheck({
          maxSize: 10 * 1024 * 1024, // 5Mbytes
          fileTypeRegExp:  /pdf/i,
        }) } ),
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
});

console.log("the schema", filesSchema);

export default filesSchema;