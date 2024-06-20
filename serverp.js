const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/panchayat', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const proposalRoutes = require('./routes/proposals');
app.use('/api/proposals', proposalRoutes(upload));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
