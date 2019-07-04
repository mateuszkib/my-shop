import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
    name,
    type,
    value,
    onChange,
    disabled,
    placeholder,
    label
}) => {
    return (
        <div className="input-group mb-3">
            <input
                type={type}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
                className="form-control"
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default TextFieldGroup;
