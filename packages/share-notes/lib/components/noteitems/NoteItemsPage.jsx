import { Components, registerComponent, useSingle2 } from 'meteor/vulcan:core';

import React, { useState } from 'react';
import Notes from '../../modules/notes/collection.js';
import { Link, useParams } from 'react-router-dom';


const NoteItemsPage = () => {
    const { slug } = useParams();

    //Why is this named document and not result!? And also it is not in the docs!
    const {document, loading, error} = useSingle2({
        collection: Notes,
        input: { filter: {slug: {_eq: slug} } },
        fragmentName: 'NoteFiles',
        //fragmentName, input, pollInterval, queryOptions
    });

    return ( //Find a way to manage errors here, redirecting to 404 page
            loading ? (<Components.Loading />) : (
            <div>
                <h2>{document.noteName}</h2>
                {
                    document.files.map(file => 
                            <div key={file._id}>
                                <a href={file.noteUrl.url} download={file.noteUrl.name}>{file.noteUrl.name}</a> by {file.user.username}
                            </div>
                        )
                }
            </div>
        ) 
    )
};

registerComponent('NoteItemsPage', NoteItemsPage);

export default NoteItemsPage;