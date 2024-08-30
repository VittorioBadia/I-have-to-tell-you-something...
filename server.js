const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to handle CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // This is typically the Live Server URL
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// In-memory storage (replace with a database in production)
const messages = {};

// Root path handler
app.get('/', (req, res) => {
    const id = req.query.id;
    if (id && messages[id]) {
        // If an ID is provided and a message exists, serve the shared.html page
        res.sendFile(path.join(__dirname, 'public', 'shared.html'));
    } else {
        // Otherwise, serve the index.html page
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

// Endpoint to save a message
app.post('/save-message', (req, res) => {
    const message = req.body.message;
    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    const id = uuidv4();
    messages[id] = message;
    const link = `${req.protocol}://${req.get('host')}?id=${id}`;
    
    res.json({ link: link });
});

// Endpoint to get a message by ID
app.get('/message/:id', (req, res) => {
    const id = req.params.id;
    const message = messages[id];
    
    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ message: message });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});