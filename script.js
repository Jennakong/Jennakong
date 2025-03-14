document.addEventListener("DOMContentLoaded", function () {
    // Blog Post Dynamic Loading
    const blogContainer = document.getElementById("blog-posts");

    if (blogContainer) {
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
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute("href").split("#")[1];
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;

            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields.");
            } else {
                alert("Message sent! I’ll get back to you soon.");
                contactForm.reset();
            }
        });
    }
});