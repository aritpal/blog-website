document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts");
    const blogListContainer = document.getElementById("blog-list");
    const postTitle = document.getElementById("post-title");
    const postContent = document.getElementById("post-content");

    // Fetch blog posts
    fetch("posts.json")
        .then(response => response.json())
        .then(posts => {
            if (postsContainer) {
                posts.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("blog-post");
                    postElement.innerHTML = `
                                                                                                                                                            <h2>${post.title}</h2>
                                                                                                                                                                                    <p>${post.content.substring(0, 100)}...</p>
                                                                                                                                                                                                            <a href="post.html?id=${post.id}">Read More</a>
                                                                                                                                                                                                                                `;
                    postsContainer.appendChild(postElement);
                });
            }

            if (blogListContainer) {
                posts.forEach(post => {
                    const listItem = document.createElement("div");
                    listItem.classList.add("blog-post");
                    listItem.innerHTML = `<a href="post.html?id=${post.id}">${post.title}</a>`;
                    blogListContainer.appendChild(listItem);
                });
            }

            if (postTitle && postContent) {
                const urlParams = new URLSearchParams(window.location.search);
                const postId = urlParams.get("id");
                const post = posts.find(p => p.id == postId);

                if (post) {
                    postTitle.innerText = post.title;
                    postContent.innerHTML = `<p>${post.content}</p>`;
                }
            }
        })
        .catch(error => console.error("Error loading posts:", error));
});