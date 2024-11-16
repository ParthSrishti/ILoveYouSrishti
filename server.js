// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000; // You can choose any port you prefer

// Serve static files (HTML, CSS, JS) from the project directory
app.use(express.static(path.join(__dirname, '/')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
