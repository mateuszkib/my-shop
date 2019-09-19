const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThumbImageAnnouncementSchema = new Schema({
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
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = ThumbImageAnnouncement = mongoose.model('thumbImageAnnouncement', ThumbImageAnnouncementSchema);