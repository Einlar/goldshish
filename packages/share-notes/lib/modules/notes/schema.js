import { Utils } from 'meteor/vulcan:core';
// import filesSchema from './filesSchema.js';

import once from 'lodash/once';
import isString from 'lodash/isString';
import { curryFileCheck } from 'meteor/origenstudio:files-helpers';
import { generateFieldSchema, BasicFile } from 'meteor/vulcan-files';

import NoteFiles from '../noteitems/fsCollection';

const filesGroup = {
    name: 'attachedFiles',
    label: 'Files',
    order: 10
};

const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
    },
    noteName: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        searchable: true,
    },
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            return Utils.slugify(data.noteName);
        },
        onUpdate: ({ data }) => {
            if (data.noteName) {
                return Utils.slugify(data.noteName);
            }
        },
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
    courseId: {
        type: String,
        control: 'select',
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        query: `query CoursesQuery {
                courses {
                    results {
                    _id
                    courseName
                    }
                }
            }
        `,
        relation: {
            fieldName: 'course',
            typeName: 'Course',
            kind: 'hasOne',
        },
        options: ({ data }) => 
        data.courses.results.map(course => ({
            value: course._id,
            label: course.courseName,
        })),
    },
    folderId: {
        type: String,
        optional: true,
        control: 'select',
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        relation: {
            fieldName: 'folder',
            typeName: 'Folder',
            kind: 'hasOne',
        },
        options: ({ data }) =>
        data.folders.results.map(folder => ({
            value: folder._id,
            label: folder.course.courseName + '/' + folder.folderName,
            slug: folder.slug,
        })),
        query: `
        query FolderCoursesQuery {
            folders {
                results{
                    _id
                    course {
                        courseName
                    }
                    folderName
                    slug
                }
            }
        }
        `,
        
    },
    professorId: {
        type: String,
        control: 'select',
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        query: `query ProfessorsQuery {
                professors {
                    results {
                    _id
                    professorName
                    }
                }
            }
        `,
        relation: {
            fieldName: 'professor',
            typeName: 'Professor',
            kind: 'hasOne',
        },
        options: ({ data }) => 
        data.professors.results.map(professor => ({
            value: professor._id,
            label: professor.professorName,
        })),
    },
    latest_verId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
        relation: {
            fieldName: 'latest_ver',
            typeName: 'NoteItem',
            kind: 'hasOne'
        },
    },
    starred: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    years: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
    },
    date: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['members'],
    },

    ...generateFieldSchema({
        FSCollection: NoteFiles,
        fieldName: 'noteFiles',
        multiple: true,
        fieldSchema: {
          label: 'Note URL',
        //Custom data filling
        //   query: `query FilesQuery {
        //       notes {
        //           results {
        //               files {
        //                 _id
        //                 name
        //               }
        //             }
        //       }
        //   }`,
        // options: (props) => 
        // { console.log("available props", props); },
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
        resolverName: 'files',
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