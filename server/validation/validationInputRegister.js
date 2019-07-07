const validator = require('validator');

module.exports = function validateInputRegister(data) {
    let errors = [];

    if (!validator.isEmail(data.email)) {
        errors.push({msg: 'The Email is incorrect'})
    }

    if (validator.isEmpty(data.email)) {
        errors.push({msg: 'Email is required'})
    }

    if (!validator.isLength(data.name, {min: 4, max: 32})) {
        errors.push({msg: 'Name length must between 4 and 32 characters!'})
    }

    if (validator.isEmpty(data.name)) {
        errors.push({msg: 'Name is required'})
    }

    if (validator.isEmpty(data.password)) {
        errors.push({msg: 'Password is required'})
    }

    if (!validator.isLength(data.password, {min: 6, max: 32})) {
        errors.push({msg: 'Password length must between 6 and 32 characters!'})
    }

    return {
        errors
    }
};