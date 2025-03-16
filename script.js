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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if dark mode was previously enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
    }

    darkModeToggle.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
        darkModeToggle.innerHTML = `<i class="bi bi-sun"></i>`; // Change to sun icon in dark mode
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
        darkModeToggle.innerHTML = `<i class="bi bi-moon"></i>`; // Change to moon icon in light mode
    }
});