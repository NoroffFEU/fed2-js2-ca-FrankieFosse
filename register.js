import { ifLoggedIn } from "/utils.js";

const registerForm = document.querySelector("form#register");
let out = document.getElementById("out");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    if (name && email && password) {
        registerUser(name, email, password);
        out.innerHTML = "User has been registered"
    } else {
        out.innerHTML = "Please fill out form";
    }
});

async function registerUser(name, email, password) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        };
        console.log(options);
        const response = await fetch(`https://v2.api.noroff.dev/auth/register`, options);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}