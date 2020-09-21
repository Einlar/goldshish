import React from 'react';
import { Helmet } from 'react-helmet';
import { Components, useMulti2, registerComponent, useCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';

import FilesUsers from './FilesUsers.jsx';
import FilesNew from './FilesNew.jsx';

//Add the components
import Files from '../../modules/files/collection.js';

const FilesList = () => {
    const { results = [], data, loading } = useMulti2({ collection: Files });
    return (
        <div className="files">

            { loading ? (<Components.Loading />) : (
                <div className="files-list">
                { results.map(file =>
                     <Link to={`/course/${file.slug}`} key="{file._id}"><h2>{file.title}</h2></Link>
                    )
                }
                </div>
            )}
            
        </div> 
    );
};

registerComponent({ name: 'FilesList', component: FilesList });

// const options = {
//     collection: Files,
//     limit: 5,
// };

// registerComponent({name: 'FilesList', component: FilesList, hocs: [withCurrentUser, [withMulti, options]] });