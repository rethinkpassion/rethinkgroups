document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadHomeContent();
    loadAboutContent();
    loadgoalContent();
    loadPhilosophyContent();
   const TOTAL_MS = 5500; // 13s approx

   setTimeout(() => {
     document.body.classList.add("is-ready");
   }, TOTAL_MS);
});

async function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    try {
        // Determine path to navbar.html based on current location
        // For root index.html, it's src/components/layout/navbar.html
        const response = await fetch('src/components/layout/navbar.html');
        if (response.ok) {
            const html = await response.text();
            navbarPlaceholder.innerHTML = html;

            // Set active state
            setActiveLink();

            // Initialize mobile menu if needed
            initNavbarScroll();
            initMobileMenu();
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

function setActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(page)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }
}

async function loadHomeContent() {
    const homePlaceholder = document.getElementById('home-placeholder');
    if (!homePlaceholder) return;

    try {
        const response = await fetch('src/components/home/home.html');
        if (response.ok) {
            const html = await response.text();
            homePlaceholder.innerHTML = html;

            // Initialize home-specific components (e.g., circular text)
            if (window.initHomeComponents) {
                window.initHomeComponents();
            }
        }
    } catch (error) {
        console.error('Error loading home content:', error);
    }
}

async function loadAboutContent() {
    const aboutPlaceholder = document.getElementById('about-placeholder');
    if (!aboutPlaceholder) return;

    try {
        const response = await fetch('src/components/about/about.html');
        if (response.ok) {
            const html = await response.text();
            aboutPlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initAboutComponents) {
                window.initAboutComponents();
            }
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

async function loadgoalContent() {
    const goalPlaceholder = document.getElementById('goal-placeholder');
    if (!goalPlaceholder) return;

    try {
        const response = await fetch('src/components/goal/goal.html');
        if (response.ok) {
            const html = await response.text();
            goalPlaceholder.innerHTML = html;

            // Initialize goal-specific components
            if (window.initgoalComponents) {
                window.initgoalComponents();
            }
        }
    } catch (error) {
        console.error('Error loading goal content:', error);
    }
}

async function loadPhilosophyContent() {
    const philosophyPlaceholder = document.getElementById('philosophy-placeholder');
    if (!philosophyPlaceholder) return;

    try {
        const response = await fetch('src/components/philosophy/philosophy.html');
        if (response.ok) {
            const html = await response.text();
            philosophyPlaceholder.innerHTML = html;

            // Initialize philosophy-specific components
            if (window.initPhilosophyComponents) {
                window.initPhilosophyComponents();
            }
        }
    } catch (error) {
        console.error('Error loading philosophy content:', error);
    }
}

function initNavbarScroll() {
    const logoImg = document.querySelector('.logo-img');
    if (!logoImg) return;

    const originalLogo = "public/assets/images/logo.svg";
    const coloredLogo = "public/assets/images/logo-colored.svg";

    // Set initial state based on current scroll
    if (window.scrollY > 50) {
        logoImg.src = coloredLogo;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (logoImg.src.indexOf(coloredLogo) === -1) {
                logoImg.src = coloredLogo;
            }
        } else {
            if (logoImg.src.indexOf(originalLogo) === -1) {
                logoImg.src = originalLogo;
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector("#about");
    observer.observe(aboutSection);
});
/* ===============================
   LOADER CONTROL
=================================*/

function hideLoader() {
    const loader = document.getElementById('loader');

    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
    }, 500);
}
