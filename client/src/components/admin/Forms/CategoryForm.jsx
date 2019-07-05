import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import TextFieldGroup from "../../common/TextFieldGroup";
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

function Basic(props) {
    const [file, setFile] = useState("");
    const [name, setName] = useState("");

    const multiple = false;
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ multiple, accept: "image/*" });

    const onChange = e => {
        setFile(e.target.files[0]);
    };

    const onChangeInput = e => {
        setName(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        console.log(formData);
        try {
            const res = await axios.post("/api/categories/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );

    return (
        <form onSubmit={onSubmit}>
            <section className="container add-category-form">
                <div className="row justify-content-md-center">
                    <div className="col col-lg-6 mt-5">
                        <h2 className="text-center">Dodawanie kategorii</h2>
                        <TextFieldGroup
                            type="text"
                            name={name}
                            onChange={onChangeInput}
                            placeholder="Nazwa kategorii..."
                        />
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} onChange={onChange} />
                            <p>
                                Przeciągnij i upuść plik, albo kliknij aby
                                wybrać plik
                            </p>
                        </div>
                        <aside>
                            <h4 className="mt-2 mb-3">Załączone pliki</h4>
                            {file !== "" && (
                                <ul className="list-group mb-3">
                                    <li className="list-group-item">
                                        {file.name}
                                    </li>
                                </ul>
                            )}
                        </aside>
                        <div className="text-right">
                            <button className="btn btn-block btn-dark">
                                Dodaj
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
}

export default Basic;
