import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import TextFieldGroup from "../common/TextFieldGroup";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
};

const activeStyle = {
    borderColor: "#2196f3"
};

const acceptStyle = {
    borderColor: "#00e676"
};

const rejectStyle = {
    borderColor: "#ff1744"
};

const AddAnnouncementForm = props => {
    const [files, setFiles] = useState([]);

    const multiple = true;
    const {
        isDragActive,
        getRootProps,
        isDragAccept,
        getInputProps,
        isDragReject
    } = useDropzone({
        accept: "image/png, image/jpeg",
        multiple,
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map((file, key) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        key
                    })
                )
            );
        }
    });

    const handleDeleteImageClick = key => {
        const res = files.filter(item => item.key !== key);
        setFiles([...res]);
    };

    const thumbsContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16
    };

    const thumb = {
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
        position: "relative"
    };

    const thumbInner = {
        display: "flex",
        minWidth: 0,
        overflow: "hidden"
    };

    const img = {
        display: "block",
        width: "auto",
        height: "100%"
    };

    const deleteIcon = {
        position: "absolute",
        right: "3px",
        color: "#ff6666"
    };

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt={file.name} />
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="icon-hover"
                    style={deleteIcon}
                    onClick={() => handleDeleteImageClick(file.key)}
                />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );

    const onChange = e => {
        console.log(e.target.files);
    };

    return (
        <section className="container">
            <div className="row justify-content-md-center">
                <div className="col col-lg-6 mt-5">
                    <h2 className="text-center">Add advertisement</h2>
                    <TextFieldGroup
                        name={"title"}
                        placeholder={"Title..."}
                        type={"text"}
                    />
                    <TextFieldGroup
                        type={"text"}
                        name={"description"}
                        placeholder={"Description..."}
                    />
                    <TextFieldGroup
                        type={"text"}
                        name={"localization"}
                        placeholder={"Localization..."}
                    />
                    <TextFieldGroup
                        name={"name"}
                        placeholder={"Name..."}
                        type={"text"}
                    />
                    <TextFieldGroup
                        name={"email"}
                        placeholder={"Email..."}
                        type={"text"}
                    />
                    <TextFieldGroup
                        type={"text"}
                        name={"telephoneNumber"}
                        placeholder={"Telephone number..."}
                    />
                    <div className="text-right">
                        <button className="btn btn-block btn-dark">Add</button>
                    </div>
                </div>
                <div className={"col col-lg-6 mt-5"}>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} onChange={onChange} />
                        <p>
                            Przeciągnij i upuść plik, albo kliknij aby wybrać
                            plik
                        </p>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                </div>
            </div>
        </section>
    );
};

AddAnnouncementForm.propTypes = {};

export default AddAnnouncementForm;
