const validator = require("validator");

module.exports = function validateInputAddAdvertisement(data) {
    const errors = [];

    if (
        !validator.isLength(data.title, {min: 6, max: 50}) &&
        !validator.isEmpty(data.name)
    ) {
        errors.push({msg: "Title length must between 6 and 50 characters", name: "title"});
    }

    if (validator.isEmpty(data.title)) {
        errors.push({msg: "Title is required!", name: "title"});
    }

    if (
        !validator.isLength(data.description, {min: 6, max: 5000}) &&
        !validator.isEmpty(data.name)
    ) {
        errors.push({
            msg: "Description length must between 6 and 5000 characters!",
            name: "description"
        });
    }

    if (validator.isEmpty(data.description)) {
        errors.push({msg: "Description is required!", name: "description"});
    }

    if (validator.isEmpty(data.localization)) {
        errors.push({msg: "Localization is required!", name: "localization"});
    }

    if (
        !validator.isLength(data.name, {min: 4, max: 50}) &&
        !validator.isEmpty(data.name)
    ) {
        errors.push({
            msg: "Name length must between 6 and 50 characters!",
            name: "name"
        });
    }

    if (validator.isEmpty(data.name)) {
        errors.push({msg: "Name is required!", name: "name"});
    }

    let reg = /^[0-9]*$/;
    let result = reg.test(data.price);

    if (!result) {
        errors.push({msg: "Pole cena może zawierać tylko cyfry!", name: "price"})
    }

    return {
        errors
    };
};
