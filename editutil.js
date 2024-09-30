export const ifLoggedIn3 = () => {

    const editPostButton = document.getElementById("editPostButton");
    const maybeDelete = document.getElementById("maybeDelete");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (!token && !email) {
        editPostButton.style.display = "none";
        maybeDelete.style.display = "none";
        }
    }

window.addEventListener("load", ifLoggedIn3);