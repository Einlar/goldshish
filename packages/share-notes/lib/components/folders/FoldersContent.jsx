import { Components, useMulti2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import remove from 'lodash/remove';

function groupAndMap(items, itemKey, childKey, predic){
    return _.map(_.groupBy(items,itemKey), (obj,key) => ({
        [itemKey]: key,
        [childKey]: (predic && predic(obj)) || obj
    }));
}

function groupAndMaps(events, groups) {
    return _.map(_.groupBy(events, groups[0]), (array, key) => ({
            [groups[0]]: key,
            [groups[1] + 's']: groups[2] && groupAndMap(array, groups.slice(1)) || array
        })); //   .values();          
}

const FoldersContent = ({ folderid, courseid, exclude }) => {

    const { results = [], data, loading, refetch } = useMulti2({
        collectionName: 'Notes',
        input: { filter: { folderId: { _eq: folderid } }, sort: { years: "desc" } },
        fragmentName: 'NotePage',
    });

    const location = useLocation();

    console.log("Got exclude: ", exclude);

    useEffect( () => {
        console.log('Location changed (FoldersContent');
        refetch();
    });
    
    // if (typeof exclude !== 'undefined') {
    //     remove(results, (a) => a.slug === exclude);
    // }

    if (loading) return (<Components.Loading/>);

    //Groupby year + slug //Fix descending order!
    return (
        <div className="courses-list">
            { 
                results.length ? 
                _.map(_.groupBy(results, 'years'), (doc, year) => (
                    (!_.isEmpty(_.filter(doc, (note) => note.slug !== exclude))) && 
                    (<div className="course" key={year}>
                        <h2 className="course-title">{year}
                        </h2>
                        {
                            _.map(_.groupBy(doc, 'slug'),
                            (versions, slug) => 
                                {
                                    const latest = _.sortBy(versions, 'version').pop(); //get last element (latest)

                                    return (
                                        slug !== exclude ?
                                        (<Link to={`/notes/${latest.course.slug}/${slug}`} key={latest._id}>
                                            <div className="note">
                                            {latest.noteName}
                                            </div>
                                        </Link>) : null
                                    )
                                }
                            ) 
                        }
                        { /* Example:
                            START with arr = [{ years: 2020, slug: A, ...note1}, {years: 2020, slug: A, ...note2}, {years: 2019, slug: B, ...note3}]
                            In this case note1 and note2 are actually different versions of the same note, since they share the same slug.

                            .groupBy(arr, 'years') results in this:
                            [2020: [{slug: A, ...note1}, {slug: A, ...note2}], 2019: [{slug: B, ...note3}]]

                            Then .map(result, (doc, year) => {}) iterates {} over each year, i.e.:
                            first run: year = 2020, doc =  [{slug: A, ...note1}, {slug: A, ...note2}]
                            second run: year = 2019, doc = [{slug: B, ...note3}]

                            Then we repeat all this for the slug in each doc, and for each of the final groups we print only the first element, which is the latest
                        */ }
                    </div>)
                )) : (<p>No notes here</p>)
            }
        </div>
    );
}

export default FoldersContent;