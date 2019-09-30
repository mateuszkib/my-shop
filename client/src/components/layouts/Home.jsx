import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {getCategories} from "../../actions/category";
import CategoryItem from "../categories/CategoryItem";

const Home = () => {
    const myRef = useRef(null);
    const arrowDownIcon = {
        color: "black",
        fontSize: "25px"
    };
    const scrollToRef = (ref) => window.scrollTo({top: ref.current.offsetTop, behavior: 'smooth'});

    return (
        <div>
            <div className="home-baner-container">
                <div className="text-container">
                    <p className={'text-baner'}>Witamy w Matmarket</p>
                    <p className={'text-baner'}>Portal z ogłoszeniami</p>
                </div>
                <div className={"button-down-container"} onClick={() => scrollToRef(myRef)}>
                    <span className={"button-baner"}>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            style={arrowDownIcon}
                        />
                    </span>
                </div>
            </div>
            <div className={'container-fluid'} ref={myRef}>
                <div className="card">
                    <img className="card-img-top" src="" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the
                            bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
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
    {getCategories}
)(Home);
