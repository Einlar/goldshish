import { addRoute, Components } from 'meteor/vulcan:core';

import '../components/courses/CoursesList.jsx';
import '../components/courses/CoursesPage.jsx';

const adminAccessOptions = {
    groups: ['admins'],
    redirect: '/log-in',
};

const routes = [
    {name: 'courses', path: '/', componentName: 'CoursesList'},
    {name: 'courses.page', path: '/course/:slug', componentName: 'CoursesPage'}, //Course page
    {name: 'courses.submit', path: '/share', componentName: 'CoursesNew'},
    {name: 'courses.users', path: '/log-in', componentName: 'CoursesUsers'},
];

addRoute(routes);