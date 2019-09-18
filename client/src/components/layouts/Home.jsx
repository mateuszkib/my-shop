import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "../../actions/category";
import CategoryItem from "../categories/CategoryItem";

const Home = () => {
    const arrowDownIcon = {
        color: "black",
        fontSize: "25px"
    };

    return (
        <div>
            <div className="container-fluid home-baner-container">
                <div className="text-container">
                    <p className="text-baner">Witamy w Matmarket</p>
                    <p className="text-baner">Portal z ogłoszeniami</p>
                </div>
                <div className="button-down-container">
                    <span className="button-baner">
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            style={arrowDownIcon}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {
    getCategories: PropTypes.func
};

export default connect(
    null,
    { getCategories }
)(Home);
