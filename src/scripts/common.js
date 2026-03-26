document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadHomeContent();
    loadAboutContent();
    loadgoalContent();
    loadPhilosophyContent();
    loadIndustriesContent();
    loadLifecycleContent();
    loadQuestionsContent();
    loadPrivacyContent();
    loadEngageContent();
    loadFooterContent();
   const TOTAL_MS = 4500; // 13s approx

   setTimeout(() => {
     document.body.classList.add("is-ready");
   }, TOTAL_MS);

   loadSectorsContent();
   loadInvestmentContent();
   loadStrategyContent();
   loadEnterpriseContent();
});

const PRIVACY_ONLY_VIEW_PLACEHOLDERS = [
    // main sections
    'home-placeholder',
    'about-placeholder',
    'sectors-placeholder',
    'investment-placeholder',
    'goal-placeholder',
    'philosophy-placeholder',
    'strategic-placeholder',
    'industries-placeholder',
    'enterprise-placeholder',
    'lifecycle-placeholder',
    'questions-placeholder',
    // non-main content
    'about-engageholder',
    // footer
    'footer-placeholder',
];

function showNormalView() {
    document.body.classList.remove('is-privacy-only-view');

    // Restore all placeholders to their default rendering.
    const idsToRestore = [...PRIVACY_ONLY_VIEW_PLACEHOLDERS, 'privacy-placeholder'];
    idsToRestore.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.display = '';
    });

    // Avoid leaving privacy hash active when user returns to normal screen.
    if (window.location.hash && window.location.hash.startsWith('#privacy-')) {
        window.location.hash = '';
    }
}

function showPrivacyOnlyView() {
    document.body.classList.add('is-privacy-only-view');

    // Hide everything except navbar + privacy-placeholder.
    PRIVACY_ONLY_VIEW_PLACEHOLDERS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.display = 'none';
    });

    const privacyPlaceholder = document.getElementById('privacy-placeholder');
    if (privacyPlaceholder) {
        privacyPlaceholder.style.display = 'block';
        // Ensure the first section is highlighted in the sidebar.
        if (!window.location.hash || !window.location.hash.startsWith('#privacy-')) {
            window.location.hash = '#privacy-intro';
        }
    }
}

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
            initNavbarSmoothScroll();
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

function setActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    const hash = window.location.hash.slice(1) || null;

    document.querySelectorAll('.nav-links a, .mobile-nav .nav-scroll').forEach(link => {
        const href = link.getAttribute('href') || '';
        const isSectionLink = href.startsWith('#');
        const linkSectionId = isSectionLink ? href.slice(1) : null;
        const isActive = isSectionLink
            ? (page === 'index.html' && ((hash && linkSectionId === hash) || (!hash && linkSectionId === 'home-placeholder')))
            : href.includes(page);
        link.classList.toggle('active', isActive);
    });
}

function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileClose = document.getElementById('mobile-menu-close');

    function openMenu() {
        if (mobileOverlay) {
            mobileOverlay.classList.add('active');
            mobileOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            mobileOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', openMenu);
    }
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMenu);
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay || e.target.classList?.contains('mobile-menu-backdrop')) closeMenu();
        });
    }

    window.closeMobileMenu = closeMenu;
}

function initNavbarSmoothScroll() {
    const scrollLinks = document.querySelectorAll('.nav-scroll, .nav-links a[href^="#"], .mobile-nav .nav-scroll[href^="#"]');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const id = href.slice(1);
            const section = document.getElementById(id);
            if (section) {
                e.preventDefault();
                // Leaving privacy-only mode should restore the full page.
                if (document.body.classList.contains('is-privacy-only-view')) {
                    showNormalView();
                }
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveLinkBySection(id);
                if (mobileOverlay && mobileOverlay.classList.contains('active') && typeof window.closeMobileMenu === 'function') {
                    window.closeMobileMenu();
                }
            }
        });
    });

    const mobileNavContact = document.querySelector('.mobile-nav a[href*="contact"]');
    if (mobileNavContact && typeof window.closeMobileMenu === 'function') {
        mobileNavContact.addEventListener('click', () => window.closeMobileMenu());
    }
}

