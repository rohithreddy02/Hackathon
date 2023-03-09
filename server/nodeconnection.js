const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }))

// Define route to handle form submission
app.post('/submit', (req, res) => {
  
  const email = req.body.email
  const message = req.body.password

  // Handle form submission here
  // For example, save form data to a database or send an email
  
  // Send a response back to the client
  res.sendFile(__dirname+'/html/dashboard.html');
})

// NAVIGATION
// navigation to form
app.get('/form.html', (req, res) => {
  res.sendFile(__dirname+'/html/form.html');
})

// navigation to cluster
app.get('/cluster.html', (req, res) => {
  res.sendFile(__dirname+'/html/cluster.html');
})

// navigation to logout
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname+'/html/index.html');
})

// navigation to ranking
app.get('/ranking.html', (req, res) => {
  res.sendFile(__dirname+'/html/ranking.html');
})

// navigation to blog
app.get('/blog.html', (req, res) => {
  res.sendFile(__dirname+'/html/blog.html');
})

//To apply css to the index page.
app.use('/assets',express.static(__dirname+'/assets'))


// Start the server

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
})
