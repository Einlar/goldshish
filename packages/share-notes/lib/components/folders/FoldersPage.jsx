import { Components, registerComponent, useSingle2 } from 'meteor/vulcan:core';

import React from 'react';

const FoldersPage = () => {
    const { slug } = useParams();

    //Select all Notes belonging to this folder //idk
    const { document, loading, error } = useSingle2
}