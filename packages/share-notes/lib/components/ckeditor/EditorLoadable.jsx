import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Components, registerComponent } from 'meteor/vulcan:core';

import NoSSR from "react-no-ssr";

const LoadableEditor = Loadable({
    loader: () => import('./Editor.jsx'),
    loading: () => <Components.Loading/>,
    render: (loaded, props) => {
        return <loaded.default {...props}/>;
    } 
});

class ContainedEditor extends React.Component {
    render () {
        return (
            <NoSSR>
                <LoadableEditor {...this.props}/>
            </NoSSR>
        );
    }
}

registerComponent({ name: 'Editor', component: ContainedEditor });

//TODO Maybe update to https://github.com/gregberge/loadable-components since it seems better mantained