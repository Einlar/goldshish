import { addRoute, Components } from 'meteor/vulcan:core';

const adminAccessOptions = {
    groups: ['admins'],
    redirect: '/log-in',
};

const routes = [
    {name: 'home', path: '/', componentName: 'CoursesHome'},
    {name: 'courses', path: '/courses', componentName: 'CoursesList'},
    {name: 'courses.new', path: '/newcourse', componentName: 'CoursesNew'},
    {name: 'newnote', path: '/share', componentName: 'NotesNew'},
    {name: 'note.page', path: '/notes/:course_slug/:slug', componentName: 'NotesPage'},
    {name: 'folder.page', path: '/folders/:course_slug/:slug', componentName: 'FoldersPage'},
   // {name: 'courses.page', path: '/course/:slug', componentName: 'CoursesPage'}, //Course page
   // {name: 'courses.submit', path: '/share', componentName: 'CoursesNew'},
    {name: 'courses.users', path: '/log-in', componentName: 'CoursesUsers'},
    // {name: 'professors', path:'/profs', componentName: 'ProfessorsList'},
    {name: 'folders', path:'/folders', componentName: 'FoldersList'},
    {name: 'notes', path:'/notes', componentName: 'NotesList'},
];

addRoute(routes);