const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    folder: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Category = mongoose.model("categories", CategorySchema);
CategorySchema.plugin(uniqueValidator);
