const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactDetailSchema = new Schema({
    localization: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    telephoneNumber: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = ContactDetail = mongoose.model(
    "contactDetail",
    ContactDetailSchema
);
