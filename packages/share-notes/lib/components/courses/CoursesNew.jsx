import React from 'react';
import { Components, getFragment, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Courses from '../../modules/courses/collection.js';
import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom';


const CoursesNew = () => {
    const history = useHistory(); //This is necessary for redirecting!
    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collection: Courses, user: currentUser }) ?
            ( <Components.SmartForm collection={Courses}
            successCallback = {() => {
                history.push(`/`);
            }} />
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to submit a note.</div> 
            }
            <div className="upload-note">
                <Components.FilesUpload/>
            </div>
        </div>
    );
};

registerComponent({ name: 'CoursesNew', component: CoursesNew });

export default CoursesNew;