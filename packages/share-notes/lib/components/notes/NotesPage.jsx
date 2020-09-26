import { Components, registerComponent, useSingle2 } from 'meteor/vulcan:core';

import React, { useState } from 'react';
import Notes from '../../modules/notes/collection.js';
import { Link, useParams } from 'react-router-dom';

const NotesPage = () => {
    const { slug } = useParams();

    const { document, loading, error } = useSingle2({
        collection: Notes,
        input: { filter: { slug: { _eq: slug } } },
        fragmentName: "NotePage"
    });

    return (
        loading ? (<Components.Loading/>) : (
            <div>
                <span>
                    <h2 className="course-title">{document.noteName}</h2>
                    by {document.user.username}
                </span>
                {
                    document.files.map(
                        file => 
                            <div key={file._id}>
                                <a href={file.url} download={file.name}>{file.name}</a>
                            </div>
                    )
                }
            </div>
        )
    )
};

registerComponent("NotesPage", NotesPage);

export default NotesPage;