const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    collectorName: { type: String, required: true },
    collectorPhone: { type: String, required: true },
    collectorEmail: { type: String, required: true }
});

module.exports = mongoose.model('District', districtSchema);
