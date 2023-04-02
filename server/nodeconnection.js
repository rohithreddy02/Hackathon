const express = require('express')
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const { default: cluster } = require('cluster')
const app = express()


// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }))





//Define route to handle submission of registration
app.post('/check',(req,res)=>{
  var r=Object.values(req.body)

  const username=r[0]
  const email=r[1]
  const password=r[2]
  function authen(username,email,password){
    const { spawn }=require('child_process');
    const py=spawn('/usr/bin/python3',['insertintodb.py',username,email,password]);

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
      res.sendFile(__dirname+"/index.html")
    }
    else if(result=="User Exist"){
      res.sendFile(__dirname+"/pages-misc-under-maintenance2.html")
    }
  })
  .catch((err) => {
    console.error(err);
  });
})


// Define route to handle login
app.post('/submit', (req, res) => {
  
  var a=Object.values(req.body) 
  const email=a[0]
  const password=a[1]
  //Authentication of Login details
  function authenticate(username, password) {
    const { spawn } = require('child_process');
    let py = spawn('/usr/bin/python3', ['logincheck.py', username, password]);
    
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
        res.sendFile(__dirname+'/dashboard.html')
    }
    else if(result=='True-Student'){
      res.sendFile(__dirname+'/userdashboard.html')
    }
    else{
      res.sendFile(__dirname+'/pages-misc-under-maintenance.html')
    }
  })
  .catch((err) => {
    console.error(err);
  });

  const { spawn } = require('child_process');
  const hist = spawn('/usr/bin/python3', ['histogram.py']);
  const scatter = spawn('/usr/bin/python3',['scatterplot.py']);

  app.get('/userdetails',(req,res)=>{
    function count(user) {
      const { spawn } = require('child_process');
      const py = spawn('/usr/bin/python3', ['userdetails.py',user]);
      
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
    count(email).then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
  
  })
  
  //for 
  app.get('/nameuserdashboard',(req,res)=>{
    function count(username) {
      const { spawn } = require('child_process');
      const py = spawn('/usr/bin/python3', ['name.py',username]);
      
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
    count(email).then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
  
  })
})



// Code for add-details.
app.post('/add_db',(req,res)=>{
  const {spawn} = require('child_process');
  const py = spawn('/usr/bin/python3', ['addformdetails.py', req.body.Sname, req.body.Sno , req.body.Semail , req.body.s11_g ,req.body.s11_b, req.body.s12_g ,req.body.s12_b, req.body.s21_g, req.body.s21_b, req.body.s22_g, req.body.s22_b, req.body.SBack , req.body.Scgpa, req.body.Scert , req.body.SExtra  ]);
  py.stdout.on('data', (data) => {
    console.log(`Output from /usr/bin/python3: ${data}`);
  });
  py.stderr.on('data', (data) => {
    console.error(`Error from /usr/bin/python3: ${data}`);
  });
  res.sendFile(__dirname+'/pages-misc-under-maintenance3.html')
  
})
//Code for Cluster-page

