import { ifLoggedIn } from "/utils.js";
import { ifLoggedIn3 } from "/editutil.js";

let outElement = document.getElementById("detailedPost");
let postStatus = document.getElementById("postStatus");

let params = new URL (document.location).searchParams;

let id = params.get("id");
const url = `https://v2.api.noroff.dev/social/posts/${id}`;

async function getPostById() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZyYW5raWUiLCJpYXQiOjE3MTYyOTUzMDB9.gngTdTb3QdjGiJRgWMO7dOyVulq98MjvI2KIO_uQBos`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        });
        const responseData = await response.json();
        console.log(responseData);
        document.title = responseData.data.title;
        listDetailedPost(responseData, outElement);
    } catch(error) {
        console.error(error);
    }
}

getPostById();

function listDetailedPost(post, out) {
    let newDiv = `
    <div>
    <h1>${post.data.title}</h1>
    <img src=${post.data.media?.url ? post.data.media?.url : "images/image-placeholder-500x500.jpg"}>
    <p>${post.data.body}</p>
    </div>
    `;
    out.innerHTML = newDiv;
}

let maybeDelete = document.getElementById("maybeDelete");

maybeDelete.addEventListener("click", deleteFunction);

function deleteFunction() {
    if (confirm("Are you sure you want to delete this post?") == true) {
        clickHandler();
    } else {
        console.log("Delete canceled");
    }
}

const clickHandler = async () => {
    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        });
        console.log(res);
        if (res.status == "403") {
            console.log("Access not OK");
            postStatus.innerHTML = "You do not have access to delete this post";
        } else {
            console.log("OK");
            postStatus.innerHTML = "Post has been deleted";
        }
    } catch(error) {
        console.error(error);
    }
};

const editButton = document.getElementById("editPostButton");

editButton.addEventListener("click", editPost);

function editPost() {
    window.location.href = `edit.html?id=${id}`
}