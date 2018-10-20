import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container col s12 m12">
                <Link to='/' className="brand-logo">
                    TE91
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to='/'>Browse</NavLink></li>
                    <li><NavLink to='/'>Add</NavLink></li>
                    <li><NavLink to='/'>Logout</NavLink></li>
                    <li><NavLink to='/' className="btn btn-floating blue lighten-1">ZD</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};

export default Navigation;