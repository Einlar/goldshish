import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Professors from '../../modules/professors/collection.js';

const ProfessorsList = () => {
    //Do something here

    return (
        <div className="professors-list">
            <Components.Datatable
                collection={Professors}
                options={{ fragmentName: "professorFragment" }}
            showNew={true}
            showEdit={true}
            showSearch={true}/>
        </div>
    );
};

registerComponent({ name: 'ProfessorsList', component: ProfessorsList });

export default ProfessorsList;