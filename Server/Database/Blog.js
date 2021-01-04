const mongoose = require('mongoose');

const requestRequired = {
    type: String,
    required: true
}

const requestNotRequired = {
    type: String,
    required: false
}

const requestBoolean = {
    type: Boolean,
    required: true
}

const blogSchema = new mongoose.Schema({
    title: requestRequired,
    date: requestRequired,
    updatedAt: requestNotRequired,
    authorID: requestRequired,
    description: requestBoolean,
    coverImageLink: requestRequired
});

module.exports = Blog = mongoose.model('tbl_blogs', blogSchema);