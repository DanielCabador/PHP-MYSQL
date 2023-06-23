const endpoint ="http://localhost/kodego/activity/6-23-2023-group/PHP-MYSQL/api/";

// Handle Registration Form
const registrationForm = document.querySelector("#registrationForm");
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    fetch(endpoint + "register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        birthdate: birthdate,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.replace("login.html");
        } else {
          alert(data.message);
        }
      });
  } else {
    alert("Passwords do not match!");
  }
});
