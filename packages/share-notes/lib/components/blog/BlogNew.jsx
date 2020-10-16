import React from 'react';
import { Components, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';
import { Link, useHistory } from 'react-router-dom'; //useHistory


const BlogNew = () => {
    const history = useHistory(); //This is necessary for redirecting!

    const { currentUser } = useCurrentUser();

    return (
        <div className="share-note">
            { Users.canCreate({ collectionName: "Blog", user: currentUser }) ?
            ( <div>
                <Components.SmartForm 
                collectionName="Blog"
                cancelCallback = {() => history.goBack()}
                successCallback = {() => {
                    history.goBack();
                }} 
            /></div>
            )
            : <div>Please <Link to="/log-in?redirect=/share">Log-in</Link> to create a blog post.</div> 
            }
        </div>
    );
};

registerComponent({ name: 'BlogNew', component: BlogNew });

export default BlogNew;