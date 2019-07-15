import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCategories} from "../../actions/category";

const Home = ({getCategories, categories}) => {

    useEffect(() => {
        getCategories();
    }, []);

    console.log(categories);

    return (
        <div>
            {categories.map(category => (
                <li>{category.name}</li>
            ))}
        </div>
    );
};

Home.propTypes = {
    getCategories: PropTypes.func,
};

const mapStateToProps = state => ({
    categories: state.categories.categories
});

export default connect(mapStateToProps, {getCategories})(Home);