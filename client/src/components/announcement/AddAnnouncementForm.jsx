import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from "axios";

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
            setFiles([acceptedFiles]);
        }
    });

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

    const uploadFiles = async e => {
        e.preventDefault();
        const formData = new FormData();
        console.log(files);
        formData.append("file", files[0][0]);
        try {
            const res = await axios.post(
                "/api/private/announcement/upload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } catch (e) {
            console.log(e);
        }
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
                    Files :{files.map(file => file.map(f => f.name))}
                    <div
                        className={"d-flex align-items-end"}
                        style={{ height: "100%" }}
                    >
                        <button
                            className={"btn btn-block btn-dark"}
                            onClick={uploadFiles}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

AddAnnouncementForm.propTypes = {};

export default AddAnnouncementForm;
