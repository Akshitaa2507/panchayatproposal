const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const Proposal = require('./models/proposal');
// Serve static files from the "public" directory
app.use(express.static('public'));


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer middleware for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
app.get('/', (req, res) => {
    res.send('Welcome to the Proposal Management System');
});
const cors = require('cors');
app.use(cors());


// API endpoint for submitting proposals
// API endpoint for submitting proposals
app.post('/api/submit-proposal', upload.single('attachment'), (req, res) => {
    const { headType, requestDescription, estimatedCost } = req.body;
    const attachment = req.file ? req.file.path : '';

    // Get user ID from authentication (assuming you have user authentication)
    const userId = 'testUserId123';// Update this with the actual way you get the user ID

    // Create new proposal object
    const proposal = new Proposal({
        headType,
        requestDescription,
        attachment,
        estimatedCost,
        submittedBy: userId // Assign the user ID to submittedBy field
    });

    // Save proposal to database
    proposal.save()
        .then(() => {
            res.status(200).json({ message: 'Proposal submitted successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Error submitting proposal' });
        });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const proposalController = require('./controllers/proposalController');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Multer Configuration for File Uploads
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads'); // Set upload destination
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Set file name
//     }
// });
// const upload = multer({ storage: storage });

// // Route for submitting a proposal
// app.post('/api/submit-proposal', upload.single('attachment'), proposalController.submitProposal);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const routes = require('./index');

// const app = express();

// mongoose.connect("mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/', routes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // require('dotenv').config();

// // const app = express();
// // app.use(bodyParser.json());

// // mongoose.connect("mongodb+srv://akshita:Destiny2025@cluster0.cbpad35.mongodb.net/mydatabase")
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log(err));

// // app.get('/', (req, res) => {
// //   res.send('Panchayat Proposal Management System');
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
