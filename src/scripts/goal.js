
window.initgoalComponents = () => {
    initgoalReveal();
};

function initgoalReveal() {
    const goalSection = document.querySelector('.goal-section');
    if (!goalSection) return;

    const title = goalSection.querySelector('.goal-title');
    const pillarsContainer = goalSection.querySelector('.pillars-container');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                goalSection.classList.add('reveal-active');

                // Trigger animations
                if (title) animateTitleReveal(title);
                if (pillarsContainer) animatePillarsReveal(pillarsContainer);

                observer.unobserve(goalSection);
            }
        });
    }, observerOptions);

    observer.observe(goalSection);

    // Dynamic icon movement on scroll
    window.addEventListener('scroll', () => {
        const rect = goalSection.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);

        if (scrollPercent > 0 && scrollPercent < 1) {
            const icon = goalSection.querySelector('.floating-goal-icon');
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
