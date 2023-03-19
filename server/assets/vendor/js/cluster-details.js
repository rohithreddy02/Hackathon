clusterDisplay=document.querySelector('#clusterdetails')
fetch('http://localhost:3000/create_clusters')
  .then(response => response.text())
  .then(data => {
    const jsonData = JSON.parse(data);
    const table = document.createElement("table");
    table.setAttribute("class", "table")
    // Create table headers
    const headers = table.createTHead();
    const headerRow = headers.insertRow(0);
    Object.keys(jsonData[0]).forEach(key => {
      const th = document.createElement("th");
      th.innerText = key;
      headerRow.appendChild(th);
    });

    // Create table rows for data
    jsonData.forEach(element => {
      const row = table.insertRow();
      Object.keys(element).forEach(key => {
        const cell = row.insertCell();
        cell.innerHTML = element[key];
      });
    });

    clusterDisplay.appendChild(table);
  });