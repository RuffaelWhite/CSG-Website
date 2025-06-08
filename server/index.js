const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle contact form POST request
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  // For now, just send a simple response
  res.send(`<h1>Thank you, ${name}!</h1><p>Your message has been received.</p><a href="/">Back to Home</a>`);
});

// Load SSL certificate and key (self-signed)
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
};

const PORT = 443;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 CSG site running at https://www.csg.com`);
});
