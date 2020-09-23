import React from 'react';
import { Components, getFragment, useCurrentUser, registerComponent } from '../../modules/folders/node_modules/meteor/vulcan:core';

import Courses from '../../modules/noteitems/collection.js';
import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom';


const CoursesNew = () => {
    const history = useHistory(); //This is necessary for redirecting!
    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collection: Courses, user: currentUser }) ?
            ( <div><Components.SmartForm collection={Courses}
            mutationFragment={getFragment('CoursesPage')}
            successCallback = {() => {
                history.push(`/`);
            }} /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to submit a note.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'CoursesNew', component: CoursesNew });

export default CoursesNew;