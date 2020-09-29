import React from 'react';
import { Components, registerComponent, useMulti2 } from 'meteor/vulcan:core';

import { Link } from 'react-router-dom';

import { IconStar } from '../other/Icons.jsx';

result = {};

const CoursesHome = () => {
    const { results = [], data, loading } = useMulti2({
        collectionName: 'Courses', fragmentName: 'CourseFolders', //input: { filter: {_withStarred: { starred: true } } },
    })

    return (
        <div className="courses-list">
            { loading ? (<Components.Loading/>) : 
                results.map(course =>
                    (
                        <div className="course" key={course._id}>
                            <Link to={`/courses/${course.slug}`}><h2 className="course-title">{course.courseName}</h2></Link>
                            <div className="starred-notes-container">
                                {
                                    course.notes.length ? 
                                    course.notes.map(
                                        note => (
                                            <Link to={`/notes/${course.slug}/${note.slug}`} key={note._id}>
                                                <div className="note">
                                                <IconStar/>
                                                {note.noteName}
                                                </div>
                                            </Link>
                                        )
                                    ) :
                                    ( <p style={{display: 'none'}}>No starred notes here</p> )
                                }
                            </div>
                            <div className="starred-folders-container">
                                {
                                    course.folders.length ? 
                                    course.folders.map(
                                        folder => (
                                            <Link to={`/folders/${course.slug}/${folder.slug}`} key={folder._id}>
                                                <div key={folder._id} className="starred-folder">
                                                    {folder.folderName}
                                                </div>
                                            </Link>
                                        )
                                    ) : (<p style={{display: 'none'}}>No starred folders here</p>)
                                }
                            </div>
                        </div>   
                    )
                )
            }
        </div>
    );
};



registerComponent({ name: 'CoursesHome', component: CoursesHome });

export default CoursesHome;