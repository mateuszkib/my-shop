const validator = require('validator');

module.exports = function validationInputLogin(data) {
    const errors = {};

    if (!validator.isEmail(data.email)) {
        errors.email = "The email is incorrect!"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }

    if (!validator.isLength(data.password, {min: 6, max: 32})) {
        errors.password = "Password length must between 6 and 32 characters!";
    }

    return {
        errors,
    }
};