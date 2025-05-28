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
    localStorage.setItem('cartCount', cartCount); 
    updateCartDisplay();
}

// Decrement the cart count
function decrementCartCount() {
    if (cartCount > 0) {
        cartCount--;
        localStorage.setItem('cartCount', cartCount); 
        updateCartDisplay();
    }
}