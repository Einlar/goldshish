import React from 'react';
import { Components, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom';


const NotesNew = () => {
    const history = useHistory(); //This is necessary for redirecting!
    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collectionName: "Notes", user: currentUser }) ?
            ( <div><Components.SmartForm collectionName="Notes"
            successCallback = {() => {
                history.push(`/`);
            }} /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to submit a note.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'NotesNew', component: NotesNew });

export default NotesNew;