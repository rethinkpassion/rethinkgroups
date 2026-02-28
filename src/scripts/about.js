// About-specific scripts
window.initAboutComponents = () => {
    initAboutReveal();
};

function initAboutReveal() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    observer.observe(aboutSection);

    // Dynamic translation on scroll
    window.addEventListener('scroll', () => {
        const rect = aboutSection.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        if (scrollPercent > 0 && scrollPercent < 1) {
            const icon = aboutSection.querySelector('.floating-abstract-icon');
            if (icon) {
                const translateY = (1 - scrollPercent) * 50;
                const rotate = (1 - scrollPercent) * 15;
                icon.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
            }
        }
    });
}
