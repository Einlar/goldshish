import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Components, registerComponent } from 'meteor/vulcan:core';

const LoadableEditor = Loadable({
    loader: () => import('./Editor.jsx'),
    loading: () => <Components.Loading/>,
    render: (loaded, props) => {
        return <loaded.default {...props}/>;
    } 
});

class ContainedEditor extends React.Component {
    render () {
        return <LoadableEditor {...this.props}/>;
    }
}

registerComponent({ name: 'Editor', component: ContainedEditor });

