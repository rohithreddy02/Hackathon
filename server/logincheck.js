function authenticate(username, password) {
    const { spawn } = require('child_process');
    const py = spawn('/usr/bin/python3', ['logincheck.py', username, password]);
    
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
  authenticate('20311A0501', 'wdvvdh')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

module.exports=authenticate;

