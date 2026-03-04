window.initEnterpriseComponents = () => {
  initEnterpriseReveal();
};

function initEnterpriseReveal() {
  const section = document.querySelector(".enterprise-section");
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
