import { Components, registerComponent, useSingle2, useCurrentUser } from 'meteor/vulcan:core';

import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Users from 'meteor/vulcan:users';
import FoldersContent from './FoldersContent.jsx';
import { IconPlus } from '../other/Icons.jsx';


const FoldersPage = () => {
    const { slug } = useParams();

    const { currentUser } = useCurrentUser();

    const { document, data, loading } = useSingle2({
        collectionName: 'Folders',
        input: { filter: { slug: { _eq : slug} } },
        fragmentName: "FolderPage",
    });


    if (loading) return (<Components.Loading/>);

    //Add also the course name (a fragment will be necessary to extract it)
    return (
        <div className="folders-view">
            <h1 className="course-title" key={document._id}>{document.folderName}{ 
                Users.canCreate({ collectionName: "Notes", user: currentUser }) ?
                <Link to={`/share/${document.course._id}/${document._id}`}><IconPlus/></Link>
                : null
            }
            </h1>
            <div className="description">
                {document.description}
            </div>
            <FoldersContent folderid={document._id} courseid={document.course._id}/>
        </div>
    );
    //Select all Notes belonging to this folder //idk
    //const { document, loading, error } = useSingle2
}

registerComponent({ name: 'FoldersPage', component: FoldersPage });

export default FoldersPage;