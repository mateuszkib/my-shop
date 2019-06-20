const express = require('express');
const router = express.Router();
const hash = require('object-hash');
const config = require('../../../config/config');

const User = require('../../../models/User');

router.get('/activate/:hash', (req, res) => {
    const splitHash = req.params.hash.split('-');
    const userId = splitHash[0];

    User.findOne({_id: userId})
        .then(user => {
            if (splitHash[1] === hash(user.name + config.salt)) {
                user.activatedAt = Date.now();

                user.save()
                    .then(() => {
                        res.json({
                            success: true,
                            message: 'accountActivated'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            success: false,
                            message: 'errorSaveUser'
                        })
                    });
            } else {
                res.json({
                    success: false,
                    message: 'errorActivateAccountUser'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'errorFoundUser'
            })
        })
});

module.exports = router;