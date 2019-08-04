import React from "react";
import PropTypes from "prop-types";

const SelectFieldGroup = ({durations, onChange, value}) => {
    return (
        <div>
            <select className="form-control" onChange={onChange} value={value}>
                {durations.map((duration, key) => (
                    <option key={key}>{duration}</option>
                ))}
            </select>
        </div>
    );
};

SelectFieldGroup.propTypes = {
    durations: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default SelectFieldGroup;
