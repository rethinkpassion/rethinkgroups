
window.initAboutComponents = () => {
    initAboutReveal();
};

function initAboutReveal() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('reveal-active');
                // Vision title is animated by CSS only (slideInFromLeftBlurToClear) — no JS so no initial flash
                observer.unobserve(aboutSection); // Run once
            }
        });
    }, observerOptions);

    observer.observe(aboutSection);

    // Dynamic translation on scroll (icon movement)
    window.addEventListener('scroll', () => {
        const rect = aboutSection.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);

        if (scrollPercent > 0 && scrollPercent < 1) {
            const icon = aboutSection.querySelector('.floating-abstract-icon');
            if (icon) {
                const translateY = (1 - scrollPercent) * 50;
                const rotate = (1 - scrollPercent) * 15;
                icon.style.transform =
                    `translateY(${translateY}px) rotate(${rotate}deg)`;
            }
        }
    });
}

/* 🔥 Blur → Sharp Animation */
// function animateBlurReveal(element) {
//     let start = null;
//     const duration = 2200; // smooth cinematic

//     function animate(timestamp) {
//         if (!start) start = timestamp;
//         const progress = timestamp - start;
//         const percent = Math.min(progress / duration, 1);

//         // Smooth ease-out cubic
//         const ease = 1 - Math.pow(1 - percent, 3);

//         const blurValue = 20 - (20 * ease);
//         const opacityValue = ease;
//         const scaleValue = 0.95 + (0.05 * ease);

//         element.style.filter = `blur(${blurValue}px)`;
//         element.style.opacity = opacityValue;
//         element.style.transform = `scale(${scaleValue})`;

//         if (percent < 1) {
//             requestAnimationFrame(animate);
//         }
//     }

//     requestAnimationFrame(animate);
// }
function animateBlurReveal(element) {
    let start = null;
    const duration = 2200;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);

        // Smooth cinematic ease
        const ease = 1 - Math.pow(1 - percent, 3);

        // Blur from 35px → 0
        const blurValue = 35 - (35 * ease);

        // Slide from left (more dramatic movement)
        const translateX = -400 + (400 * ease);

        element.style.filter = `blur(${blurValue}px)`;
        element.style.opacity = ease;
        element.style.transform = `translateX(${translateX}px)`;

        if (percent < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}