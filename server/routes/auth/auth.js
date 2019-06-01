const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Load models
const User = require('../../models/User');

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            let saltRounds = 8;
            let errors = {};

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            if (user) {
                if(user.email === req.body.email) {
                    errors.email = 'User with this email exist!'
                }
                if(user.name === req.body.name) {
                    errors.name = 'User with this name exist!'
                }
                return res.json({
                    success: false,
                    message: errors
                })
            }
            else if(!user && (req.body.password === req.body.passwordConfirm)) {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                console.log(user);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    });
                });
            }
        })
        .catch(err => {

        });
});

module.exports = router;