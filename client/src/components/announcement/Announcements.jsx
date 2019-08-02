import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAnnouncements } from "../../actions/announcement";
import { Link } from "react-router-dom";

const Announcement = ({ getAnnouncements, match }) => {
    const category = match.params.category;

    useEffect(() => {
        getAnnouncements(category);
    }, []);

    return (
        <div className={"container-fluid"}>
            <div className={"row mt-5 text-right"}>
                <div className={"col"}>
                    <Link
                        to={`/announcement/${category}/add`}
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
    { getAnnouncements }
)(Announcement);
