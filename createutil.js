export const ifLoggedIn2 = () => {

    const createLink = document.getElementById("createLink");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (!token && !email) {
        createLink.style.display = "none";
        }
    }

window.addEventListener("load", ifLoggedIn2);