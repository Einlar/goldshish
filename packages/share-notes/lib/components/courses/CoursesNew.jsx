import React from 'react';
import { Components, getFragment, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom';


const CoursesNew = () => {
    const history = useHistory(); //This is necessary for redirecting!
    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collectionName: "Courses", user: currentUser }) ?
            ( <div><Components.SmartForm collectionName="Courses"
            successCallback = {() => {
                history.push(`/`);
            }} /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to create a course.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'CoursesNew', component: CoursesNew });

export default CoursesNew;