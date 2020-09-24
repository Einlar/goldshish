import { Components, registerComponent, useSingle2 } from 'meteor/vulcan:core';

import React from 'react';
import { useParams, Link } from 'react-router-dom';

import FoldersContent from './FoldersContent.jsx';


const FoldersPage = () => {
    const { slug } = useParams();

    const { document, data, loading } = useSingle2({
        collectionName: 'Folders',
        input: { filter: { slug: { _eq : slug} } },
    });


    if (loading) return (<Components.Loading/>);

    //Add also the course name (a fragment will be necessary to extract it)
    return (
        <div className="folders-view">
            <h1 className="course-title" key={document._id}>{document.folderName}</h1>
            <div className="description">
                {document.description}
            </div>
            <FoldersContent folderId={document._id}/>
        </div>
    );
    //Select all Notes belonging to this folder //idk
    //const { document, loading, error } = useSingle2
}

registerComponent({ name: 'FoldersPage', component: FoldersPage });

export default FoldersPage;