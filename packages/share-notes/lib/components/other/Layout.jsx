import React from 'react';
import { replaceComponent } from 'meteor/vulcan:core';

import Nav from './Nav.jsx';
import { Helmet } from 'react-helmet';


const Layout = ({ children }) => (
    <div className="page">
        <div className="helmet"> 
            <Helmet>
                    <link 
                        name="bootstrap"
                        rel="stylesheet"
                        type="text/css"
                        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    /> 
            </Helmet>  {/* Basic CSS */}
        </div>
        <div className="top">
            <Nav />
        </div>
        <div className="header red">
            <h1 className="title">Goldshish.it</h1>
            <h2 className="subtitle">Sharing is Strength</h2>
        </div>
        <div className="main-content">
            {children}
        </div>
    </div>
);

replaceComponent('Layout', Layout);

export default Layout;