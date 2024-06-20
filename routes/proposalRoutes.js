const express = require('express');
const multer = require('multer');
const path = require('path');
const Proposal = require('../models/proposal');
const authenticateJWT = require('../middlwares/authenticateJWT');
const District = require('./models/District');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Submit a proposal
router.post('/submit', authenticateJWT, upload.single('attachment'), async (req, res) => {
    const { headType, requestDescription, estimatedCost } = req.body;
    const attachment = req.file ? req.file.filename : null;

    if (!attachment) {
        return res.status(400).send({ message: 'Attachment is required' });
    }

    try {
        const newProposal = new Proposal({
            headType,
            requestDescription,
            attachment,
            estimatedCost,
            panchayat: req.user._id,
            status: 'submitted'
        });

        await newProposal.save();
        res.status(201).send({ message: 'Proposal submitted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Failed to submit proposal' });
    }
});

module.exports = router;




// // routes/proposalRoutes.js
// const express = require('express');
// const Proposal = require('../models/proposal');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

// // Submit proposal
// router.post('/submit', upload.single('attachment'), async (req, res) => {
//     const { headType, requestDescription, estimatedCost, userID } = req.body;
//     const attachment = req.file ? req.file.path : null;

//     if (!attachment) {
//         return res.status(400).json({ message: 'Attachment is required' });
//     }

//     const proposal = new Proposal({
//         headType,
//         requestDescription,
//         attachment,
//         estimatedCost,
//         panchayat: userID,
//         status: 'submitted'
//     });

//     try {
//         await proposal.save();
//         res.json({ message: 'Proposal submitted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Error submitting proposal', error: err });
//     }
// });

// module.exports = router;


// const express = require('express');
// const Proposal = require('../models/proposal');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

// // Submit proposal
// router.post('/submit', upload.single('attachment'), async (req, res) => {
//     const { headType, requestDescription, estimatedCost, userID } = req.body;
//     const attachment = req.file.path;

//     const proposal = new Proposal({
//         headType,
//         requestDescription,
//         attachment,
//         estimatedCost,
//         panchayat: userID,
//         status: 'submitted'
//     });

//     try {
//         await proposal.save();
//         res.json({ message: 'Proposal submitted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Error submitting proposal', error: err });
//     }
// });

// // Get proposals based on user role and status
// router.get('/', async (req, res) => {
//     const { status, userID, role } = req.query;
//     let proposals;
//     try {
//         if (role === 'panchayat') {
//             proposals = await Proposal.find({ panchayat: userID, status });
//         } else if (role === 'bdo') {
//             proposals = await Proposal.find({ bdo: userID, status });
//         } else if (role === 'dc') {
//             proposals = await Proposal.find({ dc: userID, status });
//         }
//         res.json(proposals);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching proposals', error: err });
//     }
// });

// // Update proposal status
// router.post('/:id/update', async (req, res) => {
//     const { id } = req.params;
//     const { status, comments, funds, userID, role } = req.body;

//     try {
//         const proposal = await Proposal.findById(id);
//         if (!proposal) {
//             return res.status(404).json({ message: 'Proposal not found' });
//         }

//         if (role === 'bdo' && proposal.status === 'submitted') {
//             proposal.status = 'under_review_bdo';
//             proposal.bdo = userID;
//         } else if (role === 'dc' && proposal.status === 'under_review_bdo') {
//             proposal.status = 'under_review_dc';
//             proposal.dc = userID;
//         } else if (role === 'dc' && proposal.status === 'under_review_dc') {
//             proposal.status = 'approved';
//         }

//         proposal.comments = comments;
//         proposal.funds = funds;
//         await proposal.save();

//         res.json({ message: 'Proposal status updated successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Error updating proposal', error: err });
//     }
// });

// module.exports = router;
