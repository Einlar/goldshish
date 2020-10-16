import { addRoute, Components } from 'meteor/vulcan:core';

const adminAccessOptions = {
    groups: ['admins'],
    redirect: '/log-in',
};

const routes = [
    {name: 'home', path: '/', componentName: 'CoursesHome'},
    {name: 'courses.new', path: '/newcourse', componentName: 'CoursesNew'},
    {name: 'courses.edit', path: '/newcourse/:courseid', componentName: 'CoursesNew'},
    {name: 'folders.new', path: '/courses/newfolder/:courseid', componentName: 'FoldersNew'},
    {name: 'folders.edit', path: '/newfolder/:folderid', componentName: 'FoldersNew'},
    {name: 'courses.page', path: '/courses/:slug', componentName: 'CoursesPage'},
    {name: 'newnote', path: '/share/:courseid/:folderid', componentName: 'NotesNew'},
    {name: 'newnote2', path: '/share', componentName: 'NotesNew'},
    {name: 'note.page', path: '/notes/:course_slug/:slug', componentName: 'NotesPage'},
    {name: 'folder.page', path: '/folders/:course_slug/:slug', componentName: 'FoldersPage'},
    {name: 'notes.edit', path: '/edit/notes/:noteid', componentName: 'NotesEdit'},
    {name: 'notes.newver', path: '/edit/notes/:noteid/:newver', componentName: 'NotesEdit'},
   // {name: 'courses.page', path: '/course/:slug', componentName: 'CoursesPage'}, //Course page
    {name: 'courses.users', path: '/log-in', componentName: 'CoursesUsers'},
    {name: 'courses', path: '/admin/courses', componentName: 'CoursesList', access: adminAccessOptions},
    {name: 'admin.folders', path:'/admin/folders', componentName: 'FoldersList', access: adminAccessOptions},
    {name: 'admin.notes', path:'/admin/notes', componentName: 'NotesList', access: adminAccessOptions},
    {name: 'admin.blog', path: '/admin/blog',
    componentName: 'BlogList', access: adminAccessOptions },
    {name: 'blog.posts', path: '/blog', componentName: 'BlogHome'},
    {name: 'blog.new', path: '/newblog', componentName: 'BlogNew' },
];

addRoute(routes);