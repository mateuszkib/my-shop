import React, {useEffect, useState} from 'react';
import {getImageCategory} from "../../actions/category";
import {connect} from 'react-redux';

const CategoryItem = ({category, getImageCategory}) => {

    const [image, setImage] = useState("");

    useEffect(() => {
        const imageCategory = getImageCategory(category._id);
        imageCategory.then(data => {
            const base64 = btoa(
                new Uint8Array(data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            setImage(base64);
        })
    });

    return (
        <React.Fragment>
            <ul>
                <li>{category.name}</li>
                <img src={"data:" + 'image/png' + ";base64," + image}/>
            </ul>
        </React.Fragment>
    )
};

export default connect(null, {getImageCategory})(CategoryItem);