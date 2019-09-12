import React, {useMemo, useState, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import RadioFieldGroup from "../common/RadioFieldGroup";
import {addAnnouncement} from "../../actions/announcement";
import Alert from "../layouts/Alert";
import {Link} from "react-router-dom";

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

const AddAnnouncementForm = ({user, addAnnouncement, match, history}) => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        localization: "",
        email: "",
        name: "",
        number: "",
        duration: "3 dni",
        price: "",
        type: ""
    });

    const durations = ["3 dni", "1 tydzień", "2 tygodnie", "1 miesiąc"];
    const types = ["Sprzedam", "Kupię", "Zamienię"];
    const conditions = ["Nowy", "Używany"];

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
            setFiles([
                ...files,
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            ]);
        }
    });

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

    const thumbs = files.map((file, index) =>
        file.map((file, indexNested) => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img src={file.preview} style={img} alt={file.name}/>
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="icon-hover"
                        style={deleteIcon}
                        onClick={() =>
                            handleDeleteImageClick(indexNested, index)
                        }
                    />
                </div>
            </div>
        ))
    );

    const handleDeleteImageClick = (indexNested, index) => {
        files.map((file, i) => {
            if (i === index) {
                file.splice(indexNested, 1);
            }
        });
        setFiles([...files]);
    };

    const handleRadioInputChange = e => {
        setFormData({...formData, type: e.target.value});
    };

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onClickSubmit = e => {
        e.preventDefault();

        let data = new FormData();

        for (let i = 0; i < files.length; i++) {
            for (let j = 0; j < files[i].length; j++) {
                data.append("file", files[i][j]);
            }
        }

        for (let key in formData) {
            data.append(key, formData[key]);
        }

        data.append("category", match.params.category);

        addAnnouncement(data, match.params.category, history);
    };

    useEffect(() => {
        setFormData({...formData, email: user ? user.email : ""});
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [user]);


    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );

    const onChangeSelect = e => {
        setFormData({...formData, duration: e.target.value});
    };

    return (
        <section className="container">
            <div className={"row mt-5"}>
                <div className={"col col-lg-3"}>
                    <Link
                        to={`/announcements/${match.params.category}`}
                        className={"btn btn-info icon back-button mb-5"}
                    >
                        Przejdź do ogłoszeń
                    </Link>
                </div>
            </div>
            <Alert/>
            <div className="row justify-content-md-center">
                <div className="col col-lg-6 mt-5">
                    <TextFieldGroup
                        name={"title"}
                        placeholder={"Tytuł..."}
                        type={"text"}
                        onChange={onChange}
                    />
                    <div className={"col-lg-12"}>
                        <div className={"row mb-3 align-items-center"}>
                            <RadioFieldGroup
                                types={types}
                                onChange={handleRadioInputChange}
                            />
                            <TextFieldGroup
                                className={'w-50 mb-0'}
                                name={"price"}
                                placeholder={"Cena..."}
                                type={"text"}
                                onChange={onChange}
                                currency={'Zł'}
                                disabled={formData.type === 'Kupię' || formData.type === "Zamienię"}
                            />
                        </div>
                    </div>

                    <SelectFieldGroup options={conditions}/>

                    <TextAreaFieldGroup
                        name={"description"}
                        rows={10}
                        placeholder={"Opis..."}
                        onChange={onChange}
                    />
                    <hr/>
                    <h4>Dodaj zdjęcia</h4>
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>
                            Przeciągnij i upuść plik, albo kliknij aby wybrać
                            plik
                        </p>
                    </div>
                    <div style={thumbsContainer}>{thumbs}</div>
                    <hr/>
                    <TextFieldGroup
                        type={"text"}
                        name={"localization"}
                        placeholder={"Lokalizacja..."}
                        onChange={onChange}
                    />
                    <TextFieldGroup
                        name={"name"}
                        placeholder={"Imię..."}
                        type={"text"}
                        onChange={onChange}
                    />
                    <TextFieldGroup
                        name={"email"}
                        placeholder={"Email..."}
                        type={"text"}
                        value={formData.email}
                        disabled={true}
                        onChange={onChange}
                    />
                    <TextFieldGroup
                        type={"text"}
                        name={"number"}
                        placeholder={"Numer telefonu..."}
                        onChange={onChange}
                        value={formData.telephoneNumber}
                    />
                    <h4>Czas trwania</h4>
                    <SelectFieldGroup
                        onChange={onChangeSelect}
                        value={formData.duration}
                        options={durations}
                    />
                    <hr/>
                    <div className="text-right mb-5">
                        <button
                            className="btn btn-block btn-dark"
                            onClick={onClickSubmit}
                        >
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

AddAnnouncementForm.propTypes = {
    user: PropTypes.object,
    addAnnouncement: PropTypes.func
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    {addAnnouncement}
)(AddAnnouncementForm);
