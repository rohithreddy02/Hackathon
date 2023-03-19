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