app.post('/clusters',(req,res)=>{
  n=req.body.clusterInput
  app.get('/create_clusters',(req,res)=>{
    const cluster=require('./cluster_code')
    cluster(n)
    .then((result) => {
      const dataString = result;
      const rows = dataString.split('\n');
      const headers = rows[0].split(/\s+/); // Split headers by whitespace
  
      const data = [];
      for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(/\s+/); // Split columns by whitespace
        const row = {};
        for (let j = 0; j < columns.length; j++) {
          row[headers[j]] = columns[j+1];
        }
        data.push(row);
        }
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
  })
  res.sendFile(__dirname+'/cluster.html')
  
})

//Define route for search user details
app.post('/searchuser', (req, res) => {
  // Code for POST method
  username=req.body.serachusername
  app.get('/name',(req,res)=>{
    
    function name(user) {
    const { spawn } = require('child_process');

    const  py = spawn('/usr/bin/python3', ['name.py', user]);

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

  name(username)
  .then((result) => {
      res.send(result);
    })
  .catch((err) => {
      console.error(err);
    });
})
  app.get('/searchuserget',(req,res)=>{
      
      function count(user) {
      const { spawn } = require('child_process');
  
      const  py = spawn('/usr/bin/python3', ['search.py', user]);
  
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
  
    count(username)
    .then((result) => {
        res.send(result);
      })
    .catch((err) => {
        console.error(err);
      });
  })
  res.sendFile(__dirname+'/searchuser.html')
});





//Code for User Cluster-page

app.post('/userclusters',(req,res)=>{
  n=req.body.clusterInput
  app.get('/create_clusters',(req,res)=>{
    const cluster=require('./cluster_code')
    cluster(n)
    .then((result) => {
      const dataString = result;
      const rows = dataString.split('\n');
      const headers = rows[0].split(/\s+/); // Split headers by whitespace
  
      const data = [];
      for (let i = 1; i < rows.length; i++) {
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
  res.sendFile(__dirname+'/usercluster.html')
  
})
//Code for Usercount
app.get('/usercount',(req,res)=>{
  function count() {
    const { spawn } = require('child_process');
    const py = spawn('/usr/bin/python3', ['userscount.py']);
    
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
  count().then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
  });

})

//Code for Average Sgpa
app.get('/avggpa',(req,res)=>{
  function count() {
    const { spawn } = require('child_process');
    const py = spawn('/usr/bin/python3', ['avggpa.py']);
    
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
  count().then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
  });

})
//Code for Number of Certificates
app.get('/nocert',(req,res)=>{
  function count() {
    const { spawn } = require('child_process');
    const py = spawn('/usr/bin/python3', ['certcount.py']);
    
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
  count().then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
  });
})
//Code for Backlog Count
app.get('/backlogcount',(req,res)=>{
  function count() {
    const { spawn } = require('child_process');
    const py = spawn('/usr/bin/python3', ['backlogcount.py']);
    
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
  count().then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
  });

})

//code for ranking

app.get('/ranking',(req,res)=>{
  function get_ranking(){
    const { spawn }=require('child_process');
    const py=spawn('/usr/bin/python3',['ranking.py'] );
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
  get_ranking()
  .then((result) => {

    const data = result;
    const regex = /(\d+)\s+([^\s]+)\s+([\d\.-]+)\s+([\w\s]+)\s+([\d\.]+)\s+(\d+)\s+(\d+)/gm;

  let match;
  let results = [];
  while ((match = regex.exec(data)) !== null) {
    const result = {
      Rank: parseInt(match[1])+1,
      Total: match[3],
      Name: match[4],
      TotalGpa: match[5],
      Nocert: match[6],
      Extra: match[7]
    };

    results.push(result);
  }

  const json = JSON.stringify(results);
  res.send(json)
    
  })
  .catch((err) => {
    console.error(err);
  });
})



// Serve index.html as the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
})
//Navigation To Register Page
app.get('/auth-register-basic.html',(req,res)=>{
  res.sendFile(__dirname+'/auth-register-basic.html');
})
// navigation to form
app.get('/form.html', (req, res) => {
  res.sendFile(__dirname+'/form.html');
})

app.get('/searchuser.html', (req, res) => {
  res.sendFile(__dirname+'/searchuser.html');
})
// navigation to cluster
app.get('/cluster.html', (req, res) => {
  res.sendFile(__dirname+'/cluster.html');
})

// navigation to logout
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname+'/index.html');
})

// navigation to ranking
app.get('/ranking.html', (req, res) => {
  res.sendFile(__dirname+'/ranking.html');
})

// navigation to blog
app.get('/blog.html', (req, res) => {
  res.sendFile(__dirname+'/blog.html');
})

// user navigation pages

app.get('/userdashboard.html', (req, res) => {
  res.sendFile(__dirname+'/userdashboard.html');
})

// navigation to form
app.get('/userform.html', (req, res) => {
  res.sendFile(__dirname+'/userform.html');
})

// navigation to cluster
app.get('/usercluster.html', (req, res) => {
  res.sendFile(__dirname+'/usercluster.html');
})

// navigation to logout
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname+'/index.html');
})

// navigation to ranking
app.get('/userranking.html', (req, res) => {
  res.sendFile(__dirname+'/userranking.html');
})

// navigation to blog
app.get('/userblog.html', (req, res) => {
  res.sendFile(__dirname+'/userblog.html');
})

//navigation to y=userfaq
app.get('/userfaq.html', (req, res) => {
  res.sendFile(__dirname+'/userfaq.html');
})

app.get('/userdashboard.html', (req, res) => {
  res.sendFile(__dirname+'/userdashboard.html');
})
//To apply css to the index page.
app.use('/assets',express.static(__dirname+'/assets'))

app.get('/submit', (req, res) => {
  res.sendFile(__dirname+'/dashboard.html');
})
app.get('/dashboard.html', (req, res) => {
  res.sendFile(__dirname+'/dashboard.html');
})

//for java-script code:

app.use('/cluster-details',express.static(__dirname+'/cluster-details.html'))
// Start the server

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
})
