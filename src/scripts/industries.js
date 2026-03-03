/**
 * Industries carousel - JS-controlled, one slide at a time
 */
window.initIndustriesComponents = function () {
    const track = document.getElementById('industries-track');
    const wrapper = document.querySelector('.industries-carousel-wrapper');
    if (!track || !wrapper) return;

    const totalSlides = 7;
    const SLIDE_DURATION_MS = 5000;
    const TRANSITION_MS = 600;

    let currentIndex = 0;
    let autoInterval = null;
    let isPaused = false;

    function getSlideHeight() {
        const firstSlide = track.querySelector('.industries-slide');
        return firstSlide ? firstSlide.offsetHeight : window.innerHeight * 0.75;
    }

    function goToSlide(index, animate = true) {
        const slideHeight = getSlideHeight();
        const offset = -index * slideHeight;

        track.style.transition = animate ? `transform ${TRANSITION_MS}ms ease` : 'none';
        track.style.transform = `translateY(${offset}px)`;
        currentIndex = index;
    }

    function nextSlide() {
        const next = currentIndex + 1;

        if (next < totalSlides) {
            goToSlide(next, true);
        } else {
            goToSlide(0, false);
        }
    }

    function startAutoPlay() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(() => {
            if (!isPaused) nextSlide();
        }, SLIDE_DURATION_MS);
    }

    function stopAutoPlay() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    wrapper.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoPlay();
    });
    wrapper.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoPlay();
    });

    goToSlide(0, false);
    startAutoPlay();

    window.addEventListener('resize', () => {
        goToSlide(currentIndex % totalSlides, false);
    });
};
