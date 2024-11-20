// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800, // Duration of animations in milliseconds
    once: false, // Animation should happen every time you scroll down
    mirror: true,
});


// Counting Animation Function
function animateCountUp(element) {
    const target = +element.getAttribute('data-count');
    const speed = 100; // Adjust for faster/slower animation
    const increment = (target / speed) * 2; // Faster increment

    let count = 0;

    const updateCount = () => {
        count += increment;
        if (count < target) {
            element.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };

    updateCount();
}

// Function to Reset Count and Restart Animation
function resetAndAnimateCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach((element) => {
        element.textContent = '0'; // Reset the count
        animateCountUp(element); // Restart the animation
    });
}

// Trigger Animation on Scroll
function initCountUp() {
    const aboutSection = document.querySelector('#about');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    resetAndAnimateCountUp();
                }
            });
        },
        { threshold: 0.6 } // Trigger when 60% of the section is visible
    );

    observer.observe(aboutSection);
}

// Initialize the Counting Animation
document.addEventListener('DOMContentLoaded', initCountUp);

