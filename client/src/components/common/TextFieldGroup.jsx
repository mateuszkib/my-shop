import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TextFieldGroup = ({name, type, value, onChange, disabled, placeholder, label, icon, className, currency}) => {
    return (
        <div className={className ? className + ' form-group input-group' : 'form-group input-group'}>
            {icon && <div className="input-group-prepend">
                <span className="input-group-text"> <FontAwesomeIcon icon={icon}/></span>
            </div>
            }
            <input type={type}
                   name={name}
                   value={value}
                   label={label}
                   onChange={onChange}
                   className={'form-control'}
                   placeholder={placeholder}
                   disabled={disabled}/>
            {currency && <h6 className={'d-flex align-items-center ml-2'}>{currency}</h6>}
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
    className: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default TextFieldGroup;
