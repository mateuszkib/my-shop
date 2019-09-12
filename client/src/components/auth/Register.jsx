import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {register} from "../../actions/auth";
import {setAlert} from "../../actions/alert";
import TextFieldGroup from "../common/TextFieldGroup";
import Alert from '../layouts/Alert';

const Register = ({setAlert, register, isRegister}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });


    const onSubmit = async e => {
        e.preventDefault();

        register(formData);
    };

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Redirect if register success
    if (isRegister) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className="container add-category-form mt-5">
            <Alert/>
            <article className="card-body mx-auto col" style={{"maxWidth": "600px"}}>
                <h4 className="card-title mt-3 text-center">Rejestracja</h4>
                <form onSubmit={onSubmit}>
                    <TextFieldGroup name="name" placeholder={'Nazwa konta..'} type='text' onChange={onChange}
                                    value={formData.name} icon={faUser}
                    />

                    <TextFieldGroup name="email" placeholder={'Email..'} type='text' onChange={onChange}
                                    value={formData.email} icon={faEnvelope}
                    />

                    <TextFieldGroup name="password" placeholder={'Hasło..'} type='password' onChange={onChange}
                                    value={formData.password} icon={faLock}
                    />

                    <TextFieldGroup name="passwordConfirm" placeholder={'Powtórz hasło..'} type='password'
                                    onChange={onChange}
                                    value={formData.passwordConfirm} icon={faLock}
                    />

                    <div className="form-group">
                        <button type="submit" className="btn btn-light btn-block font-weight-bold">Zarejestruj
                        </button>
                    </div>

                    <p className="text-center">Masz konto? <Link to="/login">Zaloguj się</Link></p>
                </form>
            </article>
        </div>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isRegister: PropTypes.bool,
};

const mapStateToProps = state => ({
    isRegister: state.auth.isRegister
});

export default connect(mapStateToProps, {register, setAlert})(Register);