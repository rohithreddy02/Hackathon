fetch('http://localhost:3000/usercount')
  .then(response => response.text())
  .then(data => {
    user=data[0]
    admin=data[1]
    document.getElementById('studentcount').innerText=user;
    console.log(user,admin);
  });