import React from 'react';
import { Components, getFragment, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import NoteItems from '../../modules/noteitems/collection.js';
import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom';


const NoteItemsNew = () => {
    const history = useHistory(); //This is necessary for redirecting!
    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collection: NoteItems, user: currentUser }) ?
            ( <div><Components.SmartForm collection={NoteItems}
            mutationFragment={getFragment('NoteItemsPage')}
            successCallback = {() => {
                history.push(`/`);
            }} /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to submit a note.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'NoteItemsNew', component: NoteItemsNew });

export default NoteItemsNew;