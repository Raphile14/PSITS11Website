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
    authorID: requestRequired,
    description: requestBoolean,
    isResolved: requestBoolean,
    severity: requestRequired
});

module.exports = Contact = mongoose.model('tbl_contacts', blogSchema);