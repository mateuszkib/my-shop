import React from "react";
import PropTypes from "prop-types";

const SelectFieldGroup = ({ options, onChange, value, name }) => {
    return (
        <select
            className="form-control"
            onChange={onChange}
            name={name}
            value={value}
        >
            {options.map((option, key) => (
                <option key={key}>{option}</option>
            ))}
        </select>
    );
};

SelectFieldGroup.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SelectFieldGroup;
