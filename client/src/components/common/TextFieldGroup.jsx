import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TextFieldGroup = ({name, type, value, onChange, disabled, placeholder, label, icon}) => {
    return (
        <div className="form-group input-group">
            {icon && <div className="input-group-prepend">
                <span className="input-group-text"> <FontAwesomeIcon icon={icon}/></span>
            </div>
            }
            <input type={type}
                   name={name}
                   value={value}
                   label={label}
                   onChange={onChange}
                   className="form-control"
                   placeholder={placeholder}
                   disabled={disabled}/>
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default TextFieldGroup;
