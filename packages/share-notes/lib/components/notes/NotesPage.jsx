import { Components, registerComponent, useMulti2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap'; 

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
import FoldersContent from '../folders/FoldersContent.jsx';

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

    const queryObject = useMulti2({
        collection: Notes,
        input: { filter: { slug: { _eq: slug } } },
        sort: { version: "desc" },
        fragmentName: "NotePage"
    });


    loading = queryObject.loading;
    results = queryObject.results;
    //error = queryObject.error;

    const [url, setUrl] = useState({});

    const handleClick = (fileId, fileUrl) =>
    { 
        setUrl({id: fileId, url: fileUrl}); 
    };

    //Add check if there are no notes here

    const [version, setVersion] = useState(0); //First show the latest version

    let result = {};

    if (!loading && version < results.length) {
        result = results[version]; //Selected note
    }

    return (
            loading ? (<Components.Loading/>) : (
            <div className="note-page" key={result._id}>
                <div className="container">
                    <h2 className="section-title">{result.noteName}
                    {/* "Manual" check: access if owner or admin. Members could access, but the form would be empty */
                   ( result.userId === currentUser._id || Users.isAdmin(currentUser) ) 
                     ? <Link to={`/edit/notes/${result._id}`}><IconEdit/></Link> : null }
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
                            <strong>Prof.</strong> {result.professor}
                        </div>
                        <div className="simple-container">
                            <Link to={`/courses/${result.course.slug}`}>
                                <div className="folder red">
                                    {result.course.courseName}
                                </div>
                            </Link>
                            <div className="slash">
                                &nbsp;/
                            </div>
                            <Link to={`/folders/${result.course.slug}/${result.folder.slug}`}>
                                <div className="folder">
                                    {result.folder.folderName}
                                </div>
                            </Link>
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
                        <div className="version-form">
                            <Form.Group as={Row} controlId="versionForm">
                                <Form.Label column xs="auto">Version</Form.Label>
                                <Col><Form.Control as="select" value={version} onChange={(e) => {setVersion(e.target.value); }}>
                                {
                                    results.map(
                                        (v, index) => (
                                            <option key={v.version} value={index} style={{textAlign: 'center'}}>
                                                {v.version}&nbsp;({index == 0 ? 'latest' : moment(v.createdAt).fromNow()})
                                            </option>
                                        )
                                    )
                                }
                                </Form.Control></Col>
                            </Form.Group>
                            { version == 0 && 
                                <Link to={`/edit/notes/${result._id}/newver`}>Upload a new version</Link>
                            }  
                        </div>
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
                <div className="decorated subtitle spacetop"><span>Other notes in this Folder</span></div>
                <FoldersContent courseid={result.course._id} folderid={result.folder._id} exclude={result.slug}/>
                <div id="root">
                    { ! _.isEmpty(url) ? 
                    (<div className="viewer-container">
                       <LoadableApp fileid={url.id} noteid={result._id} fileurl={url.url} />
                     </div>) : null
                    }
                </div>
                { /* <div className="decorated subtitle spacetop"><span>Folders in this Course</span></div>
                <div className="other-folders">
                    <OtherFolders courseid={result.course._id}/>
                </div>
                 */ }
                {/*TODO Add other notes in the same folder */}
            </div>
        )
    )};

registerComponent("NotesPage", NotesPage);

export default NotesPage;