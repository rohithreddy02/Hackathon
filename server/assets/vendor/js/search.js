fetch('http://localhost:3000/searchuserget')
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