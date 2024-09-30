import { ifLoggedIn5 } from "/hiddenutil.js";

let params = new URL (document.location).searchParams;

let id = params.get("id");
const url = `https://v2.api.noroff.dev/social/posts/`


const postTitle = document.getElementById("title");
const postBody = document.getElementById("body");
const postMediaURL = document.getElementById("mediaURL");
const postMediaALT = document.getElementById("mediaALT");
const postStatus = document.getElementById("postStatus");
const editPostButton = document.getElementById("editPostButton");

async function editClick() {

    if (!id) {
        return;
    }

    try {
        const res = await fetch((url + id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            },
            body: JSON.stringify({
                "title": postTitle.value,
                "body": postBody.value,
                "media": {
                    "url": postMediaURL.value,
                    "alt": postMediaALT.value
                }
            })
        });
        console.log(res);
        if (res.status == "403") {
            console.log("Access not OK");
            postStatus.innerHTML = "You do not have access to edit this post";
        } else if (!res.ok) {
            console.log("Media URL not OK");
            postStatus.innerHTML = "Please provide a valid Media URL";
        } else {
            console.log("OK");
            postStatus.innerHTML = "Post successfully edited!";
        }
    } catch(error) {
        console.error(error);
    }
}

editPostButton.addEventListener("click", editClick);

async function getPostById() {

    if (!id) {
        return;
    }

    try {
        const response = await fetch((url + id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        } );
        const responseData = await response.json();
        postTitle.value = responseData.data.title;
        postBody.value = responseData.data.body;
        postMediaURL.value = responseData.data.media.url;
        postMediaALT.value = responseData.data.media.alt;
    } catch (error) {
        console.error(error);
    }
}

getPostById();