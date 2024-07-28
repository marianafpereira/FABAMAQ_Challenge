import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const isUserPage = pathnames.length === 2 && pathnames[0] === 'user';
    const isNewUserPage = pathnames.length === 1 && pathnames[0] === 'new-user';

    const breadcrumbItems = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        if (index === 0 && !isUserPage && !isNewUserPage) {
            return (
                <li key={to}>
                    <Link to="/user/7202320">User</Link>
                </li>
            );
        } else if (index === 1 && value === 'posts-comments') {
            return (
                <li key={to}>
                    <Link to={to}>Posts and Comments</Link>
                </li>
            );
        }
        return null;
    }).filter(Boolean);

    return (
        <nav className="breadcrumb">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isUserPage && !isNewUserPage && breadcrumbItems}
            </ul>
        </nav>
    );
};

export default Breadcrumb;