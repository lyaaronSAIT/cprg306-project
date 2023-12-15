// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/to-watch">To Watch</Link>
                </li>
                {/* Add other navigation links as needed */}
            </ul>
        </nav>
    );
}

export default Navigation;
