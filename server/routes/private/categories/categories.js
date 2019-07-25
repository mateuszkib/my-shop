const express = require("express");
const router = express.Router();
const empty = require("is-empty");
const fs = require("fs");
const config = require("../../../config/config");
const multer = require("multer");
const upload = multer({
    dest: "tmp/"
});
const auth = require("../../../middleware/auth");

// Load models
const Category = require("../../../models/Category");
const Image = require("../../../models/Image");

// Load validation
const validationInputAddCategory = require("../../../validation/validationInputAddCategory");

router.post("/add", upload.single("file"), auth, (req, res) => {
    const { errors } = validationInputAddCategory(req.body);

    if (!empty(errors)) {
        return res.json({
            success: false,
            errors: [{ msg: errors.name }]
        });
    }

    if (!req.file) {
        return res.json({
            success: false,
            errors: [{ msg: "File is required!" }]
        });
    }

    if (!fs.existsSync(`./${config.pathCategoryImage}`)) {
        fs.mkdir(`./${config.pathCategoryImage}`, { recursive: true }, err => {
            if (err) console.log(err);
        });
    }

    let folder = config.pathCategoryImage;
    let path = config.pathCategoryImage + req.file.originalname;
    let tmp = 1;
    let fileName = req.file.originalname;
    let fileType = req.file.mimetype;

    while (fs.existsSync(path)) {
        path =
            config.pathCategoryImage + "(" + tmp + ")" + req.file.originalname;
        fileName = "(" + tmp + ")" + req.file.originalname;
        tmp++;
    }

    const newCategory = new Category({
        name: req.body.name
    });

    newCategory
        .save()
        .then(category => {
            fs.rename(req.file.path, path, function(err) {
                if (err) throw err;
            });

            const newImage = new Image({
                folder,
                fileName,
                fileType,
                categoryID: category._id
            });

            newImage.save();
            return res.json({
                success: true,
                msg: "Category successfully saved"
            });
        })
        .catch(err => {
            if (err.errors.name.kind === "unique") {
                return res.json({
                    success: false,
                    errors: [{ msg: "Category with this name exists!" }]
                });
            }
            return res.json({
                success: false,
                errors: [{ msg: "Error occurred while saved category" }]
            });
        });
});

module.exports = router;
