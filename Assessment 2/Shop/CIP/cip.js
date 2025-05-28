const addToCartButton = document.getElementById('addToCart');
const backButton = document.getElementById('backButton');
const notification = document.getElementById('notification');
const closeNotification = document.getElementById('closeNotification');
const content = document.getElementById('content');
const cartCountElement = document.getElementById('cartCount');
const customizeNoButton = document.getElementById('customizeNo');
const customizeYesButton = document.getElementById('customizeYes');

// Save link source when navigating
document.querySelectorAll('.navigation-link').forEach(link => {
  link.addEventListener('click', (e) => {
    localStorage.setItem('lastVisited', e.target.getAttribute('href'));
  });
});

// Add to Cart functionality
addToCartButton.addEventListener('click', () => {
  notification.style.display = 'flex';
});

// Close notification
closeNotification.addEventListener('click', () => {
  notification.style.display = 'none';
});

// Retrieve the cart count from localStorage or initialize it
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

// Update the cart count on the page
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
}

// Increment the cart count and save it to localStorage
function incrementCartCount() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount); 
    updateCartDisplay();
}

// Decrement the cart count (to be called when an item is removed from the list)
function decrementCartCount() {
    if (cartCount > 0) {
        cartCount--;
        localStorage.setItem('cartCount', cartCount); 
        updateCartDisplay();
    }
}

// Event listener for "Get it as it is"
customizeNoButton.addEventListener('click', () => {
    incrementCartCount();
    notification.style.display = 'none';
    content.classList.remove('blur-background');
});

// Event listener for "Yes" button in the notification
customizeYesButton.addEventListener('click', (event) => {
    notification.style.display = 'none';
    content.classList.remove('blur-background');
});

// Update the cart display on page load
updateCartDisplay();
