import React from "react";
import PropTypes from "prop-types";

const SelectFieldGroup = ({options, onChange, value}) => {
    return (
        <div>
            <select className="form-control" onChange={onChange} value={value}>
                {options.map((option, key) => (
                    <option key={key}>{option}</option>
                ))}
            </select>
        </div>
    );
};

SelectFieldGroup.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default SelectFieldGroup;
