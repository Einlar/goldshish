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
        label: "Title",
        description: "Title of the note. Max: 20 characters.",
        max: 20,
        order: 1,
    },
    author: {
        type: String,
        label: "Author",
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        searchable: true,
        order: 10,
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
            order: 20, //Order not respected for some reason
            description: "People who collaborated for this note.",
        },
    },
    //TODO Add also voting (# found that note useful) (there is a defaultValue and sortable property)
    //TODO Fix all the fragments 
    slug: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        onCreate: ({ data }) => {
            //Generate new slug only if it has not been provided (duplicate slugs are now possible for versioning)
            if (data.slug) {
                return data.slug
            } else {
                const slug = Utils.slugify(data.noteName);
                return Utils.getUnusedSlugByCollectionName('Notes', slug);
            }
        },
        onUpdate: ({ data, document: note }) => {
            //console.log("updating folder:", folder); (can't change in theory)
            if (data.slug && data.slug !== note.slug) { //if slug has changed
                const slug = data.slug;
                return Utils.getUnusedSlugByCollectionName('Notes', slug);
            }
        },
    },
    version: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        onCreate: ({ data }) => {
            return (data.version) ? data.version : 0;
        },
    },
    professor: {
        type: String,
        optional: false,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["owners", "admins"],
        description: "The professor who taught the course at the time this note was written.",
        order: 25,
    },
    changelog: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["owners", "admins"],
        description: "Describe briefly the main changes from the previous version.",
        order: 30,
    },
    description: {
        type: String,
        optional: true,
        input: 'Editor',
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        searchable: true,
        description: "Describe the content of the note",
        order: 40,
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
        label: "Course",
        order: 50,
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
        label: "Folder",
        description: "Which folder will contain this note. If you are not sure, select the 'Main' one.",
        order: 60,
    },
    starred: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'], //Should be false always, only admins can set it true!
        canUpdate: ['admins'],
        label: 'Homepage?',
        description: "Check here if you would like this note to appear directly in homepage. This option should be reserved to the most complete notes.",
        order: 70,
    },
    years: {
        type: Number,
        optional: false,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        label: 'Year',
        description: "Input the year during which most of the course was taught. For example, for a course in the first semester of A.A. 2019/20, use 2019, and 2020 for the second semester.",
        order: 80, 
    },
    date: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ['members'],
        canUpdate: ['owners', 'admins'],
        label: "Date",
        description: "(Only needed for a note referring to a particular day, e.g. the solution of an exam)",
        order: 90,
    },
    language: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["owners", 'admins'],
        control: 'select',
        defaultValue: 'en',
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
        },
        label: "Language",
        order: 100,
    },

    ...generateFieldSchema({
        FSCollection: NoteFiles,
        fieldName: 'noteFiles',
        multiple: true,
        fieldSchema: {
          label: 'PDF(s)',
          description: "Upload one or more PDF files",
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
          canUpdate: ['owners', 'admins'], //!FIX
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