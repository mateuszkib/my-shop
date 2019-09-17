import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../actions/category";
import CategoryItem from "../categories/CategoryItem";

const Home = () => {
    return (
        <div>
            <div className="container-fluid home-baner"></div>
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
