import { Components, useMulti2 } from 'meteor/vulcan:core';

import React from 'react';
import { Link } from 'react-router-dom';

function groupAndMap(items, itemKey, childKey, predic){
    return _.map(_.groupBy(items,itemKey), (obj,key) => ({
        [itemKey]: key,
        [childKey]: (predic && predic(obj)) || obj
    }));
}

const FoldersContent = ({ folderid, courseid }) => {

    const { results = [], data, loading } = useMulti2({
        collectionName: 'Notes',
        input: { filter: { folderId: { _eq: folderid } }, sort: { years: "desc" } },
        fragmentName: 'NotePage',
    });

    grouped_results = groupAndMap(results, "years", "children");

    grouped_results.sort((a, b) => parseInt(b.years) - parseInt(a.years)); //descending sort

    if (loading) return (<Components.Loading/>);

    //Groupby year
    return (
        <div className="courses-list">
            { 
                results.length ? 
                grouped_results.map(year => (
                    <div className="course" key={year.years}>
                        <h2 className="course-title">{year.years}
                        </h2>
                        {
                            year.children.map(note => 
                        <Link to={`/notes/${note.course.slug}/${note.slug}`} key={note._id}>
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