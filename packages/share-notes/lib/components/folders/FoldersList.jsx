import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Folders from '../../modules/folders/collection.js';

const FoldersList = () => {
    //Do something here

    return (
        <div className="folders-list">
            <Components.Datatable
                collection={Folders}
            showNew={true}
            showEdit={true}
            showSearch={true}
            />
        </div>
    );
};

registerComponent({ name: 'FoldersList', component: FoldersList });

export default FoldersList;