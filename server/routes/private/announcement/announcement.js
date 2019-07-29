const express = require("express");
const router = express.Router();
const passport = require("passport");
const empty = require("is-empty");
const fs = require("fs");
const auth = require("../../../middleware/auth");
const { updatedDiff } = require("deep-object-diff");
const multer = require("multer");
const upload = multer({
    dest: "tmp/"
});

// Load models
const Advertisement = require("../../../models/Announcement");

// Load validation
const validationInputAddAdvertisement = require("../../../validation/validationInputAddAdvertisement");

router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors } = validationInputAddAdvertisement(req.body);

        if (!empty(errors)) {
            return res.json({
                success: false,
                errors
            });
        }

        // Advertisement.find({ title: req.body.title }).then(adv => {
        //     if (adv) {
        //         errors.title = "errorTitleExist";
        //         return res.json({
        //             success: false,
        //             errors
        //         });
        //     }
        // });

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
            telephoneNumber: req.body.number
        };

        newAdvert
            .save()
            .then(result => {
                return res.json({
                    success: true,
                    message: "successAddAdvertisement"
                });
            })
            .catch(err => {
                console.log(err);
                return res.json({
                    success: false,
                    message: "errorAddAdvertisement"
                });
            });
    }
);

router.post(
    "/edit/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors } = validationInputAddAdvertisement(req.body);
        const advId = req.params.id;

        if (!empty(errors)) {
            return res.json({
                success: false,
                errors
            });
        }

        const newAdvertisementData = {
            title: req.body.title,
            description: req.body.description,
            contactDetails: {
                localization: req.body.localization,
                name: req.body.name,
                email: req.body.email,
                telephoneNumber: Number(req.body.number)
            }
        };

        Advertisement.findById(advId)
            .then(adv => {
                const advertisement = {
                    title: adv.title,
                    description: adv.description,
                    contactDetails: {
                        localization: adv.contactDetails[0].localization,
                        name: adv.contactDetails[0].name,
                        email: adv.contactDetails[0].email,
                        telephoneNumber: adv.contactDetails[0].telephoneNumber
                    }
                };

                const difference = updatedDiff(
                    advertisement,
                    newAdvertisementData
                );

                if (empty(difference)) {
                    return res.json({
                        success: false,
                        message: "dataAdvertisementNoChange"
                    });
                } else {
                    for (var key in difference) {
                        adv[key] = difference[key];
                    }

                    adv.save()
                        .then(() => {
                            return res.json({
                                success: true,
                                message: "successUpdateAdvertisementData"
                            });
                        })
                        .catch(err => {
                            return res.json({
                                success: false,
                                message: "errorUpdateAdvertisementData"
                            });
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
);

router.post(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const advId = req.params.id;

        Advertisement.findByIdAndRemove(advId)
            .then(() => {
                return res.json({
                    success: true,
                    message: "successDeleteAdvertisement"
                });
            })
            .catch(err => {
                console.log(err);
                return res.json({
                    success: false,
                    message: "errorDeleteAdvertisement"
                });
            });
    }
);

module.exports = router;
