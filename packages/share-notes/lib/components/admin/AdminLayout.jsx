import React from 'react';
import { replaceComponent } from 'meteor/vulcan:core';

import Nav from './Nav.jsx';
import { Helmet } from 'react-helmet';


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