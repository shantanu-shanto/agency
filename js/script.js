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

// Add click event listener to all project images
document.querySelectorAll('.card-img-top').forEach(image => {
    image.addEventListener('click', function () {
      const imageSrc = this.getAttribute('src'); // Get image source
      const modalImage = document.getElementById('modalImage');
      modalImage.src = imageSrc; // Set modal image source
      const modal = new bootstrap.Modal(document.getElementById('imageModal'));
      modal.show(); // Show modal
    });
});
  

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const modalImage = document.getElementById("modalImage");

    // Add click event listeners to all images with the class 'team-image'
    document.querySelectorAll(".team-image").forEach(image => {
        image.addEventListener("click", function () {
            // Set the modal image source to the clicked image's source
            modalImage.src = this.src;
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

