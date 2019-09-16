import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAnnouncements} from "../../actions/announcement";
import {Link} from "react-router-dom";
import Alert from "../layouts/Alert";
import AnnouncementItem from "./AnnouncementItem";

const Announcement = ({getAnnouncements, match, announcements}) => {
    const category = match.params.category;

    useEffect(() => {
        getAnnouncements(category);
    }, [announcements]);

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-lg-6 offset-lg-3"}>
                    <Alert/>
                </div>
            </div>
            <div className={"row mt-5 justify-content-between"}>
                <div className={"col-lg-2"}>
                    <Link to={`/`} className={"btn btn-info icon back-button"}>
                        Powrót
                    </Link>
                </div>
                <div className={"col-lg-3 text-right"}>
                    <Link
                        to={`/announcement/${category}/add`}
                        className={"btn btn-success add-before-icon"}
                    >
                        Dodaj ogłoszenie
                    </Link>
                </div>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-lg-12"}>
                    <div className="list-group">
                        {announcements.payload &&
                        announcements.payload.map(announcement => (
                            <AnnouncementItem
                                announcement={announcement}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    announcements: state.advertisements
});

export default connect(
    mapStateToProps,
    {getAnnouncements}
)(Announcement);
