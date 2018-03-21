const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    data: {
        type: Buffer
    },
    contentType: {
        type: String,
        required: true
    }
});

const Image = module.exports = mongoose.model('Image', ImageSchema);