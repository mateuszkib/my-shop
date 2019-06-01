const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalDataSchema = new Schema({
   gender: {
       type: String,
       enum: ['male', 'female']
   },
    firstName: {
       type: String,
    },
    lastName: {
       type: String,
    },
    country: {
       type: String
    },
    city: {
       type: String,
    },
    zipCode: {
        type: String,
    },
    Street: {
       type: String,
    },
    numberPhone: {
       type: String
    }
});

module.exports = PersonalData = mongoose.model('personalsData', PersonalDataSchema);