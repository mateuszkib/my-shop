const express = require("express");
const router = express.Router();

// Load models
const Image = require("../../../models/Image");

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
        }).select("-_id");
        const path = process.cwd() + "/" + image[0].folder + image[0].fileName;

        res.set({
            "Content-type": "image/jpeg",
            "Image-type": image[0].fileType
        });
        res.sendFile(path);
    } catch (e) {
        res.status(500).json({
            success: false,
            errors: [{ msg: "Error occurred while found image" }]
        });
    }
});

module.exports = router;
