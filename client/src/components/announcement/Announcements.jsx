import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAnnouncements } from "../../actions/announcement";
import { Link } from "react-router-dom";
import Alert from "../layouts/Alert";
import AdvertisementItem from "./AdvertisementItem";

const Announcement = ({ getAnnouncements, match, advertisements }) => {
    const category = match.params.category;

    useEffect(() => {
        getAnnouncements(category);
    }, []);

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-lg-6 offset-lg-3"}>
                    <Alert />
                </div>
            </div>
            <div className={"row mt-5 justify-content-between"}>
                <div className={"col-lg-2"}>
                    <Link to={`/`} className={"btn btn-info icon back-button"}>
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
            <div className={"row mt-5"}>
                <div className={"col-lg-12"}>
                    <div className="list-group">
                        {advertisements.payload &&
                            advertisements.payload.map(advertisement => (
                                <AdvertisementItem
                                    advertisement={advertisement}
                                />
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
    { getAnnouncements }
)(Announcement);
