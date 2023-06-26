const endpoint ="http://localhost/kodego/activity/6-23-2023-group/PHP-MYSQL/api/";

// Cookie Functions --------------------------------
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  
  function checkSession() {
    const userIDCookie = getCookie("user_id");
    if (userIDCookie) {
      window.location.replace("index.html");
    }
  }
  
  function checkLoggedInStatus() {
    const userIDCookie = getCookie("user_id");
    console.log(userIDCookie);
    if (!userIDCookie) {
      window.location.replace("login.html");
    }
  }

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
  // End of Check Session Function

// Handle Registration Form
try {
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
        .then((result) => {
            if (result.success) {
            alert(result.message);
            window.location.replace("login.html");
            } else {
            alert(result.message);
            }
        });
    } else {
        alert("Passwords do not match!");
    }
    });
}catch(e){}

// Handle Login Form
try{
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(endpoint+'login.php',{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: email,
            password: password,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
            if (result.success) {    
                // Store user session in a cookie
                document.cookie = `user_id=${result.user_id}; expires=Thu, 18 Dec 2099 12:00:00 GMT`;
                document.cookie = `email=${result.email}; expires=Thu, 18 Dec 2099 12:00:00 GMT`;
                document.cookie = `firstname=${result.firstname}; expires=Thu, 18 Dec 2099 12:00:00 GMT`;                
                document.cookie = `lastname=${result.lastname}; expires=Thu, 18 Dec 2099 12:00:00 GMT`;
                document.cookie = `birthdate=${result.birthdate}; expires=Thu, 18 Dec 2099 12:00:00 GMT`;

                window.location.replace("index.html");
            } else {
                alert(result.message);
            }
            });
    })
}catch(e){}

// Handle Create Tweet
const newTweet = () => {
    const tweetInput = document.getElementById("form143");
    const tweet = tweetInput.value.trim();

    if(tweet !== ""){
        fetch(endpoint+"createtweet.php",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            content: tweetInput.value,
            user_id: getCookie("user_id"),
            }),
        })
        .then(response=>response.json())
        .then(result=>{
            document.getElementById("feed").innerHTML = '';
            fetchTweets();
        })

        tweetInput.value = "";
        tweetInput.classList.remove("is-invalid");
    }else{
        tweetInput.classList.add("is-invalid");
    }

}

// Handle Change Profile Form
try {
    const changeprofileForm = document.getElementById("changeprofileForm");
    changeprofileForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const birthdate = document.getElementById("birthdate").value;

 
            fetch(endpoint + "changeprofile.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: getCookie('user_id'),
                firstname: firstname,
                lastname: lastname,
                email: email,
                birthdate: birthdate,
            }),
            })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                alert(result.message);
                } else {
                alert(result.message);
                }
            });
        

        
    })
}catch(e) {}

// Handle Change Password
try{
    const changepasswordForm = document.getElementById("changepasswordForm");

    changepasswordForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const old_password = document.getElementById("old_password").value;
        const new_password = document.getElementById("new_password").value;
        const confirm_new_password = document.getElementById("confirm_new_password").value;

        if (new_password === confirm_new_password) {

            fetch(endpoint + "changepassword.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: getCookie('email'),
                old_password: old_password,
                new_password: new_password
            }),
            })
            .then((response) => response.json())
            .then((result) => {
                if(result.success){
                    alert(result.message);
                    window.location.replace("changeprofile.html");

                }else{
                    alert(result.message);
                }
            });

        } else {
            alert("Passwords do not match!");
        }
        });

}catch (e){}

// Fetch Tweets for Feed
const fetchTweets = ()=>{
    fetch(endpoint+'gettweets.php')
        .then(response=>response.json())
        .then(result=>{
            const feed = document.getElementById("feed");


            result.forEach(tweet=>{
                const retweet = Math.floor(Math.random()*500);
                const heart = Math.floor(Math.random()*500);


                feed.innerHTML += `
                    <div class="d-flex p-3 border-bottom">
                        <img
                        src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989538-egg.jpg?resize=480:*"
                        class="rounded-circle" height="50" alt="Avatar" />
                        <div class="d-flex w-100 ps-3">
                        <div class="w-100">
                            <a class="link-offset-2 link-underline link-underline-opacity-0" href="">
                                <h6 class="text-body ">
                                    ${tweet.firstname} ${tweet.lastname}
                                    <span class="small text-muted font-weight-normal text-lowercase">@${tweet.firstname}${tweet.lastname}</span>
                                    <span class="small text-muted font-weight-normal"> • </span>
                                    <span class="small text-muted font-weight-normal">2h</span>
                                    <span><button onclick="deleteTweet(${tweet.tweet_id})" class="btn float-end" aria-label="Delete"><i
                                        class="fa-regular fa-trash-can text-danger"></i></button></span>
                                </h6>
                            </a>
                            <p style="line-height: 1.2;width:100%;">
                                ${tweet.content}
                            </p>
                            <ul class="list-unstyled d-flex justify-content-between mb-0 pe-xl-5">
                            <li>
                                <i class="far fa-comment"></i>
                            </li>
                            <li><i class="fas fa-retweet"></i><span class="small ps-2">${retweet}</span></li>
                            <li><i class="far fa-heart"></i><span class="small ps-2">${heart}</span></li>
                            <li>
                                <i class="far fa-share-square"></i>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                `;
            });
        })
}

// Handle Log out
const logout = ()=>{
    deleteAllCookies();
    window.location.replace("login.html");
}

// Handle Delete
const deleteTweet = (tweet_id)=>{
    fetch(endpoint+'deletetweet.php',{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tweet_id : tweet_id,
            user_id : getCookie("user_id")
        }),
    })
    .then(response=>response.json())
    .then(result=>{
        if(result.success){
            console.log(result.message);
        }else{
            alert(message);
        }
    })
}

// set Profile
const setProfile = ()=>{
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const birthdate = document.getElementById("birthdate");

    firstname.value = getCookie('firstname');
    lastname.value = getCookie('lastname');
    email.value = getCookie('email');
    birthdate.value = getCookie('birthdate');
}