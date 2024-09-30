import { ifLoggedIn5 } from "/hiddenutil.js";

function getInput(e) {
    const postTitle = document.getElementById("title");
    const postBody = document.getElementById("body");
    const postMediaURL = document.getElementById("mediaURL");
    const postMediaALT = document.getElementById("mediaALT");
    let isValid = true;
    const body = {
        title: postTitle.value,
        body: postBody.value,
        media: {
            url: postMediaURL.value,
            alt: postMediaALT.value
        }
    }

    const error = {
        title:"",
        body:"",
        media: {
            url:"",
            alt:""
        }
    }

if(!body.title) error.title = "Please provide a Title"
if(!body.body) error.body = "Please provide a Body"
if(!body.media.url) error.media.url = "Please provide a Media URL"
if(!body.media.alt) error.media.alt = "Please provide a Media ALT"

    if(!body.title || !body.body || !body.media.url || !body.media.alt) {
        isValid = false
    return {error: error, isValid: isValid}
    }

    if(isValid) return {body: body, isValid: isValid}

}

const createPostButton = document.getElementById("createPostButton");
const form = document.getElementById("create");

if(form) {
    createPostButton.addEventListener("click", function (e) {
        e.preventDefault();
        const title = e.target.name = "title"
        const prePayLoad = new FormData(form);
        const payload = new URLSearchParams(prePayLoad);

        const postData = getInput()
        console.log(postData);

const titleError = document.getElementById("titleError");
const bodyError = document.getElementById("bodyError");
const mediaUrlError = document.getElementById("mediaUrlError");
const mediaAltError = document.getElementById("mediaAltError");
const postStatus = document.getElementById("postStatus");

postData.error?.title? titleError.textContent = postData.error.title : titleError.textContent = "";
postData.error?.body? bodyError.textContent = postData.error.body : bodyError.textContent = "";
postData.error?.media.url? mediaUrlError.textContent = postData.error.media.url : mediaUrlError.textContent = "";
postData.error?.media.alt? mediaAltError.textContent = postData.error.media.alt : mediaAltError.textContent = "";

if(postData.isValid) {
    createPost(postData.body);
}

    })
}

async function createPost(data) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/posts`, {
            method: "POST",
            body: JSON.stringify({
                "title": data.title,
                "body": data.body,
                "media": {
                    "url": data.media.url,
                    "alt": data.media.alt
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        })
        const responseData = await response.json();
        console.log(responseData);

        if(!response.ok) {
            mediaUrlError.innerHTML = "Please provide a valid Media URL";
        } else {
            postStatus.innerHTML = "Post successfully created!";
            createPostButton.style.display = "none";
        }
    } catch(error) {
        console.error(error);
    }
}