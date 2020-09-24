import { Utils } from 'meteor/vulcan:core';

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
            fieldName: 'courseName',
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
            label: folder.courseName.courseName + '/' + folder.folderName,
            slug: folder.slug,
        })),
        query: `
        query FolderCoursesQuery {
            folders {
                results{
                    _id
                    courseName {
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
            fieldName: 'professorName',
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
    }
};

export default schema;