import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
    name,
    rows,
    cols,
    onChange,
    disabled,
    placeholder,
    label
}) => {
    return (
        <div className="form-group input-group">
            <textarea
                rows={rows}
                cols={cols}
                name={name}
                label={label}
                onChange={onChange}
                className="form-control"
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    rows: PropTypes.number,
    cols: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default TextAreaFieldGroup;
