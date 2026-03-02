document.addEventListener('DOMContentLoaded', function() {
    const philosophyPoints = document.querySelectorAll('.philosophy-point');
    
    philosophyPoints.forEach((point, index) => {
        point.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.point-arrow');
            
            // Add staggered animation delay based on index
            arrow.style.transitionDelay = `${index * 0.05}s`;
        });
        
        point.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.point-arrow');
            arrow.style.transitionDelay = '0s';
        });
    });
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    philosophyPoints.forEach(point => {
        point.style.opacity = '0';
        point.style.transform = 'translateY(20px)';
        point.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(point);
    });
});
