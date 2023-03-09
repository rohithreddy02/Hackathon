const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }))

// Define route to handle form submission
app.post('/submit', (req, res) => {
  // const {email,password}=req.body
  var a=Object.values(req.body)
  // console.log(req);
  const email=a[0]
  const password=a[1]
  //Authentication of Login details
  function authenticate(username, password) {
    const { spawn } = require('child_process');
    const py = spawn('python', ['logincheck.py', username, password]);
    
    return new Promise((resolve, reject) => {
      let result = '';
  
      py.stdout.on('data', (data) => {
        result += data.toString();
      });
  
      py.stdout.on('end', () => {
        resolve(result.trim());
      });
  
      py.on('error', (err) => {
        reject(err);
      });
    });
  }
  authenticate(email, password).then((result) => {
    if(result=='True'){
        res.sendFile(__dirname+'/html/dashboard.html')
    }
  })
  .catch((err) => {
    console.error(err);
  });



  // Handle form submission here
  // For example, save form data to a database or send an email
  // res.send(output)
  // console.log(module);
  // Send a response back to the client
  // res.sendFile(__dirname+'/html/dashboard.html');
})

// Serve index.html as the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/html/index.html');
})

//To apply css to the index page.
app.use('/assets',express.static(__dirname+'/assets'))


// Start the server

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
})
