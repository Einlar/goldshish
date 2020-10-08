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
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossOrigin="anonymous"/>
                    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossOrigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossOrigin="anonymous"
    ></script> {/* onload="renderMathInElement(document.body);" */}
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
            </Helmet>  {/* Basic CSS */}
        </div>
        <div className="top">
            <Nav />
        </div>
        <div className="header red">
            <h1 className="title">Goldshish.it</h1>
            <h2 className="home-subtitle">Sharing is Strength</h2>
        </div>
        <div className="main-content">
            {children}
        </div>
    </div>
);

replaceComponent('Layout', Layout);

export default Layout;