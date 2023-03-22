fetch('http://localhost:3000/usercount')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let user=result[0]
    let admin=result[1]
    document.getElementById('studentcount').innerText=user;
    document.getElementById('admincount').innerText=admin;
    console.log(user,admin);
  });

  fetch('http://localhost:3000/avggpa')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let s11=result[0]
    let s12=result[1]
    let s21=result[2]
    let s22=result[3]
      document.getElementById('s1').innerText=s11;
      document.getElementById('s2').innerText=s12;  
      document.getElementById('s4').innerText=s22;
      document.getElementById('s3').innerText=s21;

    console.log(user,admin);
  });

  fetch('http://localhost:3000/backlogcount')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let s11=result[0]
    let s12=result[1]
    let s21=result[2]
    let s22=result[3]
      document.getElementById('b1').innerText=s11;
      document.getElementById('b2').innerText=s12;  
      document.getElementById('b4').innerText=s22;
      document.getElementById('b3').innerText=s21;

    console.log(user,admin);
  });