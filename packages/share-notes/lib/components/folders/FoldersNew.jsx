import React from 'react';
import { Components, getFragment, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory, useParams } from 'react-router-dom'; //useHistory


const FoldersNew = () => {
    const history = useHistory(); //This is necessary for redirecting!

    const { courseid, folderid } = useParams();

    const { currentUser } = useCurrentUser();
    //TODO Check the permissions also here
    return (
        <div className="share-note">
            { Users.canCreate({ collectionName: "Folders", user: currentUser }) ?
            ( <div><Components.SmartForm collectionName="Folders"
            documentId={folderid}
            prefilledProps={{courseId: courseid}}
            successCallback = {() => {
                history.goBack();
            }} 
            removeSuccessCallback = {() => history.push('/')}
            cancelCallback = {() => history.goBack()}
            /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to create a course.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'FoldersNew', component: FoldersNew });

export default FoldersNew;