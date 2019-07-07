const validator = require('validator');

module.exports = function validationInputAddCategory(data) {
    let errors = {};

    if (!validator.isLength(data.name, {min: 3, max: 32})) {
        errors.name = 'Name length must between 6 and 32 characters!'
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name is required!'
    }

    return {
        errors
    }
};