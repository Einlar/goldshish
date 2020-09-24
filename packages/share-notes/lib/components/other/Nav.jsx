import React from 'react';
import { useCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';

//links in the navbar
const nav = [
    { name: 'Home', to: '/' },
    { name: 'Courses', to: '/courses' },
    { name: 'Professors', to: '/profs' },
    { name: 'Folders', to: '/folders' },
    { name: 'Notes', to: '/notes' },
    //{ name: 'Share Note', to: '/share' },
];

const Nav = () => {
    const { currentUser } = useCurrentUser();
    return (
        <div className="nav red">
            {nav.map((item) => (
                <NavItem key={item.name} item={item} />
            ))}
            {currentUser && Users.isAdmin(currentUser) && <NavItem item={{ name: "Admin", to: '/admin' }}/>} {/* Admin link */}
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