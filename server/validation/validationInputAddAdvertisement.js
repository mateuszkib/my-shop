const validator = require('validator');

module.exports = function validateInputAddAdvertisement(data) {
    const errors = [{}];

    if (!validator.isLength(data.description, {min: 6, max: 5000})) {
        errors.push({msg: 'Description length must between 6 and 5000 characters!'})
    }

    if (!validator.isLength(data.title, {min: 6, max: 50})) {
        errors.push({msg: 'Title length must between 6 and 50 characters'})
    }

    if (validator.isEmpty(data.title)) {
        errors.push({msg: 'Title is required!'})
    }

    if (validator.isEmpty(data.description)) {
        errors.push({msg: 'Description is required!'})
    }

    if (validator.isEmpty(data.localization)) {
        errors.push({msg: 'Localization is required!'})
    }

    if (validator.isEmpty(data.name)) {
        errors.push({msg: 'Name is required!'})
    }

    return {
        errors
    }

};