// var ele = document.getElementById("submit");
// ele.onclick = authenticate();
const { spawn } = require('child_process');
const express=require('express')
const app=express()
app.listen(5000,()=>{
    console.log("hiiii");
})
function authenticate() {
//     var username = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
    
    const { spawn } = require('child_process');
    const py = spawn('python', ['logincheck.py', username, password]);
    py.stdout.on('data', (data) => {
        alert(`Output from Python: ${data}`);
    });
    
}