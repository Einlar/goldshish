import { Components, registerComponent, useSingle2, useCurrentUser } from 'meteor/vulcan:core';

import React from 'react';

import Users from 'meteor/vulcan:users';
import { Link, useParams } from 'react-router-dom';

import FoldersContent from '../folders/FoldersContent.jsx';
import ReactHtmlParser from 'react-html-parser';

import { IconEdit, IconPlus } from '../other/Icons.jsx';

const CoursesPage = () => {
    const { slug } = useParams();
    const { currentUser } = useCurrentUser();

    const { document, loading, error } = useSingle2({
        collectionName: "Courses",
        input: { filter: { slug: { _eq: slug } } },
        fragmentName: "CourseAllFolders", 
    });

    if (loading) return (<Components.Loading/>);

    return (
        <div className="course">
            <div className="course-title">
                <h1>
                    {document.courseName}
                    { Users.canUpdate({ collectionName: "Courses", user: currentUser, document: document }) ? <Link to={`/newcourse/${document._id}`}><IconEdit/></Link> : null }
                </h1>
            </div>
            <div className="description">
                {ReactHtmlParser(document.description)}
            </div>
            <div className="course-folders">
                {
                    document.all_folders.map(
                        (folder) =>
                        (
                            <div className="folder-group" key={folder._id}>
                                <div className="container">
                                    <h2 className="section-title">   {folder.folderName}
                                        { Users.canUpdate({ collectionName: "Folders", user: currentUser, document: folder }) ? <Link to={`/newfolder/${folder._id}`}><IconEdit/></Link> : null }
                                    </h2>
                                    { 
                                        Users.canCreate({ collectionName: "Notes", user: currentUser }) ?
                                        <Link to={`/share/${document._id}/${folder._id}`}><div className="note"><IconPlus/>New Note</div></Link>
                                        : null
                                    }
                                </div>
                                <div className="description">
                                    {ReactHtmlParser(folder.description)}
                                </div>
                                <FoldersContent courseid={document._id} folderid={folder._id}/>
                            </div>
                        )
                    )
                }
                <div className="folder" key="new">
                    <Link to={`/courses/newfolder/${document._id}`}><h2>New folder</h2></Link>
                </div>
            </div>
        </div>
    )

};

registerComponent("CoursesPage", CoursesPage);

export default CoursesPage;
