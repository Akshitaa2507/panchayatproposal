const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: { type: String, unique: true, required: true },
    name: String,
    email: String,
    phone: String,
    role: { type: String, enum: ['panchayat', 'bdo', 'dc'], required: true },
    password: String,
    otp: String,
    otpExpires: Date,
    bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to BDO for Panchayat
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    dc: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }   // Reference to DC for BDO
});

module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     userID: { type: String, unique: true, required: true },
//     name: String,
//     email: String,
//     phone: String,
//     role: { type: String, enum: ['panchayat', 'bdo', 'dc'], required: true },
//     district: { type: mongoose.Schema.Types.ObjectId, ref: 'District' }, // Reference to District
//     password: String,
//     otp: String,
//     otpExpires: Date,
//     bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to BDO for Panchayat
//     dc: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }   // Reference to DC for BDO
// });

// module.exports = mongoose.model('User', UserSchema);


// models/District.js



// // models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     userID: { type: String, unique: true, required: true },
//     name: String,
//     email: String,
//     phone: String,
//     role: { type: String, enum: ['panchayat', 'bdo', 'dc'], required: true },
//     district: String,
//     password: String,
//     otp: String,
//     otpExpires: Date,
//     bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to BDO for Panchayat
//     dc: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }   // Reference to DC for BDO
// });

// module.exports = mongoose.model('User', UserSchema);
