import React from 'react';

import { Components, useSingle2 } from 'meteor/vulcan:core';

import { Link } from 'react-router-dom';

//List all folders inside this course
const OtherFolders = ({ courseid }) => {

    const { loading, document, error } = useSingle2({
        collectionName: 'Courses',
        input: { filter: { _id: { _eq : courseid } } },
        fragmentName: 'CourseAllFolders'
    })

    return (
        <div className="starred-folders-container">
        { loading ? <Components.Loading/> : (
            document.all_folders.map( (folder) => 
                (
                    <Link to={`/folders/${document.slug}/${folder.slug}`} key={folder._id}>
                        <div key={folder._id} className="starred-folder">
                            {folder.folderName}
                        </div>
                    </Link>
                )
            )
        ) }
        </div>
    )
};


export default OtherFolders;