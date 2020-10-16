import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Folders from '../../modules/folders/collection.js';
import ReactHtmlParser from 'react-html-parser';

const FoldersList = () => {
    //Do something here

    return (
        <div className="folders-list">
            <Components.Datatable
                collection={Folders}
                options={{ fragmentName: "folderFragment" }}
            showNew={true}
            showEdit={true}
            showSearch={true}
            columns={[
                'folderName',
                'user',
                {
                    name: 'description',
                    label: 'Description',
                    component: ({ document }) => (
                        <div>
                            {ReactHtmlParser(document.description)}
                        </div>
                    )
                },
                {
                    name: 'course',
                    label: 'Course',
                    component: ({ document }) => (
                        <div>
                            {document.course.courseName}
                        </div>
                    )
                },
                'starred'
            ]}
            />
        </div>
    );
};

registerComponent({ name: 'FoldersList', component: FoldersList });

export default FoldersList;