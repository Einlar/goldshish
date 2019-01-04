/*
The original Logo components is defined using React's
functional stateless component syntax, so we redefine
it the same way. 
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import Users from 'meteor/vulcan:users';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomLogo = ({ logoUrl, siteTitle, currentUser }) => {
  return (
    <div>
      <h1 className="logo-text">
        <NavLink exact to="/">
          ⭐{siteTitle}⭐
        </NavLink>
      </h1>
      {currentUser ? (
        <span className="logo-hello">
          Welcome {Users.getDisplayName(currentUser)} 👋
        </span>
      ) : null}
    </div>
  );
};

replaceComponent('Logo', CustomLogo);
