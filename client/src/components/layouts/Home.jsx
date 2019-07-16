import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCategories} from "../../actions/category";

const Home = ({getCategories}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const res = getCategories();
        res.then(res => setCategories(res))
    }, []);

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

export default connect(null, {getCategories})(Home);