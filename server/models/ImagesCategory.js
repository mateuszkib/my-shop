const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    folder: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Images = mongoose.model("images", ImagesSchema);
