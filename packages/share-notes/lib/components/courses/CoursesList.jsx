import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Courses from '../../modules/courses/collection.js';

const CoursesList = () => {
    //Do something here

    return (
        <div className="courses-list">
            <Components.Datatable
                collection={Courses}
            showNew={true}
            showEdit={true}
            showSearch={true}/>
        </div>
    );
};

registerComponent({ name: 'CoursesList', component: CoursesList });

export default CoursesList;