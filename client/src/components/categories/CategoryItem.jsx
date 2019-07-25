import React, { useEffect, useState } from "react";
import { getImageCategory } from "../../actions/category";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, getImageCategory }) => {
    const [image, setImage] = useState("");
    const [imageType, setImageType] = useState("");

    useEffect(() => {
        const imageCategory = getImageCategory(category._id);
        imageCategory.then(image => {
            const data = image.data;
            setImageType(image.headers["image-type"]);

            const base64 = btoa(
                new Uint8Array(data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            setImage(base64);
        });
    });

    return (
        <React.Fragment>
            <div className={"col"}>
                <div
                    className="card mx-auto"
                    style={{ width: "10rem", height: "15rem", border: "none" }}
                >
                    <div className={"text-center"}>
                        <img
                            src={"data:" + { imageType } + ";base64," + image}
                            alt={""}
                        />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title">{category.name}</h5>

                        <Link
                            to={`/announcement/${category.name}`}
                            className={"btn btn-secondary"}
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default connect(
    null,
    { getImageCategory }
)(CategoryItem);
