import { ifLoggedIn } from "/utils.js";
import { ifLoggedIn2 } from "/createutil.js";

let api = `https://v2.api.noroff.dev/social/posts`
const output = document.getElementById("output");
let collection = [];

async function fetchPosts() {
    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZyYW5raWUiLCJpYXQiOjE3MTYyOTUzMDB9.gngTdTb3QdjGiJRgWMO7dOyVulq98MjvI2KIO_uQBos`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }  
        })
        const responseData = await response.json();
        console.log(responseData.data);

        const latestTwelvePosts = responseData.data.slice(0, 12);

        for (let item of responseData.data) {
            collection.push(item.title);
        }
        output.innerHTML = latestTwelvePosts.map(post => {
            return `
            <a href="details.html?id=${post.id}">
            <div id="postElement">
            <h1>${post.title}</h1>
            <img id="postImage" src=${post.media?.url ? post.media?.url : "images/image-placeholder-500x500.jpg"}>
            </div>
            </a>`
        }).join(" ");
    } catch(error) {
        console.error(error);
    }
}

fetchPosts();



