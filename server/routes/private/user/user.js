const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

//Load Model
const User = require('../../../models/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            return res.json({
                success: true,
                user
            });
        } else {
            return res.json({
                success: false,
                errors: [{msg: 'User not found'}]
            })
        }
    } catch (e) {
        console.log(e);
        return res.json({
            success: false,
            e
        })
    }
});

module.exports = router;