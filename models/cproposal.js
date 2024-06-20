// const mongoose = require('mongoose');

// const ProposalSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     status: { type: String, enum: ['Pending', 'Considered', 'Not Considered'], default: 'Pending' },
//     comments_by_panchayat:{type:String},
//     citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'Citizen', required: true },
//     panchayat: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// module.exports = mongoose.model('proposals', ProposalSchema);
