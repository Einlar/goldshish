import { Components, registerComponent, useSingle2, useCurrentUser } from 'meteor/vulcan:core';

import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Users from 'meteor/vulcan:users';
import FoldersContent from './FoldersContent.jsx';
import OtherFolders from '../notes/OtherFolders.jsx';

import { IconPlus, IconEdit } from '../other/Icons.jsx';

import ReactHtmlParser from 'react-html-parser';


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
            <div className="container">
                <h1 className="section-title" key={document._id}>{document.folderName}
                { Users.canUpdate({ collectionName: "Folders", user: currentUser, document: document }) ? <Link to={`/newfolder/${document._id}`}><IconEdit/></Link> : null }
                </h1>
                { 
                    Users.canCreate({ collectionName: "Notes", user: currentUser }) ?
                    <Link to={`/share/${document.course._id}/${document._id}`}><div className="note"><IconPlus/>New Note</div></Link>
                    : null
                }
            </div>
            <div className="description">
                {ReactHtmlParser(document.description)}
            </div>
            <FoldersContent folderid={document._id} courseid={document.course._id}/>

            <div className="decorated subtitle spacetop"><span>Folders in this Course</span></div>
            <div className="other-folders">
                <OtherFolders courseid={document.course._id}/>
            </div>
        </div>
    );
    //Select all Notes belonging to this folder //idk
    //const { document, loading, error } = useSingle2
}

registerComponent({ name: 'FoldersPage', component: FoldersPage });

export default FoldersPage;