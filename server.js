
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set up storage engine for IPA files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware for serving static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Serve the frontend page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle IPA file upload
app.post('/upload', upload.single('ipaFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send(`File uploaded successfully: <a href="/uploads/${req.file.filename}">Download</a>`);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
