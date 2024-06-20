// controllers/proposalController.js
const Proposal = require('../models/proposal');
const User = require('../models/user');

// Panchayat: Submit a new proposal
exports.submitProposal = async (req, res) => {
    try {
        const { headType, requestDescription, estimatedCost, attachment } = req.body;
        const panchayat = req.user._id; // Assuming req.user is populated with the authenticated user's data

        const newProposal = new Proposal({
            headType,
            requestDescription,
            estimatedCost,
            attachment,
            panchayat
        });

        await newProposal.save();
        res.status(200).json({ message: 'Proposal submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// BDO: Get proposals for review
exports.getProposalsForBDO = async (req, res) => {
    try {
        const proposals = await Proposal.find({ bdo: req.user._id, status: 'submitted' });
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// BDO: Review a proposal
exports.reviewProposalByBDO = async (req, res) => {
    try {
        const { id } = req.params;
        const { comments, revisedEstimate, recommendation } = req.body;

        const proposal = await Proposal.findById(id);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }

        proposal.comments = comments;
        proposal.revisedEstimate = revisedEstimate;
        proposal.status = recommendation === 'approve' ? 'reviewed' : 'rejected';
        proposal.bdo = req.user._id;

        await proposal.save();
        res.status(200).json({ message: 'Proposal reviewed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DC: Get proposals for final approval
exports.getProposalsForDC = async (req, res) => {
    try {
        const proposals = await Proposal.find({ status: 'reviewed' });
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DC: Approve or reject a proposal
exports.approveProposalByDC = async (req, res) => {
    try {
        const { id } = req.params;
        const { approvalStatus, comments, funds } = req.body;

        const proposal = await Proposal.findById(id);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }

        proposal.comments = comments;
        proposal.funds = funds;
        proposal.status = approvalStatus;
        proposal.dc = req.user._id;

        await proposal.save();
        res.status(200).json({ message: 'Proposal approval status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
