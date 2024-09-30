
export const ifLoggedIn5 = () => {

    const body = document.querySelector("body");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        console.log("Logged in");
    } else {
        body.style.display = "none";
    }

}

window.addEventListener("load", ifLoggedIn5);