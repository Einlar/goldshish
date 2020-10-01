import { Components, registerComponent, useSingle2, useUpdate2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useState } from 'react';

import Users from 'meteor/vulcan:users';
import moment from 'moment';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import Loadable from 'react-loadable';

import Notes from '../../modules/notes/collection.js';
import { Link, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { IconView, IconDownload, IconEdit } from '../../components/other/Icons.jsx';

import OtherFolders from './OtherFolders.jsx';

const LoadableApp = Loadable({
    loader: () => import('./myApp.jsx'),
    loading: () => <Components.Loading/>,
    render: (loaded, props) => {
        return <loaded.default {...props}/>
    }
});

const NotesPage = () => {
    const { slug } = useParams();

    const { currentUser } = useCurrentUser();

    const queryObject = useSingle2({
        collection: Notes,
        input: { filter: { slug: { _eq: slug } } },
        fragmentName: "NotePage"
    });


    loading = queryObject.loading;
    result = queryObject.document;
    //error = queryObject.error;

    const [url, setUrl] = useState({});

    const handleClick = (fileId, fileUrl) =>
    { 
        setUrl({id: fileId, url: fileUrl}); 
    };

    return (
            loading ? (<Components.Loading/>) : (
            <div className="note-page">
                <div className="container">
                    <h2 className="section-title">{result.noteName}
                    { /* "Manual" check: access if owner or admin. Members could access, but the form would be empty */
                   ( result.userId === currentUser._id || Users.isAdmin(currentUser) ) 
                     ? <Link to={`/edit/notes/${result.slug}`}><IconEdit/></Link> : null }
                    </h2>
                    <div className="date">created on {moment(new Date(result.createdAt)).format('DD-MM-YYYY')}</div>
                </div>
                <div className="note-body">
                    <div className="left">
                        <div className="authors">
                            <b>Author:</b> {isString(result.author) ? result.author : <span>Unknown</span>} 
                            { isEmpty(result.collaborators) ? null : 
                            ' and ' + (result.collaborators.map( (c) => c.name )).join(', ')
                            }
                        </div>
                        <div className="course-description">
                            {ReactHtmlParser(result.description)}
                        </div>
                    </div>
                    <div className="right">
                        <div className="section-title">
                            {result.course.title}
                        </div>
                        <div className="professor">
                            Prof. {result.professor}
                        </div>
                        <div className="folder">
                            {result.folder.folderName}
                        </div>
                        {
                            result.date ? 
                            (
                                <div className="date date-big">{moment(new Date(result.date)).format('DD-MM-YYYY')}</div>
                                ) : (
                                <div className="year">
                                    {result.years}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="note-files">
                {
                    result.files.map(
                        file => 
                            <div key={file._id} className="file">
                                {file.name}
                                <a href={file.url} key="download" download={file.name}><IconDownload/></a>
                                <a href="#"
                                onClick={
                                    e => {
                                        e.preventDefault(); handleClick(file._id,file.url, result.highlights )
                                    }
                                }
                                key="view"><IconView/></a>
                            </div>
                    )
                }
                </div>
                <div className="decorated subtitle spacetop"><span>Other folders</span></div>
                <div className="other-folders">
                    <OtherFolders courseid={result.course._id}/>
                </div>
                <div id="root">
                    { ! _.isEmpty(url) ? 
                    (<div className="viewer-container">
                       <LoadableApp fileid={url.id} noteid={result._id} fileurl={url.url} />
                     </div>) : null
                    }
                </div>
            </div>
        )
    )};

registerComponent("NotesPage", NotesPage);

export default NotesPage;