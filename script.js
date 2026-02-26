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

// ================================
// Lemon Landing Experience Module
// ================================
(function(){

  // ----------------------
  // GSAP Plugin Registration
  // ----------------------
  gsap.registerPlugin(ScrollTrigger);

  // ----------------------
  // THREE.js Scene Setup
  // ----------------------
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three-container").appendChild(renderer.domElement);

  // ----------------------
  // Lighting
  // ----------------------
  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(5, 10, 7);
  scene.add(light);

  // ----------------------
  // Tree (Simplified Premium Sphere)
  // ----------------------
  const treeGeometry = new THREE.SphereGeometry(3, 64, 64);
  const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x3e6b2f });
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.y = -1;
  scene.add(tree);

  // ----------------------
  // Lemon
  // ----------------------
  const lemonGeometry = new THREE.SphereGeometry(0.5, 64, 64);
  const lemonMaterial = new THREE.MeshStandardMaterial({ color: 0xf4c430, roughness: 0.4 });
  const lemon = new THREE.Mesh(lemonGeometry, lemonMaterial);
  lemon.position.set(1.2, 1.5, 0);
  scene.add(lemon);

  // ----------------------
  // Wind Sway Animation
  // ----------------------
  gsap.to(tree.rotation, {
    z: 0.05,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // ----------------------
  // Lemon Drop + Bounce
  // ----------------------
  setTimeout(() => {
    gsap.to(lemon.position, {
      y: -3,
      duration: 1.5,
      ease: "bounce.out",
      onComplete: crackLemon
    });
  }, 3000);

  // ----------------------
  // Crack Lemon + Scatter Seeds
  // ----------------------
  function crackLemon() {
    lemon.material.color.set(0xe0b22e); // Change color to "cracked"

    // Create seeds scattering
    for (let i = 0; i < 20; i++) {
      const seedGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const seedMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const seed = new THREE.Mesh(seedGeometry, seedMaterial);
      seed.position.copy(lemon.position);
      scene.add(seed);

      gsap.to(seed.position, {
        x: (Math.random() - 0.5) * 4,
        y: -4,
        z: (Math.random() - 0.5) * 2,
        duration: 2,
        ease: "power2.out"
      });
    }

    // Reveal text and form
    revealTextSequence();
    revealForm();
  }

  // ----------------------
  // Reveal Text Sequence
  // ----------------------
  function revealTextSequence() {
    gsap.to(".headline-main", { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" });
    gsap.to(".headline-sub", { opacity: 1, y: 0, duration: 1.5, delay: 1.5, ease: "power3.out" });
    gsap.to(".headline-question", { opacity: 1, y: 0, duration: 1.5, delay: 3, ease: "power3.out" });
  }

  // ----------------------
  // Reveal Form Section
  // ----------------------
  function revealForm() {
    document.querySelector(".form-section").style.bottom = "0";
  }

  // ----------------------
  // Animate Scene
  // ----------------------
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // ----------------------
  // Handle Window Resize
  // ----------------------
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ----------------------
  // Bird Sound on Click
  // ----------------------
  const birds = document.getElementById("birds");
  window.addEventListener("click", () => { birds.play(); });

  // ----------------------
  // Form Submit Handler
  // ----------------------
  document.getElementById("lemonForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your lemon has been planted. When it becomes something, we will let you know.");
    e.target.reset();
  });

})();
function scaleObjects() {
  if(window.innerWidth < 768) {
    tree.scale.set(0.5, 0.5, 0.5);
    lemon.scale.set(0.35, 0.35, 0.35);
  } else {
    tree.scale.set(0.8, 0.8, 0.8);
    lemon.scale.set(0.5, 0.5, 0.5);
  }
}
scaleObjects();

window.addEventListener("resize", scaleObjects);
window.addEventListener("click", () => birds.play());
window.addEventListener("touchstart", () => birds.play());
const treeSegments = window.innerWidth < 480 ? 16 : 64;
const lemonSegments = window.innerWidth < 480 ? 16 : 64;

const treeGeometry = new THREE.SphereGeometry(3, treeSegments, treeSegments);
const lemonGeometry = new THREE.SphereGeometry(0.5, lemonSegments, lemonSegments);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
