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
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"/>
                    <script src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"></script>
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
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