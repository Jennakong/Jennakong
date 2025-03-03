document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blog-posts");

    const blogPosts = [
        { title: "Marketing in 2025", content: "Insights into future trends." },
        { title: "Entrepreneurial Growth", content: "How to scale your business." }
    ];

    blogPosts.forEach(post => {
        let div = document.createElement("div");
        div.classList.add("blog-post");
        div.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        blogContainer.appendChild(div);
    });
});