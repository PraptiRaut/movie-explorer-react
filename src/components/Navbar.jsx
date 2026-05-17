import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">Movie Explorer</h2>
            <ul className="nav-links">
                <li> <NavLink to="/">Home</NavLink></li>
                <li> <NavLink to="/favorites">Favorites</NavLink>
                </li>
            </ul>

        </nav>
    );
}

export default Navbar;