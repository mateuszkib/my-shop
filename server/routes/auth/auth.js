const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const hash = require('object-hash');
const empty = require('is-empty');

//Load models
const User = require('../../models/User');

//Load validation input
const validationInputRegister = require('../../validation/validationInputRegister');
const validationInputLogin = require('../../validation/validationInputLogin');

// Load mail functions and objects
const sendMail = require('../../mailFunctions/sendMail');
const activateLink = require('../../mails/en/activateLink');

router.post('/register', (req, res) => {

    const {errors} = validationInputRegister(req.body);

    if (!empty(errors)) {
        return res.json({success: false, errors: errors});
    }

    User.findOne({
        $or: [
            {email: req.body.email},
            {name: req.body.name}
        ]
    })
        .then(user => {
            let saltRounds = 8;
            let errors = [];

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            if (user) {
                if (user.email === req.body.email) {
                    errors.push({msg: 'User with this email exist!'})
                }
                if (user.name === req.body.name) {
                    errors.push({msg: 'User with this name exist!'})
                }
                return res.json({
                    success: false,
                    errors: errors
                })
            }
            else if (req.body.password !== req.body.passwordConfirm) {
                return res.json({
                    success: false,
                    errors: [{msg: "Passwords are not the same!"}]
                })
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
                        newUser.password = hashPassword;

                        newUser.save()
                            .then(user => {

                                const urlLinkActivation = config.url + "/api/user/activate/" + user._id + "-" + hash(user.name + config.salt);
                                const subject = activateLink.subject.replace(/<SITENAME>/g, config.sitename);
                                const body = activateLink.body.replace(/<URL_ACTIVATION>/g, urlLinkActivation).replace(/<SITENAME>/g, config.sitename);

                                sendMail.send(user.email, subject, body);

                                res.json({
                                    success: true,
                                    msg: 'We send message to your email with activated account link'
                                });
                            })
                            .catch(err => {
                                return res.json({
                                    success: false,
                                    errors: [{msg: "An error occurred during registration"}]
                                });
                            })
                    });
                });
            }
        })
        .catch(err => {
            res.json({
                success: false,
                errors: [{msg: 'An error occured during found user'}]
            })
        });
})
;

router.post('/login', (req, res) => {

    const {errors} = validationInputLogin(req.body);

    if (!empty(errors)) {
        return res.json({success: false, errors: errors});
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.json({
                    success: false,
                    errors: [{msg: 'This user doesn\'t exist'}]
                });
            } else if (user.activatedAt === undefined) {

                return res.json({
                    success: false,
                    errors: [{msg: 'Your account is not activated! Please check your Email'}]
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (result) {
                        const payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        };

                        const token = jwt.sign(payload, config.secretKey, {
                            expiresIn: '24h'
                        });

                        res.json({
                            success: true,
                            msg: 'Authorization successful!',
                            token
                        })
                    } else {
                        return res.json({
                            success: false,
                            errors: [{msg: 'Password incorrect!'}]
                        })
                    }
                })
                .catch(err => {
                    return res.json({
                        success: false,
                        errors: [{msg: 'Password are not the same!'}]
                    })
                })
        })
        .catch(err => {
            return res.json({
                success: false,
                errors: [{msg: 'An error occurred with get user'}]
            })
        })
});

module.exports = router;