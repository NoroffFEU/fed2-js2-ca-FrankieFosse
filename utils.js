export const ifLoggedIn = () => {
    const logOutButton = document.getElementById("logout");
    const logInLink = document.getElementById("loginLink");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        console.log("Logged in");
        logInLink.style.display = "none";
        logOutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            window.location = "index.html";
        })
    } else {
        logOutButton.style.display = "none";
    }
}

window.addEventListener("load", ifLoggedIn);