function setActiveLinkBySection(sectionId) {
    document.querySelectorAll('.nav-links a, .mobile-nav .nav-scroll').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href === '#' + sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
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

async function loadIndustriesContent() {
    const industriesPlaceholder = document.getElementById('industries-placeholder');
    if (!industriesPlaceholder) return;

    try {
        const response = await fetch('src/components/industries/industries.html');
        if (response.ok) {
            const html = await response.text();
            industriesPlaceholder.innerHTML = html;

            if (window.initIndustriesComponents) {
                window.initIndustriesComponents();
            }
        }
    } catch (error) {
        console.error('Error loading industries content:', error);
    }
}

async function loadIndustriesContent() {
    const industriesPlaceholder = document.getElementById('industries-placeholder');
    if (!industriesPlaceholder) return;

    try {
        const response = await fetch('src/components/industries/industries.html');
        if (response.ok) {
            const html = await response.text();
            industriesPlaceholder.innerHTML = html;

            if (window.initIndustriesComponents) {
                window.initIndustriesComponents();
            }
        }
    } catch (error) {
        console.error('Error loading industries content:', error);
    }
}
async function loadLifecycleContent() {
    const lifecyclePlaceholder = document.getElementById('lifecycle-placeholder');
    if (!lifecyclePlaceholder) return;

    try {
        const response = await fetch('src/components/lifecycle/lifecycle.html');
        if (response.ok) {
            const html = await response.text();
            lifecyclePlaceholder.innerHTML = html;

            if (window.initLifecycleComponents) {
                window.initLifecycleComponents();
            }
        }
    } catch (error) {
        console.error('Error loading lifecycle content:', error);
    }
}
async function loadQuestionsContent() {
    const questionsPlaceholder = document.getElementById('questions-placeholder');
    if (!questionsPlaceholder) return;

    try {
        const response = await fetch('src/components/questions/questions.html');
        if (response.ok) {
            const html = await response.text();
            questionsPlaceholder.innerHTML = html;

            if (window.initQuestionsComponents) {
                window.initQuestionsComponents();
            }
        }
    } catch (error) {
        console.error('Error loading questions content:', error);
    }
}



function initNavbarScroll() {
    const logoImg = document.querySelector('.logo-img');
    const header = document.querySelector('header');
    if (!header) return;

    const originalLogo = "public/assets/images/logo.svg";
    const coloredLogo = "public/assets/images/logo-colored.svg";

    function updateScrollState() {
        const scrolled = window.scrollY > 50;
        header.classList.toggle('is-scrolled', scrolled);
        if (logoImg) {
            logoImg.src = scrolled ? coloredLogo : originalLogo;
        }
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState);
}
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

async function loadPrivacyContent() {
    const privacyPlaceholder = document.getElementById('privacy-placeholder');
    if (!privacyPlaceholder) return;

    try {
        const response = await fetch('src/components/privacy/privacy.html');
        if (response.ok) {
            const html = await response.text();
            privacyPlaceholder.innerHTML = html;

            if (window.initPrivacyComponents) {
                window.initPrivacyComponents();
            }
        }
    } catch (error) {
        console.error('Error loading privacy content:', error);
    }
}


async function loadSectorsContent() {
    const sectorsPlaceholder = document.getElementById('sectors-placeholder');
    if (!sectorsPlaceholder) return;

    try {
        const response = await fetch('src/components/sectors/sectors.html');
        if (response.ok) {
            const html = await response.text();
            sectorsPlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initSectorsComponents) {
                window.initSectorsComponents();
            }
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

async function loadInvestmentContent() {
    const investmentPlaceholder = document.getElementById('investment-placeholder');
    if (!investmentPlaceholder) return;

    try {
        const response = await fetch('src/components/investment/investment.html');
        if (response.ok) {
            const html = await response.text();
            investmentPlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initInvestmentComponents) {
                window.initInvestmentComponents();
            }
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

async function loadStrategyContent() {
    const strategyPlaceholder = document.getElementById('strategic-placeholder');
    if (!strategyPlaceholder) return;

    try {
        const response = await fetch('src/components/strategy/strategy.html');
        if (response.ok) {
            const html = await response.text();
            strategyPlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initStrategyComponents) {
                window.initStrategyComponents();
            }
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

async function loadEnterpriseContent() {
    const enterprisePlaceholder = document.getElementById('enterprise-placeholder');
    if (!enterprisePlaceholder) return;

    try {
        const response = await fetch('src/components/enterprise/enterprise.html');
        if (response.ok) {
            const html = await response.text();
            enterprisePlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initEnterpriseComponents) {
                window.initEnterpriseComponents();
            }
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}
async function loadEngageContent() {
    const aboutPlaceholder = document.getElementById('about-engageholder');
    if (!aboutPlaceholder) return;

    try {
        const response = await fetch('src/components/engage/engage.html');
        if (response.ok) {
            const html = await response.text();
            aboutPlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initAboutComponents) {
                window.initAboutComponents();
            }
        }
    } catch (error) {
        console.error('Error loading engage content:', error);
    }
}
async function loadFooterContent() {
    const aboutPlaceholder = document.getElementById('footer-placeholder');
    if (!aboutPlaceholder) return;

    try {
        const response = await fetch('src/components/footer/footer.html');
        if (response.ok) {
            const html = await response.text();
            aboutPlaceholder.innerHTML = html;

            // Initialize about-specific components
            if (window.initAboutComponents) {
                window.initAboutComponents();
            }

            // Footer "Privacy Policy" should switch the app into privacy-only view.
            const privacyLink = aboutPlaceholder.querySelector('#footer-privacy-policy');
            if (privacyLink) {
                privacyLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPrivacyOnlyView();
                    const privacyPlaceholder = document.getElementById('privacy-placeholder');
                    if (privacyPlaceholder) {
                        privacyPlaceholder.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading footer content:', error);
    }
}