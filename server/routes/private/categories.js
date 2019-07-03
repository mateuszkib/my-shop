const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load models
const Category = require('../../models/Category');

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    });

    newCategory.save()
        .then(() => {
            return res.json({
                success: true,
                message: 'successSaveCategory'
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                message: 'errorSaveCategory'
            })
        })
});

module.exports = router;