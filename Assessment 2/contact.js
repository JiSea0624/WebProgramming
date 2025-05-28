// Select the cart count element and cart items container
const cartCountElement = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');

// Retrieve cart data from localStorage or initialize it
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Update the cart count and display chosen orders
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    // Populate the cart items container with chosen items
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = item;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// On page load, update the display
document.addEventListener('DOMContentLoaded', updateCartDisplay);

// Add an item to the cart
function addItemToCart(itemName) {
    cartCount++;
    cartItems.push(itemName);

    // Save updates to localStorage
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartDisplay();
}

// Remove an item from the cart
function removeItemFromCart(itemName) {
    const itemIndex = cartItems.indexOf(itemName);
    if (itemIndex !== -1) {
        cartCount--;
        cartItems.splice(itemIndex, 1);

        // Save updates to localStorage
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        updateCartDisplay();
    }
}
