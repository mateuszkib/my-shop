const mongoose = require('mongoose');
const keys = require('../config/config');


module.exports.connect = (uri) => {
    mongoose.connect(uri, {useNewUrlParser: true } )
        .then(res => console.log("DB connected!"))
        .catch(err => console.log(err));
};