// Home-specific scripts
document.addEventListener('DOMContentLoaded', () => {
    initCircularText();
});

// Since home content is loaded dynamically, we might need to call this after fetch
function initCircularText() {
    const textElement = document.getElementById('rotating-text');
    if (!textElement) {
        // If not found, it might still be loading. Let's observe or retry.
        // For simplicity in this structure, we'll check periodically or rely on the caller.
        return;
    }

    const text = textElement.getAttribute('data-text') || "";
    textElement.innerHTML = ""; // Clear existing

    text.split("").forEach((char, i) => {
        const span = document.createElement('span');
        span.style.setProperty('--i', i + 1);
        span.textContent = char;
        textElement.appendChild(span);
    });
}

// Export for use in common.js after content is loaded
window.initHomeComponents = () => {
    initCircularText();
    initScrollRevealText();
};

let revealInterval;

function initScrollRevealText() {
    const revealElement = document.getElementById('reveal-text');
    if (!revealElement) return;

    if (revealInterval) clearInterval(revealInterval);

    const words = revealElement.textContent.trim().split(/\s+/);
    revealElement.innerHTML = '';

    words.forEach(word => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        revealElement.appendChild(span);
    });

    const spans = revealElement.querySelectorAll('span');

    let activeCount = 2; // Start with first 2 words

    function highlightWords() {
        spans.forEach((span, i) => {
            if (i < activeCount) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });

        activeCount += 2;

        if (activeCount > spans.length) {
            activeCount = 2; // Reset back to first 2
        }
    }

    revealInterval = setInterval(highlightWords, 1000);
    highlightWords();
    // }
};
