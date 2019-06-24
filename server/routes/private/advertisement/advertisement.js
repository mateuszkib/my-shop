const express = require('express');
const router = express.Router();
const passport = require('passport');
const empty = require('is-empty');

// Load models
const Advertisement = require('../../../models/Advertisement');
const User = require('../../../models/User');

// Load validation
const validationInputAddAdvertisement = require('../../../validation/validationInputAddAdvertisement');

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors} = validationInputAddAdvertisement(req.body);

    if (!empty(errors)) {
        return res.json({
            success: false,
            errors
        })
    }

    const newAdvert = new Advertisement({
        userID: req.user._id,
        categoryID: req.user._id,
        title: req.body.title,
        description: req.body.description,
        expiredAt: Date.now()
    });

    newAdvert.contactDetails = {
        localization: req.body.localization,
        name: req.body.name,
        email: req.body.email,
        telephoneNumber: 509535743
    };

    newAdvert.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })


});

module.exports = router;