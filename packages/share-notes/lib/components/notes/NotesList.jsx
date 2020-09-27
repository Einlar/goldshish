import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Notes from '../../modules/notes/collection.js';

const NotesList = () => {
    //Do something here

    return (
        <div className="Notes-list">
            <Components.Datatable
                collection={Notes}
                options={{fragmentName: "noteFragment", mutationFragmentName: "noteFragment"}}
                editFormProps={{queryFragmentName: "noteEditQuery"}}
                /* The EditForm gets a prop named "document" containing all the data of the row being edited on. Normally this uses just the basic schema, but here we want to use a custom (nested) one, and so we specify it in the queryFragmentName*/
            showNew={true}
            showEdit={true}
            showSearch={true}/>
        </div>
    );
};

registerComponent({ name: 'NotesList', component: NotesList });

export default NotesList;