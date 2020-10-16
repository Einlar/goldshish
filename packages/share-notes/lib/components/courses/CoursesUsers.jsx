import React from 'react';
import { Components, useCurrentUser, registerComponent } from 'meteor/vulcan:core';
import { useHistory } from 'react-router-dom';

const CoursesUsers = () => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  
  return (
    <div className="courses-users">
      <div>
        {currentUser && (
          <p>
            Welcome, {currentUser.displayName} {currentUser.isAdmin && `(admin)`}
          </p>
        )}
        { <Components.AccountsLoginForm redirect={false}
           onPostSignUpHook={() => history.push('/verify-email/aaa')} /> }
      </div>
    </div>
  );
};

registerComponent({ name: 'CoursesUsers', component: CoursesUsers });

export default CoursesUsers;
