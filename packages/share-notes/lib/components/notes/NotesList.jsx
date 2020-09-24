import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Notes from '../../modules/notes/collection.js';

const NotesList = () => {
    //Do something here

    return (
        <div className="Notes-list">
            <Components.Datatable
                collection={Notes}
            showNew={true}
            showEdit={true}
            showSearch={true}/>
        </div>
    );
};

registerComponent({ name: 'NotesList', component: NotesList });

export default NotesList;