import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import moment from "moment";
import "moment/locale/pl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faClock} from "@fortawesome/free-solid-svg-icons";
import {getMainImageAdvertisement} from "../../actions/announcement";

const AnnouncementItem = ({announcement, getMainImageAdvertisement}) => {
    const [image, setImage] = useState("");
    const [imageType, setImageType] = useState("");
    moment().locale("pl");

    useEffect(() => {
        if (announcement) {
            let mainImage = getMainImageAdvertisement(announcement.thumb[0]._id);
            mainImage.then(image => {
                if (image) {
                    const data = image.data;
                    setImageType(image.headers["content-type"]);

                    const base64 = btoa(
                        new Uint8Array(data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                        )
                    );
                    setImage(base64);
                }
            });
        }
    }, []);

    return (
        <div className="list-group mb-2">
            <a href="#" className="list-group-item list-group-item-action">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-lg-3"}>
                            <img
                                src={
                                    "data:" + {imageType} + ";base64," + image
                                }
                                alt={""}
                                width={200}
                                height={150}
                            />
                        </div>
                        <div className={"col-lg-5"}>
                            <p>{announcement.title}</p>
                        </div>
                        <div
                            className={
                                "d-flex flex-column justify-content-between col-lg-4"
                            }
                        >
                            <p className={"text-right"}>
                                {announcement.price + "zł"}
                            </p>
                            <div className={"text-right"}>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className={"mr-1"}
                                    style={{color: "#000099"}}
                                />
                                <p className={"text-right d-inline mr-5"}>
                                    {
                                        announcement.contactDetails[0]
                                            .localization
                                    }
                                </p>
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className={"mr-1"}
                                    style={{color: "#000099"}}
                                />
                                <p className={"d-inline"}>
                                    {moment(announcement.createdAt).format(
                                        "ll"
                                    )}
                                </p>
                            </div>
                        </div>
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

AnnouncementItem.propTypes = {};

export default connect(
    null,
    {getMainImageAdvertisement}
)(AnnouncementItem);
