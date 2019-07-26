import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAdvertisements } from "../../actions/announcement";
import { Link } from "react-router-dom";

const Announcement = ({ getAdvertisements, match }) => {
    useEffect(() => {
        getAdvertisements(match.params.category);
    }, []);

    return (
        <div className={"container-fluid"}>
            <div className={"row mt-5 text-right"}>
                <div className={"col"}>
                    <Link
                        to={"/announcement/add"}
                        className={"btn btn-success"}
                    >
                        Add advertisement
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default connect(
    null,
    { getAdvertisements }
)(Announcement);
