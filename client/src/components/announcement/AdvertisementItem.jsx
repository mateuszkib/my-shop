import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { getMainImageAdvertisement } from "../../actions/announcement";

const AdvertisementItem = ({ advertisement, getMainImageAdvertisement }) => {
    const [image, setImage] = useState("");
    const [imageType, setImageType] = useState("");

    useEffect(() => {
        let mainImage = getMainImageAdvertisement(advertisement._id);
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
    }, []);

    return (
        <div className="list-group mb-2">
            <a href="#" className="list-group-item list-group-item-action">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-lg-3"}>
                            <img
                                src={
                                    "data:" + { imageType } + ";base64," + image
                                }
                                alt={""}
                                width={200}
                                height={150}
                            />
                        </div>
                        <div className={"col-lg-6"}>
                            <p>{advertisement.title}</p>
                        </div>
                        <div
                            className={
                                "d-flex flex-column justify-content-end col-lg-3"
                            }
                        >
                            <p>
                                {advertisement.contactDetails[0].localization +
                                    ", " +
                                    moment(advertisement.createdAt).format(
                                        "lll"
                                    )}
                            </p>
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

AdvertisementItem.propTypes = {};

export default connect(
    null,
    { getMainImageAdvertisement }
)(AdvertisementItem);
