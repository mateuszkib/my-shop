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
        avatar: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        deletedAt: {
            type: Date,
        },
        activatedAt: {
            type: Date
        },
        personalData: [PersonalData.schema],

    }
);

module.exports = User = mongoose.model('users', UserSchema);