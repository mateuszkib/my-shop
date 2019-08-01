import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../actions/category";
import CategoryItem from "../categories/CategoryItem";

const Home = ({ getCategories }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const listCategories = getCategories();
        listCategories.then(res => setCategories(res));
    }, [getCategories]);

    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-5">
                    {categories.map(category => (
                        <CategoryItem key={category._id} category={category} />
                    ))}
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
