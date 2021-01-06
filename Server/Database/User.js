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

const userSchema = new mongoose.Schema({
    firstName: requestRequired,
    lastName: requestRequired,
    email: requestRequired,
    phoneNumber: requestRequired,
    date: requestNotRequired,
    modified: requestNotRequired,
    course: requestRequired, 
    school: requestRequired,
    year_level: requestRequired,    
    profilePictureImageLink: requestNotRequired,    
    isOfficer: requestBoolean,
    isadmin: requestBoolean,
    isConfirmed: requestBoolean
});

module.exports = User = mongoose.model('tbl_users', userSchema);