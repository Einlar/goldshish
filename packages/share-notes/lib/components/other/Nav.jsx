import React from 'react';
import { useCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';

//links in the navbar
const nav = [
    { name: 'Home', to: '/' },
];

const admin_nav = [
    { name: 'Courses', to: '/admin/courses' },
    { name: 'Folders', to: '/admin/folders' },
    { name: 'Notes', to: '/admin/notes' },
];

const Nav = () => {
    const { currentUser } = useCurrentUser();

    return (
        <div className="nav red">
            {nav.map((item) => (
                <NavItem key={item.name} item={item} />
            ))}
            {currentUser && Users.isAdmin(currentUser) && admin_nav.map((item) => (
                <NavItem key={item.name} item={item} />
            ))} {/* Admin link */}
            {currentUser ? <NavItem item={{ name: currentUser.username, to: '/log-in' }} /> : <NavItem item={{ name: 'Log-in', to: '/log-in' }} /> } {/* Login button */}
        </div>
    )
}

const NavItem = ({ item }) => {
    const { name, to } = item;
    return (
        <Link to={to} className="nav-item">
            {name}
        </Link>
    );
};

export default Nav;