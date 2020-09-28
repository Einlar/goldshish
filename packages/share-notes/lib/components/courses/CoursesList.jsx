import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Courses from '../../modules/courses/collection.js';
import ReactHtmlParser from 'react-html-parser';

const CoursesList = () => {
    //Do something here

    return (
        <div className="courses-list">
            <Components.Datatable
                collection={Courses}
            showNew={true}
            showEdit={true}
            showSearch={true}
            columns={[ 'courseName', 'slug', 
                {
                    name: 'description',
                    label: 'Description',
                component: ({ document }) => (<div>{ReactHtmlParser(document.description)}</div>)
                }
            ]}
            />

        </div>
    );
};

registerComponent({ name: 'CoursesList', component: CoursesList });

export default CoursesList;