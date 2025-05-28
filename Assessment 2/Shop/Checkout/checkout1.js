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

// Delivery and Payment Method Conditions
document.getElementById('next-button').addEventListener('click', function () {
    const deliveryOption = document.getElementById('delivery-options');
    const paymentOption = document.getElementById('payment-options');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const specialInstructions = document.getElementById('special-instructions').value.trim();

    const deliveryValue = deliveryOption.value;
    const paymentValue = paymentOption.value;

    const cardNumberValue = cardNumberInput.value.trim();
    const expiryDateValue = expiryDateInput.value.trim();
    const cvvValue = cvvInput.value.trim();

    // Reset 
    [deliveryOption, paymentOption, cardNumberInput, expiryDateInput, cvvInput].forEach(el => {
        el.style.border = '';
    });

    let isValid = true;

    // Check if all inputs needed are filled
    if (!deliveryValue) {
        deliveryOption.style.border = '2px solid red';
        isValid = false;
    }

    if (!paymentValue) {
        paymentOption.style.border = '2px solid red';
        isValid = false;
    }

    if (paymentValue === "addcard") {
        cardNumberInput.value = cardNumberValue.replace(/[^0-9]/g, '').slice(0, 16);
        cvvInput.value = cvvValue.replace(/[^0-9]/g, '').slice(0, 4);
        expiryDateInput.value = expiryDateValue.replace(/[^0-9\/]/g, '').slice(0, 7);

        if (cardNumberInput.value.length !== 16) {
            cardNumberInput.style.border = '2px solid red';
            isValid = false;
        }

        if (expiryDateInput.value === "") {
            expiryDateInput.style.border = '2px solid red';
            isValid = false;
        }

        if (cvvInput.value.length < 3) {
            cvvInput.style.border = '2px solid red';
            isValid = false;
        }
    }

    if (isValid) {
        // Save input data to localStorage
        const checkoutData = {
            deliveryOption: deliveryValue,
            paymentOption: paymentValue,
            specialInstructions: specialInstructions,
            cardNumber: paymentValue === "addcard" ? cardNumberValue : "",
            expiryDate: paymentValue === "addcard" ? expiryDateValue : "",
            cvv: paymentValue === "addcard" ? cvvValue : ""
        };

        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

        // Redirect to final checkout page
        window.location.href = "checkout final.html";
    }
});