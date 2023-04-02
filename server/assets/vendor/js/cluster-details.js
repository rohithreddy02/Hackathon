clusterDisplay=document.querySelector('#clusterdetails')
clusterImg = document.querySelector('#cluster-img')
fetch('http://13.233.245.126:3000/create_clusters')
  .then(response => response.text())
  .then(data => {
    const jsonData = JSON.parse(data);
    delete(jsonData[0])
    const table = document.createElement("table");
    table.setAttribute("class", "table")
    console.log(jsonData);
    // Create table headers
    const headers = table.createTHead();
    const headerRow = headers.insertRow(0);
    Object.keys(jsonData[1]).forEach(key => {
      if(key != ''){
        const th = document.createElement("th");
        th.innerText = key;
        headerRow.appendChild(th);
      }
      
    });
    // Create table rows for data
    jsonData.forEach(element => {
      const row = table.insertRow();
      Object.keys(element).forEach(key => {
        if (key !=null){
        const cell = row.insertCell();
        cell.innerHTML = element[key];
      }
        else{
          const table = document.createElement("table");
          table.setAttribute("class", "table")
        }
      });
    });

    clusterDisplay.appendChild(table);
    
    const img = document.createElement('img')
    img.setAttribute('src', '../assets/img/Charts/Cluster.png')
    img.style.width ='450px'
    clusterImg.appendChild(img)
  });