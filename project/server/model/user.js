const mongoose = require('mongoose')
const { Schema, Types } = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ['admin', 'client', 'author'],
        default: 'client'
    },
    favourites: {
        type: [{ type: Types.ObjectId, ref: 'Text' }],
        default: []
    }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;