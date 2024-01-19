const express = require("express");
const app = express();
const port = 3000;

const path = require('path');

// Static middleware for static file
app.use(express.static('./images'));

// Custom middleware for logging incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Call next to pass control to the next middleware or route handler
});

// POST request to download image
app.post('/download-image', (req, res) => {
  // Path to the image file 
  const imagePath = path.join(__dirname, './images/winter1.jpeg');

  // Set the response headers for download
  res.download(imagePath, 'winter1.jpeg', (err) => {
    if (err) {
      // Handle any errors that occurred during download
      console.error('Error downloading image:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory where views is located
app.set('views', './views');

// Home page route with a category parameter
app.get('/:category?', (req, res) => {
  const category = req.params.category || 'default';
  const title = `Home Page - ${category}`;
  const header = `Welcome to Our ${category} Website!`;

  res.render('home', { title, header, content: `Explore our ${category} services and products.` });
});

// Contact page route
app.get('/contact/:category?', (req, res) => {
  const category = req.params.category || 'default';
  const title = `Contact Page - ${category}`;
  const header = `Get in Touch - ${category}`;

  res.render('contact', { title, header });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });