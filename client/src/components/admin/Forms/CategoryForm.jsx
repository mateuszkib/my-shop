import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import TextFieldGroup from "../../common/TextFieldGroup";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { addCategory } from "../../../actions/category";
import Alert from "../../layouts/Alert";

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

function CategoryForm({ errors, addCategory }) {
    const [file, setFile] = useState("");
    const [form, setForm] = useState({
        name: ""
    });

    const multiple = false;
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
            setFile(acceptedFiles[0]);
        }
    });

    const onChange = e => {
        setFile(e.target.files[0]);
    };

    const onChangeInput = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", form.name);

        addCategory(formData);

        if (errors.length === 0) {
            setFile("");
            setForm({ ...form, name: "" });
        }
    };

    const handleDeleteClick = () => {
        setFile("");
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isDragActive, isDragReject]
    );

    return (
        <React.Fragment>
            <div className={"container"}>
                <Alert />
            </div>

            <form onSubmit={onSubmit}>
                <section className="container add-category-form">
                    <div className="row justify-content-md-center">
                        <div className="col col-lg-6 mt-5">
                            <h2 className="text-center">Dodawanie kategorii</h2>
                            <TextFieldGroup
                                type="text"
                                name={"name"}
                                onChange={onChangeInput}
                                placeholder="Nazwa kategorii..."
                                value={form.name}
                            />
                            <div {...getRootProps({ style })}>
                                <input
                                    {...getInputProps()}
                                    onChange={onChange}
                                />
                                <p>
                                    Przeciągnij i upuść plik, albo kliknij aby
                                    wybrać plik
                                </p>
                            </div>
                            <aside>
                                <h4 className="mt-2 mb-3">Załączone pliki</h4>
                                {file !== "" && (
                                    <>
                                        <div className="row mb-3">
                                            <div className="col-lg-11">
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        {file.name}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                className="col-lg-1 flex-delete-icon"
                                                onClick={handleDeleteClick}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="icon-hover"
                                                    color="#ff6666"
                                                />
                                            </div>
                                        </div>
                                    </>
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
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    errors: state.categories.errors
});

export default connect(
    mapStateToProps,
    { addCategory }
)(CategoryForm);
