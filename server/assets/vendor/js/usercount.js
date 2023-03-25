fetch('http://15.206.72.43:3000/usercount')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let user=result[0]
    let admin=result[1]
    document.getElementById('studentcount').innerText=user;
    document.getElementById('admincount').innerText=admin; 
  });


  fetch('http://15.206.72.43:3000/avggpa')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    console.log(result);
    let s11=result[0]
    let s12=result[1]
    let s21=result[2]
    let s22=result[3]
      document.getElementById('s1').innerText=s11;
      document.getElementById('s2').innerText=s12;  
      document.getElementById('s4').innerText=s22;
      document.getElementById('s3').innerText=s21; 
  });


  fetch('http://15.206.72.43:3000/backlogcount')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    console.log(result);
    let s11=result[0]
    let s12=result[1]
    let s21=result[2]
    let s22=result[3]
      document.getElementById('b1').innerText=s11;
      document.getElementById('b2').innerText=s12;  
      document.getElementById('b4').innerText=s22;
      document.getElementById('b3').innerText=s21; 
  });

  fetch('http://15.206.72.43:3000/nocert')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let s11=result[0]
    let s12=result[1]
    let s21=result[2]
    let s22=result[3]
      document.getElementById('c1').innerText=s11;
      document.getElementById('c2').innerText=s12;  
      document.getElementById('c3').innerText=s22;
      document.getElementById('c4').innerText=s21; 
  });