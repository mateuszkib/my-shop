const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
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
    announcementID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement"
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Image = mongoose.model("images", ImageSchema);
