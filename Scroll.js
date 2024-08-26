document.addEventListener('DOMContentLoaded', function () {
    // Get all the section elements and navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Function to remove the highlight from all links
    function removeHighlight() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Function to highlight the current link
    function highlightCurrentSection() {
        let scrollPos = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            let sectionTop = section.offsetTop - 70; // Adjust offset to highlight before reaching the section
            let sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                removeHighlight();
                let currentLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }

    // Create an observer for detecting section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Add active class to the nav link for the section in view
                removeHighlight();
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                // Remove active class when the section is not in view
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    }, { rootMargin: '0px', threshold: 0.6 });

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // Call the function on scroll and on page load
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection(); // Initial call to highlight the section on page load

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scrolling for "View Our Work" button
    const viewWorkButton = document.getElementById('view-work-button');
    viewWorkButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor click behavior
        const targetSection = document.getElementById('projects');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
