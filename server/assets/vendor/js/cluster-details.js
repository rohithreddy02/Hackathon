clusterDisplay=document.querySelector('#clusterdetails')
clusterImg = document.querySelector('#cluster-img')
clusterMem=document.querySelector("#cluster-members")
fetch('http://13.233.245.126:3000/create_clusters')
  .then(response => response.text())
  .then(data => {
    const jsondata = JSON.parse(data);
    // delete(jsonData[0])
    // const table = document.createElement("table");
    // table.setAttribute("class", "table")
    console.log(jsonData);
    // // Create table headers
    // const headers = table.createTHead();
    // const headerRow = headers.insertRow(0);
    // Object.keys(jsonData[1]).forEach(key => {
    //   if(key != ''){
    //     const th = document.createElement("th");
    //     th.innerText = key;
    //     headerRow.appendChild(th);
    //   }
      
    // });

    // // Create table rows for data
    // jsonData.forEach(element => {
    //   if(element != {}){
    //   const row = table.insertRow();
    //   Object.keys(element).forEach(key => {
    //     const cell = row.insertCell();
    //     cell.innerHTML = element[key];
    //   });
    // }
    //   else{
    //   const table1 = document.createElement("table");
    //   table1.setAttribute("class", "table")
    //   table1.setAttribute("style","border :1px black;")
    //   }
    // });
    // Get reference to the HTML elements where the tables will be displayed
  // Extract the summary data from the JSON object
  const summaryData = jsondata.filter(obj => obj['Grade'] !== 'Cluster' && obj['Cluster-Size'] !== 'Rollno');

  // Generate the summary table HTML
  let summaryTableHTML = '<table class="table">';
  summaryTableHTML += '<tr><th>Grade</th><th>Cluster Size</th><th>Total GPA</th><th>No Cert</th><th>Extra</th></tr>';
  summaryData.forEach(obj => {
    summaryTableHTML += `<tr><td>${obj['Grade']}</td><td>${obj['Cluster-Size']}</td><td>${obj['TotalGpa']}</td><td>${obj['Nocert']}</td><td>${obj['Extra']}</td></tr>`;
  });
  summaryTableHTML += '</table>';

  // Display the summary table
  clusterdetails.innerHTML = summaryTableHTML;

  // Extract the detail data from the JSON object
  const detailData = jsondata.filter(obj => obj['Grade'] === 'Cluster' && obj['Cluster-Size'] === 'Rollno');

  // Generate the detail tables HTML and display them
  let clusterCount = 0;
  let currentCluster = null;
  let detailTablesHTML = '';
  detailData.forEach(obj => {
    if (obj['Grade'] === 'Cluster' && obj['Cluster-Size'] === 'Rollno') {
      // This is a new cluster, create a new detail table
      if (currentCluster !== null) {
        detailTablesHTML += '</table>';
      }
      currentCluster = obj['Grade'] + obj['Cluster-Size'];
      detailTablesHTML += `<h2>Cluster ${obj['Grade']}</h2><table class="table">`;
      clusterCount++;
    } else {
      // This is a student detail, add a row to the current detail table
      detailTablesHTML += `<tr><td>${obj['Cluster-Size']}</td></tr>`;
    }
  });
  detailTablesHTML += '</table>';

  // Display the detail tables
  clusterMem.innerHTML = detailTablesHTML;


    // clusterDisplay.appendChild(table);
    // cluserMem.appendChild(table1)
    
    const img = document.createElement('img')
    img.setAttribute('src', '../assets/img/Charts/Cluster.png')
    img.style.width ='450px'

    clusterImg.appendChild(img)
  });