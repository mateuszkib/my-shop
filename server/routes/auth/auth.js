const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const hash = require('object-hash');

//Load models
const User = require('../../models/User');

//Load validation input
const validationInputRegister = require('../../validation/validationInputRegister');
const validationInputLogin = require('../../validation/validationInputLogin');

// Load mail functions and objects
const sendMail = require('../../mailFunctions/sendMail');
const activateLink = require('../../mails/activateLink');

router.post('/register', (req, res) => {

    const {errors, isValid} = validationInputRegister(req.body);

    if (!isValid) {
        return res.json(errors);
    }

    User.findOne({
        $or: [
            {email: req.body.email},
            {name: req.body.name}
        ]
    })
        .then(user => {
            let saltRounds = 8;
            let errors = {};

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            if (user) {
                if (user.email === req.body.email) {
                    errors.email = 'User with this email exist!'
                }
                if (user.name === req.body.name) {
                    errors.name = 'User with this name exist!'
                }
                return res.json({
                    success: false,
                    message: errors
                })
            }
            else if (req.body.password !== req.body.passwordConfirm) {
                errors.password = "Passwords are not the same!";
                return res.json({
                    success: false,
                    message: errors
                })
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
                        newUser.password = hashPassword;

                        newUser.save()
                            .then(user => {
                                
                                const urlLinkActivation = config.url + "/activate/" + user._id + "-" + hash(user.name + config.salt);
                                const subject = activateLink.subject.replace(/<SITENAME>/g, config.sitename);
                                const body = activateLink.body.replace(/<URL_ACTIVATION>/g, urlLinkActivation).replace(/<SITENAME>/g, config.sitename);

                                sendMail.send(user.email, subject, body);

                                res.json({
                                    success: true,
                                    user
                                });
                            })
                            .catch(err => {
                                return res.json(err);
                            })
                    });
                });
            }
        })
        .catch(err => {
            res.json({
                success: false,
                err
            })
        });
})
;

router.post('/login', (req, res) => {

    const {errors, isValid} = validationInputLogin(req.body);

    if (!isValid) {
        return res.json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.json({
                    success: false,
                    email: 'User not found!'
                });
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
                            message: 'Authorization successful!',
                            token
                        })
                    } else {
                        return res.json({
                            success: false,
                            password: 'Password incorrect!'
                        })
                    }
                })
                .catch(err => {
                    return res.json({
                        success: false,
                        password: 'errorComparePassword!'
                    })
                })
        })
        .catch(err => {
            return res.json({
                success: false,
                message: 'errorUserFind'
            })
        })
});

module.exports = router;