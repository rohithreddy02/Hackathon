var mySql = require('mysql');
const bodyParser = require('body-parser')
var express = require('express')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use(express.static('Client/src'))

var connection = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3360',
  database: 'studentinformation',
});

const getAllDetails = () => {
  return new Promise((resolve, reject) => {
    const query = 'select * from studentperformance'

    connection.query(query, (err, results) => {
      if (err) throw err;
      else{
        resolve(results)
      }
    })
  })
}

app.get('/api/student-performance', async(req, res) =>{
  try{
    const details = await getAllDetails();
    res.json(details);
  }catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/api/student-performance', (req, res) => {
    const {rno, name, email, branch, gpa, cc, ec, bl} = req.body

    var values = [[rno, name, email, branch, gpa, cc, ec, bl],]
    connection.query('Insert into studentperformance values ?', [values], (err, result)=> {
        if (err){
          res.status(400).send({message: "enter correct details"})
        }        
        else{
          res.status(201).send(result);
        }
    })
})

const server = app.listen(5000, () =>{
  console.log("Server running on port 5000")
})

server.on('error', error => {
  console.log("server Error: ", error)
})

module.exports = connection