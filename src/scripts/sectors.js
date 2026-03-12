// About-specific scripts
window.initSectorsComponents = () => {
    initSectorsReveal();
    initSectorHoverPreview();
};

function initSectorsReveal() {
    const aboutSection = document.querySelector('.sectors-section');
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

function initSectorHoverPreview() {

    const preview = document.getElementById("sector-hover-preview");
    const items = document.querySelectorAll(".primary-sectors-list p");

    if (!preview || items.length === 0) return;

    items.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        const imageSrc = this.getAttribute("data-image");
        if (!imageSrc) return;

        preview.src = imageSrc;
        preview.style.opacity = "1";

        /* Only for devices that support hover (desktop) */
        if (window.matchMedia("(hover: hover)").matches) {
          const rect = this.getBoundingClientRect();

          preview.style.top =
            rect.top + window.scrollY + (rect.height / 2 - 51) + "px";

          preview.style.right = rect.right + 4 + "px";
        }
      });

      item.addEventListener("mouseleave", function () {
        preview.style.opacity = "0";
      });

      /* Mobile tap support */
      item.addEventListener("click", function () {
        const imageSrc = this.getAttribute("data-image");
        if (!imageSrc) return;

        preview.src = imageSrc;
        preview.style.opacity = "1";

        if (!window.matchMedia("(hover: hover)").matches) {
          const itemRect = this.getBoundingClientRect();
          const listRect = this.closest(
            ".primary-sectors-list",
          ).getBoundingClientRect();

          /* calculate position relative to the list */
          const topPosition = itemRect.top - listRect.top;

          preview.style.top = topPosition + 50 + "px";
          const screenWidth = window.innerWidth;

          if (screenWidth <= 600) {
            /* phones */
            preview.style.left = "283px";
          } else if (screenWidth <= 1024) {
            /* iPad / tablets */
            preview.style.left = "400px";
          }

        }
      });
    });
}
