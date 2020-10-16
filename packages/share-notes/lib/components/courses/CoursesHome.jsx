import React, { useEffect, useState } from 'react';
import { Components, registerComponent, useMulti2, useCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Form from 'react-bootstrap/Form';

import { Link, useLocation } from 'react-router-dom';

import { IconStar, IconPlus } from '../other/Icons.jsx';

handleUpdate = (value) => {
    console.log("Got", value);
}

result = {};

const CoursesHome = () => {
    const { results = [], data, loading, refetch } = useMulti2({
        collectionName: 'Courses', fragmentName: 'CourseFolders', //input: { filter: {_withStarred: { starred: true } } },
    })

    const userObj = useCurrentUser(); //Get current user
    const currentUser = userObj.currentUser
    const refetchUser = userObj.refetch

    const location = useLocation();

    const [filter, setFilter] = useState("");

    useEffect( () => {
        console.log('Location changed');
        refetch(); 
        refetchUser();
    }, [location]);

    return (
    <div className="courses-home">
        <div className="form-group row editor" style={{justifyContent: 'center', alignItems: 'baseline'}}>
            <div className="col-sm-4">
                <Components.FormItem>
                    <Form.Control type="text" placeholder="Search a course..." onChange={(event) => setFilter(event.target.value)}/>
                </Components.FormItem>
            </div>
            {
                currentUser ?
                (
                    Users.isMemberOf(currentUser, 'verifiedEmail') ? 
                    (
                        <Link to={`/newcourse`}><div className="note"><IconPlus/>New course</div></Link>
                    ) : (
                        <p>Please <Link to={`/verify-email/aaa`}>verify</Link> your e-mail to unlock permissions.</p>
                    )
                ) : null
            }
        </div>
        <div className="courses-list">
            { loading ? (<Components.Loading/>) : 
                results.map(course =>
                    ( (filter == "") || course.courseName.toLowerCase().includes(filter.toLowerCase()) ) ? 
                    (
                        <div className="course" key={course._id}>
                            <Link to={`/courses/${course.slug}`}><h2 className="course-title">{course.courseName}</h2></Link>
                            <div className="starred-notes-container">
                                {
                                    course.notes.length ? 
                                    _.map(_.groupBy(course.notes, 'slug'), (versions, slug) => 
                                        {
                                            const latest = _.sortBy(versions, 'version').pop();

                                            return (
                                                <Link to={`/notes/${course.slug}/${slug}`} key={latest._id}>
                                                    <div className="note">
                                                    <IconStar/>
                                                    {latest.noteName}
                                                    </div>
                                                </Link>
                                            )
                                        }
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
                                <Link to={`/courses/${course.slug}`}>
                                    <div className="starred-folder">
                                        Show more...
                                    </div>
                                </Link>
                            </div>
                        </div>   
                    ) : null
                ) 
            }
        </div>
    </div>
    );
};



registerComponent({ name: 'CoursesHome', component: CoursesHome });

export default CoursesHome;