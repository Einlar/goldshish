import React from 'react';
import { Components, registerComponent, useCurrentUser, useSingle2 } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory, useParams } from 'react-router-dom';

const NotesEdit = () => {
    const { slug } = useParams();

    const { document, data, loading } = useSingle2({
        collectionName: 'Notes',
        input: { filter: { slug: { _eq : slug} } },
        fragmentName: "noteFragment",
    });

    const history = useHistory();
    const { currentUser } = useCurrentUser();

    if (loading) return (<Components.Loading/>)

    return (
        Users.canUpdate({ collectionName: "Notes", user: currentUser, document: document }) ? 
        (
            <Components.SmartForm
                collectionName="Notes"
                documentId={document._id}
                queryFragmentName="noteEditQuery"
                showRemove={true}
                mutationFragmentName="noteFragment"
                successCallback = {() => {
                    history.goBack();
                }}
                removeFields={['noteFiles', 'highlights']} //Can't edit files, you have to publish a new version instead!
            /> 
        ) :
            <div>You don't have the permissions necessary to edit this document.</div> 
    )
}
    
registerComponent({ name: "NotesEdit", component: NotesEdit });

export default NotesEdit;

//Check permissions also here