import React, {useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {Location} from "history";
import {User} from "../types";

interface NavBarProps {
    user: User | null;
}

/**
 * Navbar component
 * @constructor
 *
 * @return JSX.Element
 */
const NavBar: React.FC<NavBarProps> = ({user}: NavBarProps): JSX.Element => {
    let location: Location = useLocation();
    const newCustomerPath: string = "/customers/new";

    const [value, setValue] = useState(false);

    const toggleNav = (): void => {
        const newValue: boolean = !value;
        setValue(newValue);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">
                Customers
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleNav}>
                <span className="navbar-toggler-icon"/>
            </button>
            <div className={"collapse navbar-collapse" + (value ? ' show' : '')} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">
                            Customers
                        </NavLink>
                    </li>
                    {!user && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">
                                    Register
                                </NavLink>
                            </li>
                        </React.Fragment>
                    )}
                    {user && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    {user.name}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">
                                    Logout
                                </NavLink>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
                {
                    user && location.pathname.indexOf(newCustomerPath) !== 0 ?
                        <Link className="text-white text-decoration-none" to={newCustomerPath}>
                            <button className="btn btn-success my-2 my-sm-0" type="button">
                                Add customer
                            </button>
                        </Link> : null

                }
            </div>
        </nav>
    );
};

export default NavBar;
