import React from 'react';
import { Components, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

const CoursesUsers = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="courses-users">
      <div>
        {currentUser && (
          <p>
            Welcome, {currentUser.displayName} {currentUser.isAdmin && `(admin)`}
          </p>
        )}
        { <Components.AccountsLoginForm redirect={false} /> }
      </div>
    </div>
  );
};

registerComponent({ name: 'CoursesUsers', component: CoursesUsers });

export default CoursesUsers;
