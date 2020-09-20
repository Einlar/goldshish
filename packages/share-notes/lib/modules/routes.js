import { addRoute, Components } from 'meteor/vulcan:core';

import '../components/files/FilesList.jsx';
import '../components/files/FilesPage.jsx';

const adminAccessOptions = {
    groups: ['admins'],
    redirect: '/log-in',
};

const routes = [
    {name: 'files', path: '/', componentName: 'FilesList'},
    {name: 'files.page', path: '/:slug', componentName: 'FilesPage'}
];

addRoute(routes);