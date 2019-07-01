const express = require("express");
const router = express.Router();

// Load models
const Advertisement = require("../../../models/Advertisement");

router.get("/all", (req, res) => {
  Advertisement.find()
    .then(adv => {
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

router.get("/show/:id", (req, res) => {
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
