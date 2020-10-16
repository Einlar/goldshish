import { Components, registerComponent, useSingle2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useEffect } from 'react';

import Users from 'meteor/vulcan:users';
import { Link, useParams, useLocation } from 'react-router-dom';

import FoldersContent from '../folders/FoldersContent.jsx';
import ReactHtmlParser from 'react-html-parser';

import { IconEdit, IconPlus } from '../other/Icons.jsx';

// import renderMathInElement from './auto-render.js';


const CoursesPage = () => {
    const { slug } = useParams();
    const { currentUser } = useCurrentUser();
    const location = useLocation();

    const queryObject = useSingle2({
        collectionName: "Courses",
        input: { filter: { slug: { _eq: slug } } },
        fragmentName: "CourseAllFolders", 
    });

    result = queryObject.document;
    loading = queryObject.loading;
    refetch = queryObject.refetch;
    error = queryObject.error;


    useEffect( () => {
        renderMathInElement = require('../other/auto-render.js');
        renderMathInElement(document.body);
        console.log('Location changed');
        refetch(); 
    }, [location]);

    if (loading) return (<Components.Loading/>);

    return (
        <div className="course">
            <div className="course-title">
                <h1>
                    {result.courseName}
                    { currentUser && Users.isMemberOf(currentUser, 'verifiedEmail') && Users.canUpdate({ collectionName: "Courses", user: currentUser, document: result }) ? <Link to={`/newcourse/${result._id}`}><IconEdit/></Link> : null }
                </h1>
            </div>
            <div className="description" id="course-desc">
                {ReactHtmlParser(result.description)}
            </div>
            <div className="course-folders">
                {
                    result.all_folders.map(
                        (folder) =>
                        (
                            <div className="folder-group" key={folder._id}>
                                <div className="container">
                                    <h2 className="section-title">   {folder.folderName}
                                        { currentUser && Users.isMemberOf(currentUser, 'verifiedEmail') && Users.canUpdate({ collectionName: "Folders", user: currentUser, document: folder }) ? <Link to={`/newfolder/${folder._id}`}><IconEdit/></Link> : null }
                                    </h2>
                                    { 
                                        currentUser && Users.isMemberOf(currentUser, 'verifiedEmail') && Users.canCreate({ collectionName: "Notes", user: currentUser }) ?
                                        <Link to={`/share/${result._id}/${folder._id}`}><div className="note"><IconPlus/>New Note</div></Link>
                                        : null
                                    }
                                </div>
                                <div className="description">
                                    {ReactHtmlParser(folder.description)}
                                </div>
                                <FoldersContent courseid={result._id} folderid={folder._id}/>
                            </div>
                        )
                    )
                }
                <div className="folder" key="new">
                    <Link to={`/courses/newfolder/${result._id}`}><h2>New folder</h2></Link>
                </div>
            </div>
        </div>
    )

};

registerComponent("CoursesPage", CoursesPage);

export default CoursesPage;
