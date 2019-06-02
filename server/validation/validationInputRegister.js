const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateInputRegister(data) {
    let errors = {};

    if (!validator.isEmail(data.email)) {
        errors.email = "The email is incorrect!"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }

    if (!validator.isLength(data.name, {min: 4, max: 32})) {
        errors.name = "Name length must between 4 and 32 character!";
    }

    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required!";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!";
    }

    if (!validator.isLength(data.password, {min: 6, max: 32})) {
        errors.password = "Password length must between 6 and 32 characters!";
    }

    return {
        isValid: isEmpty(errors),
        errors
    }
};