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
import { result } from 'lodash';

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

    const [updateNote, {called}] = useUpdate2({
        collectionName: "Notes", fragmentName: "noteHighlights",
    });

    const updateHighlight = (highlight) => {
        console.log("Received", highlight);

        //Checks if highlight is being removed:
        const new_content = (highlight.content === null) ? "" : JSON.stringify(highlight);

        const mutation_data = [{_id: highlight.id, fileId: url.id, content: new_content}];

        //? Maybe changing the fragment avoids invoking the files mutation when changing highlights?

        const input = { filter: { slug: { _eq: slug } }, data: { noteFiles: result.noteFiles, highlights: mutation_data } };

        updateNote({ input });

        //TODO manage errors and return values
    }

//TODO In theory now I can access the db from inside the myApp component...


    const handleClick = (id, url, highlights) =>
    { 
        console.log("Got", url);
        console.log("Got also",  highlights);

       const set_highlights = (typeof highlights === 'undefined') ? [] : highlights.filter((highlight) => (highlight.fileId === id) && (highlight.content != "")).map((highlight) => JSON.parse(highlight.content));
        setUrl({id: id, url: url, highlights: set_highlights}); //Filter by fileId, then map + parse JSON
        //TODO Now highlights are merged, but still it could be convenient to fetch more data from the server and update in real time
    };

    //Add by {result.user.username}
    return (
            loading ? (<Components.Loading/>) : (
            <div className="note-page">
                <div className="container">
                    <h2 className="section-title">{result.noteName}
                    { Users.canUpdate({ collectionName: "Notes", user: currentUser, document: result }) ? <Link to={`/edit/notes/${result.slug}`}><IconEdit/></Link> : null }
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
                       <LoadableApp url={url.url} fileId={url.id} initialHighlights={url.highlights} updater={updateHighlight}/>
                     </div>) : null
                    }
                </div>
            </div>
        )
    )};

registerComponent("NotesPage", NotesPage);

export default NotesPage;