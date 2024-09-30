const out = document.getElementById("out");
const loginForm = document.querySelector("form#login");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Trying to log in");
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    if (email && password) {
        getToken(email, password);
    } else {
        out.innerHTML = "Please enter a username or password";
    }
});

async function getToken(email, password) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };
        console.log(options);
        const response = await fetch(`https://v2.api.noroff.dev/auth/login`, options);
        console.log("TEST", response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("token", data.data.accessToken);
            window.location = "/index.html";
        } else {
            throw new Error(response.statusText),
            out.innerHTML = "Wrong username or password";
        }
    } catch (error) {
        console.error(error);
    }
}

const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    console.log({token: token, email: email});

    if (token && email) {
        console.log("Logged in");
    } else {
        console.log("Not logged in");
    }
}