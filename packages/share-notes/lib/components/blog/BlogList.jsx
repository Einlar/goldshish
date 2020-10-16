import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const BlogList = () => {
    return (
        <div className="blog-list">
            <Components.Datatable
                collectionName="Blog"
                showNew={true}
                showEdit={true}
                showSearch={true}
            />
        </div>
    );
};

registerComponent({ name: 'BlogList', component: BlogList });

export default BlogList;