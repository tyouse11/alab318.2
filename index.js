const express = require("express");
const app = express();
const port = 3000;

// set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory where views is located
app.set('views', './views');

// Home page route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Customizable Title',
    header: 'Customizable Header',
    content: 'Customizable Content'
  });
});

// Contact page route
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Page',
    header: 'Get in Touch',
  });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });