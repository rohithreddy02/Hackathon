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
    if(result=='True-Admin'){
        res.sendFile(__dirname+'/html/dashboard.html')
    }
    else if(result=='True-Student'){
      res.sendFile(__dirname+'/html/userdashboard.html')
    }
    else{
      res.send("Invalid credentials")
    }
  })
  .catch((err) => {
    console.error(err);
  });
})


// Code for add-details.
app.post('/add_db',(req,res)=>{
  const {spawn} = require('child_process');
  const py = spawn('python', ['addformdetails.py', req.body.Sname, req.body.Sno , req.body.Semail , req.body.s11_g ,req.body.s11_b, req.body.s12_g ,req.body.s12_b, req.body.s21_g, req.body.s21_b, req.body.s22_g, req.body.s22_b, req.body.SBack , req.body.Scgpa, req.body.Scert , req.body.SExtra  ]);
  py.stdout.on('data', (data) => {
    console.log(`Output from Python: ${data}`);
  });
  py.stderr.on('data', (data) => {
    console.error(`Error from Python: ${data}`);
  });
  res.send("Added Files");
})




// Serve index.html as the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/html/index.html');
})

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

app.get('/dashboard.html', (req, res) => {
  res.sendFile(__dirname+'/html/dashboard.html');
})
//To apply css to the index page.
app.use('/assets',express.static(__dirname+'/assets'))


// Start the server

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
})
