import React from 'react';
import { replaceComponent } from 'meteor/vulcan:core';
import FilesUsers from '../files/FilesUsers.jsx';
import { Helmet } from 'react-helmet';

//Add Nav-bar, logo, footer...


const Layout = ({ children }) => (
    <div style={{maxWidth: '500px', margin: '20px auto'}}>
        <Helmet>
                <link 
                    name="bootstrap"
                    rel="stylesheet"
                    type="text/css"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                /> 
        </Helmet>  {/* Basic CSS */}

        <FilesUsers/>
    
        <div className="main-content">
            {children}
        </div>
    </div>
);

replaceComponent('Layout', Layout);

export default Layout;