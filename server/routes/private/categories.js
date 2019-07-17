const express = require("express");
const router = express.Router();
const passport = require("passport");
const empty = require('is-empty');
const fs = require("fs");
const config = require("../../config/config");
const multer = require("multer");
const upload = multer({
    dest: "tmp/"
});
const auth = require('../../middleware/auth');

// Load models
const Category = require("../../models/Category");
const Image = require('../../models/Images');

// Load validation
const validationInputAddCategory = require('../../validation/validationInputAddCategory');

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (e) {
        console.log(e);
    }
});

router.post("/add", upload.single("file"), (req, res) => {

    const {errors} = validationInputAddCategory(req.body);

    if (!empty(errors)) {
        return res.json({
            errors
        })
    }

    if (!req.file) {
        return res.json({
            success: false,
            errors: [{msg: 'File is required!'}]
        })
    }

    let folder = config.pathCategoryImage;
    let path = config.pathCategoryImage + req.file.originalname;
    let tmp = 1;
    let fileName = req.file.originalname;

    while (fs.existsSync(path)) {
        path = config.pathCategoryImage + "(" + tmp + ")" + req.file.originalname;
        fileName = "(" + tmp + ")" + req.file.originalname;
        tmp++;
    }

    const newCategory = new Category({
        name: req.body.name,
    });

    newCategory
        .save()
        .then(category => {
            fs.rename(req.file.path, path, function (err) {
                if (err) throw err;
            });

            const newImage = new Image({
                folder,
                fileName,
                categoryID: category._id
            });

            newImage.save();

            return res.json({
                success: true,
                errors: [{msg: 'Category successfully saved'}]
            });
        })
        .catch(err => {
            console.log(err.name);
            return res.json({
                success: false,
                errors: [{msg: 'Error occurred while saved category'}]
            });
        });
});

router.get('/image/:categoryID', async (req, res) => {
    try {
        const image = await Image.find({'categoryID': req.params.categoryID}).select('folder fileName categoryID -_id');
        const path = process.cwd() + '/' + image[0].folder + image[0].fileName;

        res.setHeader("Content-type", "image/jpeg");
        res.sendFile(path);

    } catch (e) {
        res.status(500).json({
            success: false,
            errors: [{msg: 'Error occurred while found image'}]
        })
    }
});

module.exports = router;
