fetch('http://localhost:3000/usercount')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let user=result[0]
    let admin=result[1]
    document.getElementById('studentcount').innerText=user;
    document.getElementById('admincount').innerText=admin; 
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
  });

  fetch('http://localhost:3000/nocert')
  .then(response => response.text())
  .then(data => {
    const result =data.split(/\s+/)
    let s11=result[0]
    let s12=result[1]
    let s21=result[2]
    let s22=result[3]
      document.getElementById('c0').innerText=s11;
      document.getElementById('c1').innerText=s12;  
      document.getElementById('c2').innerText=s22;
      document.getElementById('c3').innerText=s21; 
  });


fetch('http://localhost:3000/userdetails')
  .then(response => response.text())
  .then(data => {
    const r =data.split(/\s+/)
    let TotalGpa =r[0]
    let TotalBacklogs=r[1]
    let Nocert=r[2] 
    let pos=r[3] 
    let S11G=r[4]
    let S12G=r[5]
    let S21G=r[6]
    let S22G=r[7]
    let S11B=r[8]
    let S12B=r[9]
    let S21B=r[10]
    let S22B=r[11]
    console.log(r);
    document.getElementById('cgpa').innerText=TotalGpa;
    document.getElementById('totalbacklogs').innerText=TotalBacklogs;
    document.getElementById('nocert').innerText=Nocert;
    document.getElementById('us1').innerText=S11G;
    document.getElementById('us2').innerText=S12G;
    document.getElementById('us3').innerText=S21G;
    document.getElementById('us4').innerText=S22G;
    document.getElementById('ub1').innerText=S11B;
    document.getElementById('ub2').innerText=S12B;
    document.getElementById('ub3').innerText=S21B;
    document.getElementById('ub4').innerText=S22B;
    if(pos==0){
      document.getElementById('position').innerText="No Postion";
    }
    else if(pos==1){
      document.getElementById('position').innerText="Volunteer";
    }
    else if(pos==2){
      document.getElementById('position').innerText="Board Member";
    }
    else{
      document.getElementById('position').innerText="Chair Person";
    }
  });