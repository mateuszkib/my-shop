import React, { Fragment } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/">
                    <img src={logo} alt={logo} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">
                                Home <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;
