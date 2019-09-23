const express = require("express");
const router = express.Router();
const passport = require("passport");
const empty = require("is-empty");
const fs = require("fs");
const config = require("../../../config/config");
const auth = require("../../../middleware/auth");
const {updatedDiff} = require("deep-object-diff");
const multer = require("multer");
const sharp = require("sharp");
const mkdirp = require('mkdirp');
const upload = multer({
    dest: "tmp/"
});

// Load models
const Advertisement = require("../../../models/Announcement");
const Category = require("../../../models/Category");
const Image = require("../../../models/Image");

// Load validation
const validationInputAddAdvertisement = require("../../../validation/validationInputAddAdvertisement");

router.post("/add", auth, upload.any(), async (req, res) => {
    const {errors} = validationInputAddAdvertisement(req.body);
    let duration = req.body.duration;
    let expiredAdvert = new Date();
    let category = await Category.find({name: req.body.category});
    let folder = config.pathAdvertisementImage + `${req.user.id}`;
    let files = req.files;
    let thumbBuffer = fs.readFileSync(files[0].path);
    let pathThumb = folder + '/thumbs/' + files[0].originalname;
    let thumbName = files[0].originalname;
    let tmp = 1;

    if (!empty(errors)) {
        return res.json({
            success: false,
            errors
        });
    }

    Advertisement.find({title: req.body.title}).then(adv => {
        if (adv.length !== 0) {
            return res.json({
                success: false,
                errors: [
                    {msg: "An advertisement with such a title already exists"}
                ]
            });
        }
    });

    switch (duration) {
        case "3 dni":
            expiredAdvert = expiredAdvert.setDate(expiredAdvert.getDate() + 3);
            break;
        case "1 tydzień":
            expiredAdvert = expiredAdvert.setDate(expiredAdvert.getDate() + 7);
            break;
        case "2 tygodnie":
            expiredAdvert = expiredAdvert.setDate(expiredAdvert.getDate() + 14);
            break;
        case "1 miesiąc":
            expiredAdvert = expiredAdvert.setDate(expiredAdvert.getDate() + 31);
    }

    const newAdvert = new Advertisement({
        userID: req.user.id,
        categoryID: category[0]._id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        condition: req.body.condition,
        expiredAt: expiredAdvert
    });

    newAdvert.contactDetails = {
        localization: req.body.localization,
        name: req.body.name,
        email: req.body.email,
        telephoneNumber: req.body.number
    };

    await mkdirp(folder);
    while (fs.existsSync(pathThumb)) {
        pathThumb = folder + '/thumbs/' + "(" + tmp + ")" + files[0].originalname;
        thumbName = "(" + tmp + ")" + files[0].originalname;
        tmp++;
    }
    await sharp(thumbBuffer)
        .resize({
            width: 200,
            height: 150
        })
        .toFile(pathThumb)
        .then(() => {
            const newThumbImage = {
                folder: folder + '/thumbs',
                fileName: thumbName,
                fileType: files[0].mimetype,
                type: "advert"
            };
            newAdvert.thumb = newThumbImage;
        })
        .catch(err => {
            console.log(err)
        });

    newAdvert
        .save()
        .then(advert => {
            if (
                !fs.existsSync(config.pathAdvertisementImage + `${req.user.id}`)
            ) {
                fs.mkdir(
                    config.pathAdvertisementImage + `${req.user.id}`,
                    {recursive: true},
                    err => {
                        if (err) console.log(err);
                    }
                );
            }

            files.map(file => {
                let path =
                    config.pathAdvertisementImage +
                    `${req.user.id}/` +
                    file.originalname;
                let fileName = file.originalname;
                let i = 1;

                while (fs.existsSync(path)) {
                    path =
                        config.pathAdvertisementImage +
                        `${req.user.id}/` +
                        "(" +
                        i +
                        ")" +
                        file.originalname;
                    fileName = "(" + i + ")" + file.originalname;
                    i++;
                }

                fs.rename(file.path, path, err => {
                    if (err) console.log(err);
                });

                const newFile = new Image({
                    folder,
                    fileName,
                    fileType: file.mimetype,
                    categoryID: category[0]._id,
                    announcementID: advert._id,
                    type: "advert"
                });

                newFile.save();
            });
            res.json({
                success: true,
                msg: "Advertisement successfully added"
            });
        })
        .catch(err => {
            console.log(err);
            return res.json({
                success: false,
                msg: "Error occurred with add advertisement"
            });
        });
});

router.post(
    "/edit/:id",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const {errors} = validationInputAddAdvertisement(req.body);
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
    passport.authenticate("jwt", {session: false}),
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
