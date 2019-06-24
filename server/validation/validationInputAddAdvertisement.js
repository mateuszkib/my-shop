const validator = require('validator');

module.exports = function validateInputAddAdvertisement(data) {
    const errors = {};

    if (!validator.isLength(data.description, {min: 6, max: 5000})) {
        errors.description = 'Description length must between 6 and 5000 characters!'
    }

    if (!validator.isLength(data.title, {min: 6, max: 50})) {
        errors.title = 'Title length must between 6 and 50 characters!'
    }

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title is required!';
    }

    if (validator.isEmpty(data.description)) {
        errors.description = 'Description is required!';
    }

    if (validator.isEmpty(data.localization)) {
        errors.localization = 'Localization is required!';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name is required!';
    }

    return {
        errors
    }

};