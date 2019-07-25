const express = require("express");
const router = express.Router();

// Load models
const Advertisement = require("../../../models/Announcement");

router.get("/", (req, res) => {
    Advertisement.find()
        .then(() => {
            return res.json({
                success: true,
                message: "successGetAllAdvertisement"
            });
        })
        .catch(err => {
            console.log(err);
            return res.json({
                success: false,
                message: "errorGetAllAdvertisement"
            });
        });
});

router.get("/:name", (req, res) => {
    const categoryName = req.params.name;
    Advertisement.find({ name: categoryName })
        .then(adv => {
            console.log(adv);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
