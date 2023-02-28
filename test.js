const { spawn } = require('child_process');

// Spawn a Python process and execute a script
const pythonProcess = spawn('python', ['code_1.py']);

// Listen for data from the Python process
pythonProcess.stdout.on('data', (data) => {
  console.log(`Received data from Python: ${data}`);
});

// Listen for errors from the Python process
pythonProcess.stderr.on('data', (data) => {
  console.error(`Error from Python: ${data}`);
});

// Send data to the Python process
pythonProcess.stdin.write('3');
pythonProcess.stdin.end();
