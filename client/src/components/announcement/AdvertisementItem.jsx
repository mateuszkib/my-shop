import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { getMainImageAdvertisement } from "../../actions/announcement";

const AdvertisementItem = ({ advertisement, getMainImageAdvertisement }) => {
    useEffect(() => {
        getMainImageAdvertisement(advertisement._id);
    }, []);

    return (
        <div className="list-group mb-2">
            <a href="#" className="list-group-item list-group-item-action">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-lg-2"}>E</div>
                        <div className={"col-lg-6"}>E</div>
                        <div className={"col-lg-3"}>E</div>
                    </div>
                </div>
                {/* <div className={"d-flex flex-row justify-content-between"}>
                    <h5 className="mb-1">{advertisement.title}</h5>
                    <small>
                        {advertisement.contactDetails[0].localization +
                            ", " +
                            moment(advertisement.createdAt).format("lll")}
                    </small>
                </div> */}
                {/* <div className={"d-flex"}>E</div>
                <div className="d-flex flex-row">
                    <h5 className="mb-1">{advertisement.title}</h5>
                    <small>
                        {advertisement.contactDetails[0].localization +
                            ", " +
                            moment(advertisement.createdAt).format("lll")}
                    </small>
                </div>
                <div className={"d-flex flex-row"}>
                    <p className="mb-1">{advertisement.description}</p>
                    <small className={"font-weight-bold text-right d-block"}>
                        Expired: {moment(advertisement.expiredAt).format("lll")}
                    </small>
                </div> */}
            </a>
        </div>
    );
};

AdvertisementItem.propTypes = {};

export default connect(
    null,
    { getMainImageAdvertisement }
)(AdvertisementItem);
