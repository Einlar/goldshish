import React from 'react';
import { Components, registerComponent, useCurrentUser, useSingle2 } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory, useParams } from 'react-router-dom';


const NotesEdit = () => {
    const { noteid, newver } = useParams();

    console.log("Got newver", newver);

    const { document, data, loading } = useSingle2({
        collectionName: 'Notes',
        input: { filter: { _id: { _eq : noteid} } },
        fragmentName: "noteEditQuery",
    });

    const history = useHistory();
    const { currentUser } = useCurrentUser();

    const new_version = (typeof newver === 'undefined') ? false : true;

    let dynProps = {};

    if (loading) return (<Components.Loading/>)
    else {
        dynProps = new_version ? 
        { prefilledProps: {
            noteName: document.noteName,
            author: document.author,
            collaborators: document.collaborators,
            slug: document.slug,
            description: document.description,
            courseId: document.courseId,
            folderId: document.folderId,
            professor: document.professor,
            starred: document.starred,
            date: document.date,
            years: document.years,
            language: document.language,
            highlights: [],
            changelog: '',
            noteFiles: [],
            version: (document.version + 1)} 
        } : { documentId: document._id }
    }

    return (
        Users.canUpdate({ collectionName: "Notes", user: currentUser, document: document }) ? 
        (
            <Components.SmartForm
                collectionName="Notes"
                { ...dynProps } 
                queryFragmentName="noteEditQuery"
                showRemove={true}
                mutationFragmentName="noteFragment"
                successCallback = {() => {
                    history.goBack();
                }}
                removeFields={
                    new_version ? ['highlights', 'courseId', 'folderId'] : ['noteFiles', 'highlights', 'courseId', 'folderId'] //Files can be edited only when publishing a new version
                }
            /> 
        ) :
            <div>You don't have the permissions necessary to edit this document.</div> 
    )
}
    
registerComponent({ name: "NotesEdit", component: NotesEdit });

export default NotesEdit;

//Check permissions also here