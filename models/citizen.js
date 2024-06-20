// models/Citizen.js
const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    panchayat: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Citizen', CitizenSchema);
