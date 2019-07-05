const express = require("express");
const router = express.Router();
const passport = require("passport");
const fs = require("fs");
const config = require("../../config/config");
const multer = require("multer");
const upload = multer({
    dest: "tmp/"
});

// Load models
const Category = require("../../models/Category");

router.post("/add", upload.single("file"), (req, res) => {
    let path = config.pathCategoryImage + req.file.originalname;
    let tmp = 1;
    let fileName = req.file.originalname;

    while (fs.existsSync(path)) {
        path =
            config.pathCategoryImage + "(" + tmp + ")" + req.file.originalname;
        fileName = "(" + tmp + ")" + req.file.originalname;
        tmp++;
    }

    const newCategory = new Category({
        name: req.body.name,
        folder: path,
        fileName
    });

    newCategory
        .save()
        .then(() => {
            fs.rename(req.file.path, path, function(err) {
                if (err) throw err;
            });

            return res.json({
                success: true,
                message: "successSaveCategory"
            });
        })
        .catch(err => {
            console.log(err.name);
            return res.json({
                success: false,
                message: "errorSaveCategory",
                errors: err.name
            });
        });
});

module.exports = router;
