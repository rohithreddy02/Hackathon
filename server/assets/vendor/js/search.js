fetch('http://13.233.245.126:3000/searchuserget')
  .then(response => response.text())
  .then(data => {
    const r =data.split(/\s+/)
    console.log(r);
    let Rollno=r[0]
    let TotalGpa =r[1]
    let TotalBacklogs=r[2]
    let Nocert=r[3] 
    let pos=r[4] 
    let S11G=r[5]
    let S12G=r[6]
    let S21G=r[7]
    let S22G=r[8]
    let S11B=r[9]
    let S12B=r[10]
    let S21B=r[11]
    let S22B=r[12]
    
    document.getElementById('Rollnox').innerText=Rollno;
    document.getElementById('cgpax').innerText=TotalGpa;
    document.getElementById('totalbacklogsx').innerText=TotalBacklogs;
    document.getElementById('nocertx').innerText=Nocert;
    document.getElementById('us1x').innerText=S11G;
    document.getElementById('us2x').innerText=S12G;
    document.getElementById('us3x').innerText=S21G;
    document.getElementById('us4x').innerText=S22G;
    document.getElementById('ub1x').innerText=S11B;
    document.getElementById('ub2x').innerText=S12B;
    document.getElementById('ub3x').innerText=S21B;
    document.getElementById('ub4x').innerText=S22B;
    
    if(pos==0){
      document.getElementById('positionx').innerText="No Postion";
    }
    else if(pos==1){
      document.getElementById('positionx').innerText="Volunteer";
    }
    else if(pos==2){
      document.getElementById('positionx').innerText="Board Member";
    }
    else if(pos==3){
      document.getElementById('positionx').innerText="Chair Person";
    }
  });


  fetch('http://13.233.245.126:3000/name')
  .then(response => response.text())
  .then(data => { 
    document.getElementById('Namex').innerText=data;
  });