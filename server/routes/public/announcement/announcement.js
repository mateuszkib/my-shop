const express = require("express");
const router = express.Router();

// Load models
const Advertisement = require("../../../models/Announcement");
const Category = require("../../../models/Category");
const Image = require("../../../models/Image");

router.get("/", (req, res) => {
    Advertisement.find()
        .then(adverts => {
            return res.json({
                success: true,
                msg: "List of advertisements successfully get"
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

router.get("/:name", async (req, res) => {
    const categoryName = req.params.name;
    let category = await Category.find({name: categoryName});
    let advertisements = await Advertisement.find({
        categoryID: category[0]._id
    }).sort({createdAt: -1});
    res.json({
        success: true,
        data: advertisements
    });
});

router.get("/image/:advertisementID", async (req, res) => {
    let image = await Advertisement.find({
        'thumb._id': req.params.advertisementID
    });
    res.sendFile(process.cwd() + '/' + image[0].thumb[0].folder + '/' + image[0].thumb[0].fileName);
});

module.exports = router;
