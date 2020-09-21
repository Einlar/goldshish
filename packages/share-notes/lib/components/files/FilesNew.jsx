import React from 'react';
import { Components, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Files from '../../modules/files/collection.js';
import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom';

const FilesNew = () => {
    const history = useHistory(); //This is necessary for redirecting!
    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collection: Files, user: currentUser }) ?
            <Components.SmartForm collection={Files} 
            successCallback = {() => {
                history.push(`/`);
            }} /> : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to submit a note.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'FilesNew', component: FilesNew });

export default FilesNew;