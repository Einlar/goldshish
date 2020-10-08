import React from 'react';
import { Components, useCurrentUser, registerComponent } from 'meteor/vulcan:core';

// import { Accounts } from 'meteor/accounts-base';
// import { addCallback } from 'meteor/vulcan:core';

// async function sendVerificationEmail({
//   document: user
// }) {
//   Accounts.sendVerificationEmail(user._id);
// }

// addCallback('user.create.async', sendVerificationEmail);

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
        { <Components.AccountsLoginForm redirect={false}/> }
      </div>
    </div>
  );
};

registerComponent({ name: 'CoursesUsers', component: CoursesUsers });

export default CoursesUsers;
