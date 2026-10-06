import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return(
            <div>
                <nav>
                    <Link to="/">DashBoard</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </div>
        )
    }
}

export default Navbar;