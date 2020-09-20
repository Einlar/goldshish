import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';

import Files from '../../modules/files/collection.js';
import Users from 'meteor/vulcan:users';

const FilesNew = () => {
    const { currentUser } = useCurrentUser();

    return (
    Users.canCreate({ collection: Files, user: currentUser }) ? (
        <div>
            <Components.SmartForm collection={Files} />
        </div>
        ) : null
    );
};

export default FilesNew;