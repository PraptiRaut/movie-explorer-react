import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Movie Explorer</h2>
            <ul>
                <li> <NavLink to="/">Home</NavLink></li>
                <li> <NavLink to="/favorites">Favorites</NavLink>
                </li>
            </ul>

        </nav>
    );
}

export default Navbar;