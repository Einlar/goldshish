import { Utils } from 'meteor/vulcan:core';
// import filesSchema from './filesSchema.js';

import once from 'lodash/once';
import isString from 'lodash/isString';
import { curryFileCheck } from 'meteor/origenstudio:files-helpers';
import { generateFieldSchema, BasicFile } from 'meteor/vulcan-files';

import NoteFiles from './fsCollection.js';

import highlightSchema from './highlightSchema.js';
import collaboratorsSchema from './collaboratorsSchema.js';

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
    noteName: {
        type: String,
        optional: false,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        searchable: true,
    },
    author: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        searchable: true,
    },
    collaborators: {
        type: Array,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        arrayItem: {
            type: collaboratorsSchema,
            optional: true,
        },
        group: {
            name: "collaborators",
            label: "Collaborators",
            collapsible: true,
            startCollapsed: true,
        },
    },
    //TODO Add also voting (# found that note useful)
    //TODO Fix all the fragments
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        onCreate: ({ data }) => {
            //if no slug has been provided, generate one
            const slug = data.slug || Utils.slugify(data.noteName);
            return Utils.getUnusedSlugByCollectionName('Notes', slug);
        },
        onUpdate: ({ data, document: note }) => {
            //console.log("updating folder:", folder);
            if (data.slug && data.slug !== note.slug) { //if slug has changed
                const slug = data.slug;
                return Utils.getUnusedSlugByCollectionName('Notes', slug);
            }
        },
    },
    description: {
        type: String,
        optional: true,
        input: 'Editor',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        searchable: true,
    },
    courseId: {
        type: String,
        control: 'select',
        optional: false,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
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
        optional: false,
        control: 'FolderInCourse',
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        relation: {
            fieldName: 'folder',
            typeName: 'Folder',
            kind: 'hasOne',
        },
        options: ({ data }) =>
        data.folders.results.map(folder => ({
            value: folder._id,
            label: folder.course.courseName + '/' + folder.folderName,
            courseid: folder.course._id,
            slug: folder.slug,
        })),
        query: `
        query FolderCoursesQuery {
            folders {
                results{
                    _id
                    course {
                        _id
                        courseName
                    }
                    folderName
                    slug
                }
            }
        }
        `,
        
    },
    professor: {
        type: String,
        optional: false,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["owners", "admins"],
    },
    // professorId: {
    //     type: String,
    //     control: 'select',
    //     optional: true,
    //     canRead: ["guests"],
    //     canCreate: ['members'],
    //     canUpdate: ['members'],
    //     query: `query ProfessorsQuery {
    //             professors {
    //                 results {
    //                 _id
    //                 professorName
    //                 }
    //             }
    //         }
    //     `,
    //     relation: {
    //         fieldName: 'professor',
    //         typeName: 'Professor',
    //         kind: 'hasOne',
    //     },
    //     options: ({ data }) => 
    //     data.professors.results.map(professor => ({
    //         value: professor._id,
    //         label: professor.professorName,
    //     })),
    // },
    // latest_verId: {
    //     type: String,
    //     optional: true,
    //     canRead: ["guests"],
    //     canCreate: ['members'],
    //     canUpdate: ['members'],
    //     relation: {
    //         fieldName: 'latest_ver',
    //         typeName: 'NoteItem',
    //         kind: 'hasOne'
    //     },
    // },
    starred: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'], //Should be false always, only admins can set it true!
        canUpdate: ['admins'],
    },
    years: {
        type: Number,
        optional: false,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
    },
    date: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
    },
    language: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["owners", 'admins'],
        control: 'select',
        //default: not working
        options: () => {
            return [
                {
                    value: "en",
                    label: "English",
                },
                {
                    value: "it",
                    label: "Italian",
                }
            ]
        }
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
          canUpdate: ['owners', 'admins'],
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

      highlights: {
            type: Array,
            optional: true,
            arrayItem: {
                type: highlightSchema,
                optional: true,
            },
            canRead: ['guests'],
            canUpdate: ['members'], //Permission should be fixed in the highlights component
            canCreate: ['members'],
            group: {
                name: "highlights",
                label: "Highlights",
                order: 100,
                collapsible: true,
                startCollapsed: true,
                adminsOnly: true,
            },
            onCreate: () => {
            return []; //Initialize as null
            },
            //onUpdate edits the incoming data before it reaches the database
            //I need a custom mutator to handle merging
            onUpdate: ({ data, oldDocument }) => {
                console.log("Highlights update");
                console.log("Data: ", data);
                console.log("Document: ", oldDocument);
                
                const edited_highlight = data.highlights[0]; //Extracts the modified data

                const new_data = [...oldDocument.highlights.filter( (h) => h._id !== edited_highlight._id ), edited_highlight];

                console.log("New data", new_data);
                //Remove the modified 
                return new_data;
            },
      }
};

export default schema;