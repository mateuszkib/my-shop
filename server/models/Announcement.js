const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = require("./ContactDetail");
const Thumb = require("./ThumbImageAnnouncement");

const AdvertisementSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    contactDetails: [Contact.schema],
    thumb: [Thumb.schema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date
    },
    modifiedAt: {
        type: Date
    },
    expiredAt: {
        type: Date,
        required: true
    }
});

module.exports = Advertisement = mongoose.model("adverts", AdvertisementSchema);
