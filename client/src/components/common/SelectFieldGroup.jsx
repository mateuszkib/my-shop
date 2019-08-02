import React from "react";
import PropTypes from "prop-types";

const SelectFieldGroup = ({ durations }) => {
    return (
        <div>
            <select class="form-control">
                {durations.map(duration => (
                    <option>{duration}</option>
                ))}
            </select>
        </div>
    );
};

SelectFieldGroup.propTypes = {
    durations: PropTypes.array.isRequired
};

export default SelectFieldGroup;
