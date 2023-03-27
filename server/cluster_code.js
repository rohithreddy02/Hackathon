// Spawn a /usr/bin/python3 process and execute a script
function clusters(numberOfClusters){
  const { spawn }=require('child_process');
  const py=spawn('/usr/bin/python3',['cluster_code.py',numberOfClusters] );
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
module.exports= clusters
