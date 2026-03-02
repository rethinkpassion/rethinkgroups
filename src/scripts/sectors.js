
window.initSectorsComponents = () => {
    initSectorsReveal();
};

function initSectorsReveal() {
    const sectorsSection = document.querySelector('.sectors-section');
    if (!sectorsSection) return;

    const title = sectorsSection.querySelector('.sectors-title');
    const pillarsContainer = sectorsSection.querySelector('.pillars-container');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectorsSection.classList.add('reveal-active');

                // Trigger animations
                if (title) animateTitleReveal(title);
                if (pillarsContainer) animatePillarsReveal(pillarsContainer);

                observer.unobserve(sectorsSection);
            }
        });
    }, observerOptions);

    observer.observe(sectorsSection);

    // Dynamic icon movement on scroll
    window.addEventListener('scroll', () => {
        const rect = sectorsSection.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);

        if (scrollPercent > 0 && scrollPercent < 1) {
            const icon = sectorsSection.querySelector('.floating-sectors-icon');
            if (icon) {
                const translateY = (1 - scrollPercent) * 50;
                const rotate = (1 - scrollPercent) * 15;
                icon.style.transform =
                    `translateY(${translateY}px) rotate(${rotate}deg)`;
            }
        }
    });
}

function animateTitleReveal(element) {
    let start = null;
    const duration = 1500;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);

        const ease = 1 - Math.pow(1 - percent, 3);

        const blurValue = 30 - (30 * ease);
        const translateY = -50 + (50 * ease);

        element.style.filter = `blur(${blurValue}px)`;
        element.style.opacity = ease;
        element.style.transform = `translateY(${translateY}px)`;

        if (percent < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function animatePillarsReveal(container) {
    const cards = container.querySelectorAll('.pillar-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            let start = null;
            const duration = 800;

            function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percent = Math.min(progress / duration, 1);

                const ease = 1 - Math.pow(1 - percent, 3);

                const translateY = 50 - (50 * ease);

                card.style.opacity = ease;
                card.style.transform = `translateY(${translateY}px)`;

                if (percent < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
        }, index * 200);
    });
}
