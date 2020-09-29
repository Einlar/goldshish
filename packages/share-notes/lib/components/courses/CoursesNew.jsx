import React from 'react';
import { Components, getFragment, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory, useParams } from 'react-router-dom';


const CoursesNew = () => {
    const history = useHistory(); //This is necessary for redirecting!

    const { courseid } = useParams();

    const { currentUser } = useCurrentUser();
    //TODO Check the permissions also here
    return (
        <div className="share-note">
            { Users.canCreate({ collectionName: "Courses", user: currentUser }) ?
            ( <div><Components.SmartForm collectionName="Courses"
            documentId={courseid}
            successCallback = {() => {
                history.goBack();
            }} /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to create a course.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'CoursesNew', component: CoursesNew });

export default CoursesNew;