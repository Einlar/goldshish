import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Components, registerComponent, useMulti2, useCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import ReactHtmlParser from 'react-html-parser';

const BlogHome = () => {
    const { results = [], loading, refetch } = useMulti2({
        collectionName: 'Blog',
        sort: { createdAt: "desc" },
    });

    const { currentUser } = useCurrentUser();

    useEffect( () => {
        renderMathInElement = require('../other/auto-render.js');
        renderMathInElement(document.body);
        console.log('Location changed');
        refetch();
    }); //, [location] 

    return (
        <div className="blog-home">
            { currentUser && Users.isAdmin(currentUser) ? (
                <Link to={`/newblog`}>Add new post</Link>
            ) : null }
            { loading ? (<Components.Loading/>) :
            results.map( post => (
                <div className="blog-post" key={post._id}>
                    <h2 className="course-title">
                        {post.postTitle}
                    </h2>
                    <div className="description">
                        {ReactHtmlParser(post.content)}
                    </div>
                    { /* <hr className="dashed"/> */ }
                </div>
            ))
            }
        </div>
    )
}

registerComponent({ name: 'BlogHome', component: BlogHome });

export default BlogHome;