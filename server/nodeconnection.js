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
  console.log(email);
  res.send('Form submitted successfully!')
})

// Serve index.html as the root route
app.get('/', (req, res) => {
  res.sendFile('C:/Users/srujan/Desktop/Hackathon/html/index.html')
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})
