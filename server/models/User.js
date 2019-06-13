const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalData = require('./PersonalData');

const UserSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        deletedAt: {
            type: Date,
        },
        personalData: [PersonalData.schema],

    }
);

module.exports = User = mongoose.model('users', UserSchema);