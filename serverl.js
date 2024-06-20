const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user'); // Ensure the path is correct
const proposalRoutes = require('./routes/proposalRoutes');
// app.js


const Proposal = require('./models/proposal');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
// Login route
app.post('/login', async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await User.findOne({ userID });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Redirect based on user role
        let redirectUrl = '';
        switch (user.role) {
            case 'panchayat':
                redirectUrl = 'http://localhost:3000/dashboard-panchayat.html';
                break;
            case 'bdo':
                redirectUrl = 'http://localhost:3000/dashboard-bdo.html';
                break;
            case 'dc':
                redirectUrl = 'http://localhost:3000/dashboard-dc.html';
                break;
            default:
                return res.status(400).send({ message: 'Invalid user role' });
        }

        res.status(200).send({ redirectUrl });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});
app.post('/api/submit-proposal', authenticateJWT, upload.single('attachment'), async (req, res) => {
    const { headType, requestDescription, estimatedCost } = req.body;
    const attachment = req.file.path;
    const proposal = new Proposal({
        headType,
        requestDescription,
        attachment,
        estimatedCost,
        panchayat: req.user.userID,
        status: 'submitted'
    });
    await proposal.save();
    res.json({ message: 'Proposal submitted successfully' });
});

// Route to get proposals based on user role and status
app.get('/api/proposals', authenticateJWT, async (req, res) => {
    const { status } = req.query;
    let proposals;
    if (req.user.role === 'panchayat') {
        proposals = await Proposal.find({ panchayat: req.user.userID, status });
    } else if (req.user.role === 'bdo') {
        proposals = await Proposal.find({ bdo: req.user.userID, status });
    } else if (req.user.role === 'dc') {
        proposals = await Proposal.find({ dc: req.user.userID, status });
    }
    res.json(proposals);
});

// Route to update proposal status (BDO and DC approval)
app.post('/api/proposals/:id/update', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { status, comments, funds } = req.body;

    const proposal = await Proposal.findById(id);
    if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
    }

    if (req.user.role === 'bdo' && proposal.status === 'submitted') {
        proposal.status = 'under_review_bdo';
        proposal.bdo = req.user.userID;
    } else if (req.user.role === 'dc' && proposal.status === 'under_review_bdo') {
        proposal.status = 'under_review_dc';
        proposal.dc = req.user.userID;
    } else if (req.user.role === 'dc' && proposal.status === 'under_review_dc') {
        proposal.status = 'approved';
    }

    proposal.comments = comments;
    proposal.funds = funds;
    await proposal.save();

    res.json({ message: 'Proposal status updated successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
