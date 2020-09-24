import { Components, useMulti2 } from 'meteor/vulcan:core';

import React from 'react';
import { useParams, Link } from 'react-router-dom';


const FoldersContent = ({ folderId }) => {

    const { results = [], data, loading } = useMulti2({
        collectionName: 'Notes',
        input: { filter: { folderId: { _eq: folderId } }, sort: { years: "desc" } },
        fragmentName: 'NoteYears',
    });


    if (loading) return (<Components.Loading/>);

    //Groupby year
    return (
        <div className="courses-list">
            { 
                results.length ? 
                grouped_results.map(year => (
                    <div className="course" key={year.years}>
                        <h2 className="course-title">{year.years}</h2>{console.log(results)}
                        {
                            year.children.map(note => 
                        <Link to={`/notes/${note.courseName.slug}/${note.slug}`} key={note._id}>
                            <div className="note">
                            {note.noteName}
                            </div>
                        </Link>)
                        }
                    </div>
                )) : (<p>No notes here</p>)
            }
        </div>
    );
}

export default FoldersContent;