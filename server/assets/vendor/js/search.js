fetch('http://15.206.72.43:3000/searchuserget')
  .then(response => response.text())
  .then(data => {
    console.log(data)
    let Name=data[0]
    let TotalGpa =data[1]
    let TotalBacklogs=data[1]
    let Nocert=data[2] 
    let pos=data[3] 
    let S11G=data[4]
    let S12G=data[5]
    let S21G=data[6]
    let S22G=data[7]
    let S11B=data[8]
    let S12B=data[9]
    let S21B=data[10]
    let S22B=data[11]
    
    document.getElementById('Namex').innerText=Name;
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