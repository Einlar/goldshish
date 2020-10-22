import { Components, registerComponent, useSingle2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

import Users from 'meteor/vulcan:users';
import FoldersContent from './FoldersContent.jsx';
import OtherFolders from '../notes/OtherFolders.jsx';

import { IconPlus, IconEdit } from '../other/Icons.jsx';

import ReactHtmlParser from 'react-html-parser';


const FoldersPage = () => {
    const { slug } = useParams();

    const { currentUser } = useCurrentUser();
    const location = useLocation();

    const queryObject = useSingle2({
        collectionName: 'Folders',
        input: { filter: { slug: { _eq : slug} } },
        fragmentName: "FolderPage",
    });

    result = queryObject.document;
    loading = queryObject.loading;
    refetch = queryObject.refetch;

    useEffect( () => {
        renderMathInElement = require('../other/auto-render.js');
        renderMathInElement(document.body);
        //console.log('Location changed');
        refetch();
    }); //, [location] 


    if (loading) return (<Components.Loading/>);

    // useEffect( () => {
    //     renderMathInElement = require('../other/auto-render.js');
    //     renderMathInElement(document.body);
    // });

    //Add also the course name (a fragment will be necessary to extract it)
    return (
        <div className="folders-view">
            <div className="container">
                <h1 className="section-title" key={result._id}>{result.folderName}
                { currentUser && Users.isMemberOf(currentUser, 'verifiedEmail') && Users.canUpdate({ collectionName: "Folders", user: currentUser, result: result }) ? <Link to={`/newfolder/${result._id}`}><IconEdit/></Link> : null }
                </h1>
                { 
                    currentUser && Users.isMemberOf(currentUser, 'verifiedEmail') && Users.canCreate({ collectionName: "Notes", user: currentUser }) ?
                    <Link to={`/share/${result.course._id}/${result._id}`}><div className="note"><IconPlus/>New Note</div></Link>
                    : null
                }
            </div>
            <div className="description">
                {ReactHtmlParser(result.description)}
            </div>
            <FoldersContent folderid={result._id} courseid={result.course._id}/>

            <div className="decorated subtitle spacetop"><span>Other folders in this Course</span></div>
            <div className="other-folders">
                <OtherFolders courseid={result.course._id} exclude={result._id}/>
            </div>
        </div>
    );
    //Select all Notes belonging to this folder //idk
    //const { result, loading, error } = useSingle2
}

registerComponent({ name: 'FoldersPage', component: FoldersPage });

export default FoldersPage;