import React from 'react';
import PropTypes from 'prop-types';

const RadioFieldGroup = ({types, onChange}) => {
    return (
        <div>
            {types.map(type => (
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={'inputRadio'} id="radioInput"
                           value={type} onChange={onChange}/>
                    <label className="form-check-label" htmlFor="radioInput">{type}</label>
                </div>
            ))}
        </div>
    );
};

RadioFieldGroup.propTypes = {
    types: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default RadioFieldGroup;