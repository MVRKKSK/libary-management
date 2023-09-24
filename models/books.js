const mongoose = require("mongoose")
const ObjectId = mongoose.ObjectId

const booksModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("books", booksModel)