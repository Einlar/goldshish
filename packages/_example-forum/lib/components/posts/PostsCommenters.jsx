import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Posts } from '../../modules/posts/index.js';

const PostsCommenters = ({ post }) => {
  return (
    <div className="posts-commenters">
      <div className="posts-commenters-avatars">
        {_.take(post.commenters, 4).map(
          user => user && <Components.UsersAvatar key={user._id} user={user} />
        )}
      </div>
      <div className="posts-commenters-discuss">
        <Link to={Posts.getPageUrl(post)}>
          <Components.Icon name="comment" />
          <span className="posts-commenters-comments-count">
            {post.comments && post.comments.length}
          </span>
          <span className="sr-only">Comments</span>
        </Link>
      </div>
    </div>
  );
};

PostsCommenters.displayName = 'PostsCommenters';

registerComponent({ name: 'PostsCommenters', component: PostsCommenters });
