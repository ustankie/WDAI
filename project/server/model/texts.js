const mongoose = require('mongoose')
const { Schema } = mongoose

const textSchema = new Schema({
    title: String,
    author_name: String,
    author: String,
    text: String,
    published: Date
})

const TextModel = mongoose.model('Text', textSchema);

module.exports = TextModel;