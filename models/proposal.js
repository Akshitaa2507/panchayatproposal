const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    // Common fields
    ctitle: { type: String },
    cdescription: { type: String },
    cattachment: { type: String }, // Added this for citizen
    pattachment:{ type: String},
    pcomments:{type:String},
    cstatus: { type: String, enum: ['Pending', 'Approved','Rejected'], default: 'Pending' },
    comments_by_panchayat: { type: String },
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'Citizen' },
    panchayat: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Fields specific to user proposals
    headType: { type: String},
    requestDescription: { type: String},
    attachment: { type: String },
    estimatedCost: { type: Number },
    bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dc: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['submitted', 'reviewed_by_bdo', 'reviewed_by_dc_approved', 'reviewed_by_dc_rejected', 'reviewed_by_dc_modified'], default: 'submitted' },
    comments: String,
    revisedEstimate_by_bdo: Number,
    revisedEstimate_by_dc: Number,
    comments_by_bdo: String,
    comments_by_dc: String,
    funds: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', ProposalSchema);


// const mongoose = require('mongoose');

// const ProposalSchema = new mongoose.Schema({
//     // Common fields
//     ctitle: { type: String },
//     cdescription: { type: String },
//     cattachment: { type: String }, // Added this for citizen
//     pattachment:{ type: String},
//     pcomments:{type:String},
//     cstatus: { type: String, enum: ['Pending', 'Approved','Rejected'], default: 'Pending' },
//     comments_by_panchayat: { type: String },
//     citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'Citizen' },
//     panchayat: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

//     // Fields specific to user proposals
//     headType: { type: String},
//     requestDescription: { type: String},
//     attachment: { type: String },
//     estimatedCost: { type: Number },
//     bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     dc: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     district: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     status: { type: String, enum: ['submitted', 'reviewed_by_bdo', 'reviewed_by_dc_approved', 'reviewed_by_dc_rejected', 'reviewed_by_dc_modified'], default: 'submitted' },
//     comments: String,
//     revisedEstimate_by_bdo: Number,
//     revisedEstimate_by_dc: Number,
//     comments_by_bdo: String,
//     comments_by_dc: String,
//     funds: Number,
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Proposal', ProposalSchema);

// // module.exports = mongoose.model('Proposal', ProposalSchema);
// const mongoose = require('mongoose');

// const ProposalSchema = new mongoose.Schema({
//     headType: { type: String, required: true },
//     requestDescription: { type: String, required: true },
//     attachment: { type: String, required: true },
//     estimatedCost: { type: Number, required: true },
//     panchayat: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     bdo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     dc: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     district: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add this line
//     status: { type: String, enum: ['submitted', 'reviewed_by_bdo', 'reviewed_by_dc_approved', 'reviewed_by_dc_rejected', 'reviewed_by_dc_modified'], default: 'submitted' },
//     comments: String,
//     revisedEstimate_by_bdo: Number,
//     revisedEstimate_by_dc: Number,
//     comments_by_bdo:String,
//     comments_by_dc:String,
//     funds: Number,
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Proposal', ProposalSchema);
