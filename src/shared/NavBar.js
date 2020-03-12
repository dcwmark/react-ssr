// shared/NavBar.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const languages = [{
        name: 'ALL',
        param: 'all',
    }, {
        name: 'JavaScript',
        param: 'javascript',
    }, {
        name: 'Ruby',
        param: 'ruby',
    }, {
        name: 'Python',
        param: 'python',
    }, {
        name: 'Java',
        param: 'java',
    }];

    return ( 
        <ul>
        {   languages.map(({ name, param }) => (
                <li key={param}>
                    <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/popular/${ param }`}>
                        { name }
                    </NavLink>
                </li>
        ))  }
        </ul>
    );
}
 
export default NavBar;
