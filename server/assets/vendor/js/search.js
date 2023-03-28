fetch('http://15.206.72.43:3000/searchuserget')
  .then(response => response.text())
  .then(result => {
    console.log(result)
    const pattern = /^([a-zA-Z]+(?: [a-zA-Z]+){0,2}) (\d{1,2}\.\d{2}) (\d+) (\d{1,2}) ((?:\d\.\d{2} ){3}\d\.\d{2}) (\d+ ){4}$/
    const match = result.match(pattern);

    if (match) {
      const name = match[1];
      const totalGpa = parseFloat(match[2]);
      const totalBacklogs = parseInt(match[3]);
      const numCertificates = parseInt(match[4]);
      const semesterGpas = match[5].trim().split(' ').map(parseFloat);
      const semesterBacklogs = match[6].trim().split(' ').map(parseInt);

      console.log(name,totalGpa,totalBacklogs,numCertificates,semesterGpas,semesterBacklogs);
  // Do something with the variables
    } else {
      console.log('No match found');
    }

    
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