import React, {Fragment} from "react";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

const Navbar = ({user, logout}) => {
    const handleClickLogout = () => {
        logout();
    };

    const notAuthNavbar = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Rejestracja
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Logowanie
                </Link>
            </li>
        </ul>
    );

    const authNavbar = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
                <Link to="/profile" className="nav-link">
                    {user && (
                        <img
                            src={user.avatar}
                            alt={user.avatar}
                            width={"24px"}
                            height={"24px"}
                            className={"rounded-circle"}
                        />
                    )}{" "}
                    Profil
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/logout"
                    className="nav-link"
                    onClick={handleClickLogout}
                >
                    Wyloguj
                </Link>
            </li>
        </ul>
    );

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/">
                    <img className={"logo"} src={logo} alt={logo}/>
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
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Strona główna <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>
                    {user === null ? notAuthNavbar : authNavbar}
                </div>
            </nav>
        </Fragment>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    {logout}
)(Navbar);
