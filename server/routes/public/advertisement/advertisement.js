const express = require("express");
const router = express.Router();

// Load models
const Advertisement = require("../../../models/Advertisement");

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

router.get("/:id", (req, res) => {
    const advId = req.params.id;
    Advertisement.findById(advId)
        .then(adv => {
            console.log(adv);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
