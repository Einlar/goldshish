import { Components, registerComponent, useSingle2 } from 'meteor/vulcan:core';
import get from 'lodash/get';
import React from 'react';
import Courses from '../../modules/courses/collection.js';
import { Link, useParams } from 'react-router-dom';

const CoursesPage = () => {
    const { slug } = useParams();

    //Why is this named document and not result!? And also it is not in the docs!
    const {document, loading, error} = useSingle2({
        collection: Courses,
        input: { filter: {slug: {_eq: slug} } },
        fragmentName: 'CoursesPage',
        //fragmentName, input, pollInterval, queryOptions
    });

    return ( //Find a way to manage errors here, redirecting to 404 page
            loading ? (<Components.Loading />) : (
            <div>
                <h2>{document.title}</h2>
                <div className="content">{document.content}</div>
            </div>
        ) 
    )
};

registerComponent('CoursesPage', CoursesPage);

export default CoursesPage;