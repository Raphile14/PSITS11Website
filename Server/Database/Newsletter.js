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

const newsletterSchema = new mongoose.Schema({
    firstName: requestRequired,
    lastName: requestRequired,
    email: requestRequired,
    isSubscribed: requestBoolean,
    reason: requestNotRequired
});

module.exports = Newsletter = mongoose.model('tbl_newsletters', newsletterSchema);