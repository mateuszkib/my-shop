const express = require("express");
const router = express.Router();

// Load models
const Image = require("../../../models/ImagesCategory");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (e) {
        console.log(e);
    }
});

router.get("/image/:categoryID", async (req, res) => {
    try {
        const image = await Image.find({
            categoryID: req.params.categoryID
        }).select("folder fileName categoryID -_id");
        const path = process.cwd() + "/" + image[0].folder + image[0].fileName;

        res.setHeader("Content-type", "image/jpeg");
        res.sendFile(path);
    } catch (e) {
        res.status(500).json({
            success: false,
            errors: [{ msg: "Error occurred while found image" }]
        });
    }
});

module.exports = router;
