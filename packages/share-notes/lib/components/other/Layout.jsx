import React from 'react';
import { replaceComponent } from 'meteor/vulcan:core';

import Nav from './Nav.jsx';
import FilesUsers from '../files/FilesUsers.jsx';
import { Helmet } from 'react-helmet';

//Add Nav-bar, logo, footer...


const Layout = ({ children }) => (
    <div style={{maxWidth: '500px', margin: '20px auto'}}>
        <div className="header"> 
            <Helmet>
                    <link 
                        name="bootstrap"
                        rel="stylesheet"
                        type="text/css"
                        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    /> 
                    <link
                        name="custom_css"
                        rel="stylesheet"
                        type="text/css"
                        href="./css/main.css"
                    />
            </Helmet>  {/* Basic CSS */}
        </div>

        <div className="sidebar">
            <Nav /> 
        </div>
        
        <div className="main-content">
            {children}
        </div>
    </div>
);

replaceComponent('Layout', Layout);

export default Layout;