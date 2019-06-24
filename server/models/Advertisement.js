const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = require('./AdvertImage');
const Contact = require('./ContactDetail');

const AdvertisementSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [Image.schema],
    contactDetails: [Contact.schema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
    },
    modifiedAt: {
        type: Date
    },
    expiredAt: {
        type: Date,
        required: true
    }
});

module.exports = Advertisement = mongoose.model('adverts', AdvertisementSchema);