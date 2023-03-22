// Spawn a Python process and execute a script
function clusters(numberOfClusters){
  const { spawn }=require('child_process');
  const py=spawn('python',['code_1.py',numberOfClusters] );
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
// clusters(3).then((result) => {
//   const dataString =result;
//   const rows = dataString.split('\n');
//   const headers = rows[0].split(/\s+/); // Split headers by whitespace

//   const data = [];
//   for (let i = 1; i < rows.length -5; i++) {
//     const columns = rows[i].split(/\s+/); // Split columns by whitespace
//     const row = {};
//     for (let j = 0; j < columns.length; j++) {
//       row[headers[j]] = columns[j+1];
//     }
//     data.push(row);
//   }
//   console.log(data);
// })
// .catch((err) => {
//   console.error(err);
// });
module.exports= clusters
