const express = require('express')
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const app = express()
const cors = require('cors')
app.use(cors())

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }))

//Define route to handle submission of registration
app.post('/check',(req,res)=>{
  var r=Object.values(req.body)
  console.log(r);
  const username=r[0]
  const email=r[1]
  const password=r[2]
  console.log(req.body);
  function authen(username,email,password){
    const { spawn }=require('child_process');
    const py=spawn('python',['insertintodb.py',username,email,password]);

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
  authen(username,email,password).then((result) => {
    if(result=="Account Created"){
      res.sendFile(__dirname+"/html/index.html")
    }
    else if(result=="User Exist"){
      res.sendFile(__dirname+"/html/index.html")
    }
  })
  .catch((err) => {
    console.error(err);
  });
})

// Define route to handle form submission
app.post('/submit', (req, res) => {
  // const {username,email,password}=req.body
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


// Code for Clustering

app.get('/create_clusters',(req,res)=>{
  const cluster=require('./cluster_code')
  n=req.body.clusterInput
  cluster(3)
  .then((result) => {
    const dataString = result;
    const rows = dataString.split('\n');
    const headers = rows[0].split(/\s+/); // Split headers by whitespace

    const data = [];
    for (let i = 1; i < rows.length-5; i++) {
      const columns = rows[i].split(/\s+/); // Split columns by whitespace
      const row = {};
      for (let j = 0; j < columns.length; j++) {
        row[headers[j]] = columns[j+1];
      }
      data.push(row);
      }
    res.json(data);
  })
  .catch((err) => {
    console.error(err);
  });
})

// Serve index.html as the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/html/index.html');
})
//Navigation To Register Page
app.get('/auth-register-basic.html',(req,res)=>{
  res.sendFile(__dirname+'/html/auth-register-basic.html');
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

// user navigation pages

app.get('/userdashboard.html', (req, res) => {
  res.sendFile(__dirname+'/html/userdashboard.html');
})

// navigation to form
app.get('/userform.html', (req, res) => {
  res.sendFile(__dirname+'/html/userform.html');
})

// navigation to cluster
app.get('/usercluster.html', (req, res) => {
  res.sendFile(__dirname+'/html/usercluster.html');
})

// navigation to logout
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname+'/html/index.html');
})

// navigation to ranking
app.get('/userranking.html', (req, res) => {
  res.sendFile(__dirname+'/html/userranking.html');
})

// navigation to blog
app.get('/userblog.html', (req, res) => {
  res.sendFile(__dirname+'/html/userblog.html');
})

app.get('/userdashboard.html', (req, res) => {
  res.sendFile(__dirname+'/html/userdashboard.html');
})
//To apply css to the index page.
app.use('/assets',express.static(__dirname+'/assets'))


//for java-script code:

app.use('/cluster-details',express.static(__dirname+'/html/cluster-details.html'))
// Start the server

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
})
