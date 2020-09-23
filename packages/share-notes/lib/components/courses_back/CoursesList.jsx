import React from 'react';
import { Helmet } from 'react-helmet';
import { Components, useMulti2, registerComponent, useCurrentUser } from 'meteor/vulcan:core';
import { getFragment } from 'meteor/vulcan:lib';
import { Link } from 'react-router-dom';

import CoursesUsers from '../courses/CoursesUsers.jsx';
import CoursesNew from './CoursesNew.jsx';

//Add the components
import Courses from '../../modules/noteitems/collection.js';

const CoursesList = () => {
    const { results = [], data, loading } = useMulti2({ collection: Courses, fragment: getFragment('CoursesNotes') });
    return (
        <div className="courses">

            { loading ? (<Components.Loading />) : (
                <div className="courses-list">
                { results.map(course =>
                     <Link to={`/course/${course.slug}`} key="{course._id}"><h2>{course.title}</h2></Link>
                    )
                }
                </div>
            )}
            
        </div> 
    );
};

registerComponent({ name: 'CoursesList', component: CoursesList });

// const options = {
//     collection: Files,
//     limit: 5,
// };

// registerComponent({name: 'FilesList', component: FilesList, hocs: [withCurrentUser, [withMulti, options]] });