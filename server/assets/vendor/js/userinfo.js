fetch('http://13.233.245.126:3000/userdetails')
  .then(response => response.text())
  .then(data => {
    const r =data.split(/\s+/)
    console.log(r);
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
    else if(pos==3){
      document.getElementById('position').innerText="Chair Person";
    }
  });

  fetch('http://13.233.245.126:3000/nameuserdashboard')
  .then(response => response.text())
  .then(data => { 
    document.getElementById('name').innerText='Hi '+data+'\nThankyou for using our website'
  });