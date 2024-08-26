// animations.js

// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function () {
    const animatedHeadings = document.querySelectorAll('.animated-heading');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    animatedHeadings.forEach(heading => {
        observer.observe(heading);
    });
});
