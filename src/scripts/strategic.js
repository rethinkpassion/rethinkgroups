window.initStrategyComponents = () => {
  initStrategyReveal();
};

function initStrategyReveal() {
  const section = document.querySelector(".strategic-section");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("reveal-active");
          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(section);
}
