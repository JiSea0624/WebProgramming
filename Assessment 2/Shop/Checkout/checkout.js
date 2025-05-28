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

// Form Elements ensuring that everything will work correctly
document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone-number");
    const emailInput = document.getElementById("email");
    const nextButton = document.getElementById("next-button");
    const form = document.getElementById("shipping-form");

    // Format phone input
    phoneInput.addEventListener("input", function () {
        phoneInput.value = phoneInput.value.replace(/[^+\d]/g, "");
        if (phoneInput.value.indexOf("+") > 0) {
            phoneInput.value = phoneInput.value.replace(/\+/g, "");
        }
    });

    nextButton.addEventListener("click", function (event) {
        let isValid = true;
        const allInputs = form.querySelectorAll("input");
        allInputs.forEach(input => input.style.border = "");

        // Check if all inputs needed are filled
        const requiredFields = form.querySelectorAll("input[required]");
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.border = "2px solid red";
                isValid = false;
            }
        });

        const phoneRegex = /^\+?\d{10,}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.style.border = "2px solid red";
            isValid = false;
        }

        if (!emailInput.value.includes("@")) {
            emailInput.style.border = "2px solid red";
            isValid = false;
        }

        if (isValid) {
            const formData = {};
            allInputs.forEach(input => {
                formData[input.name] = input.value;
            });
            localStorage.setItem("shippingData", JSON.stringify(formData));

            // Redirect
            window.location.href = "checkout sdm.html";
        }
    });
});
