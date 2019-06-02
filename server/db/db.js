const mongoose = require('mongoose');

module.exports.connect = (uri) => {
    mongoose.connect(uri, {useNewUrlParser: true } )
        .then(res => console.log("DB connected!"))
        .catch(err => console.log(err));
};