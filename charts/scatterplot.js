// import {create_connection} from '../Server/connection.py'

// db = create_connection()

// db.query('select * from studentperformance', (err, res) => {
//     console.log(res)
// })

const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'studentinformation'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Retrieve data from a table and create the chart
const query = 'SELECT * FROM studentperformance';
connection.query(query, (err, results, fields) => {
  if (err) throw err;
  // Transform the data into the format expected by Chart.js
  const chartData = {
    labels: results.map(row => row.date),
    datasets: [{
      label: 'My Data',
      data: results.map(row => row.value)
    }]
  };
  // Create the chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: chartData
  });
});

// Close the database connection when finished
connection.end();







// var ctx = document.getElementById('myChart').getContext('2d')

// Define the chart data
// var data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//     }]
// };

// // Define the chart options
// var options = {
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true
//             }
//         }]
//     }
// };

// // Create the chart
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: options
// }
// );
