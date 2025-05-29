// Slides working independently in a loop.
const slideGroups = [
  document.querySelectorAll('.info-slide'),
  document.querySelectorAll('.info-slide1'),
  document.querySelectorAll('.info-slide2')
];

// Time of each slide
const slideInterval = 2000;

// Function to display the current slide for a specific group
function showSlide(group, index) {
  group.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

// Function to attach click event for each slide
function setupClickHandlers(group) {
  group.forEach((slide) => {
    const link = slide.querySelector('a');
    if (link) {
      slide.addEventListener('click', () => {
        window.location.href = link.href;
      });
    }
  });
}

// Function to start the auto-slide for all groups
function startAutoSlide() {
  slideGroups.forEach((group) => {
    let currentSlide = 0;

    // Attach click handlers once
    setupClickHandlers(group);

    // Show the first slide initially
    showSlide(group, currentSlide);

    // Set interval to cycle through slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % group.length;
      showSlide(group, currentSlide);
    }, slideInterval);
  });
}

// Start the auto-slide
startAutoSlide();

// Select the cart count element
const cartCountElement = document.getElementById('cartCount');

// Retrieve the cart count from localStorage or initialize it
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

// Update the cart count on the page
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
}

// On page load, update the display
document.addEventListener('DOMContentLoaded', updateCartDisplay);

// Increment the cart count
function incrementCartCount() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount); // Save to localStorage
    updateCartDisplay();
}

// Decrement the cart count
function decrementCartCount() {
    if (cartCount > 0) {
        cartCount--;
        localStorage.setItem('cartCount', cartCount); // Save to localStorage
        updateCartDisplay();
    }
}