const schema = {
    _id: {
        type: String,
        optional: true,
        canRead: ['guests']
    },
    professorName: {
        type: String,
        optional: false,
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
};

export default schema;