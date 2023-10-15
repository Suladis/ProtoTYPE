// Express Framework
const express = require('express'); // Import Express.js library
const path = require('path'); // Import 'path' module for working with file and directory paths
const fs = require('fs'); // import fs modile for working with the file system
const app = express(); // create an Express application

//Path to public directory for static files
const publicPath = path.join(__dirname, 'public');

// Serve static files from the 'public' folder
app.use(express.static(publicPath));

// define route for the root url
app.get('/', (req, res) => {
    // index path
  const indexPath = path.join(publicPath, 'index.html');
  
  // Use a try-catch block to handle potential errors
  try {
    if (!fs.existsSync(indexPath)) {
      // Check if the file exists
      throw new Error(`File not found: ${indexPath}`);
    }

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
