import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import Alert from "../layouts/Alert";
import {connect} from 'react-redux';
import TextFieldGroup from "../common/TextFieldGroup";
import {login} from "../../actions/auth";

const Login = ({login}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
        e.preventDefault();

        login(formData);
    };

    return (
        <div className="container add-category-form mt-5">
            <Alert/>
            <article className="card-body mx-auto col" style={{"maxWidth": "600px"}}>
                <h4 className="card-title mt-3 text-center">Login</h4>
                <form onSubmit={onSubmit}>
                    <TextFieldGroup placeholder={'Email...'} name={'email'} type={'text'} value={formData.email}
                                    icon={faEnvelope} onChange={onChange}/>

                    <TextFieldGroup placeholder={'Password...'} name={'password'} type={'password'}
                                    value={formData.password}
                                    icon={faLock} onChange={onChange}/>

                    <div className="form-group">
                        <button type="submit" className="btn btn-light btn-block font-weight-bold">Sign In
                        </button>
                    </div>

                </form>
            </article>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(null, {login})(Login);