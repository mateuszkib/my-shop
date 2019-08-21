import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAnnouncements} from "../../actions/announcement";
import {Link} from "react-router-dom";
import Alert from "../layouts/Alert";
import moment from 'moment';

const Announcement = ({getAnnouncements, match, advertisements}) => {
    const category = match.params.category;

    useEffect(() => {
        getAnnouncements(category);
    }, []);

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-lg-6 offset-lg-3"}>
                    <Alert/>
                </div>
            </div>
            <div className={"row mt-5 justify-content-between"}>
                <div className={"col-lg-2"}>
                    <Link
                        to={`/`}
                        className={"btn btn-info icon back-button"}
                    >
                        Back to Home
                    </Link>
                </div>
                <div className={"col-lg-2"}>
                    <Link
                        to={`/announcement/${category}/add`}
                        className={"btn btn-success"}
                    >
                        Add advertisement
                    </Link>
                </div>
            </div>
            <div className={'row mt-5'}>
                <div className={'col-lg-12'}>
                    <div className="list-group">
                        {advertisements.payload && advertisements.payload.map(advertisement => (
                            <div className="list-group mb-2">
                                <a href="#"
                                   className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{advertisement.title}</h5>
                                        <small>{moment(advertisement.createdAt).format('lll')}</small>
                                    </div>
                                    <p className="mb-1">{advertisement.description}</p>
                                    <small
                                        className={'font-weight-bold text-right d-block'}>Expired: {moment(advertisement.expiredAt).format('lll')}</small>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    advertisements: state.advertisements
});

export default connect(
    mapStateToProps,
    {getAnnouncements}
)(Announcement);
