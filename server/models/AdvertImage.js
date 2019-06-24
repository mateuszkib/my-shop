const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertImageSchema = new Schema({
    folder: {
        type: String,
    },
    fileName: {
        type: String,
    },
    fileType: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = AdvertImage = mongoose.model('advertImages', AdvertImageSchema);