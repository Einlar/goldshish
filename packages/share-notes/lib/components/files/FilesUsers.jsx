import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';

const FilesUsers = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="files-users">
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

export default FilesUsers;
