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

// User Inputs Data 
document.addEventListener("DOMContentLoaded", function () {
    const reviewDiv = document.getElementById("reviewDetails");
    const checkoutDiv = document.getElementById("checkoutDetails");

    const shippingData = JSON.parse(localStorage.getItem("shippingData"));
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

    // Capitalization in Choices
    function formatOption(option) {
        if (!option) return "";

        const map = {
            "addcard": "Add Card",
            "cashondelivery": "Cash On Delivery"
        };

        if (map[option.toLowerCase()]) {
            return map[option.toLowerCase()];
        }

        return option
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_-]/g, ' ')
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Shipping Details
    if (shippingData) {
        reviewDiv.innerHTML = `
            <h3>Shipping Details</h3>
            <p><strong>Name:</strong> ${shippingData["first-name"]} ${shippingData["last-name"]}</p>
            <p><strong>Email:</strong> ${shippingData["email"]}</p>
            <p><strong>Phone:</strong> ${shippingData["phone-number"]}</p>
            <p><strong>Address:</strong> ${shippingData["street"]}</p>
            <p><strong>City:</strong> ${shippingData["city"]}</p>
            <p><strong>State:</strong> ${shippingData["state"]}</p>
        `;

        if (shippingData["apartment"]) {
            reviewDiv.innerHTML += `<p><strong>Apartment:</strong> ${shippingData["apartment"]}</p>`;
        }

        if (shippingData["district"]) {
            reviewDiv.innerHTML += `<p><strong>District:</strong> ${shippingData["district"]}</p>`;
        }

        if (shippingData["reference"]) {
            reviewDiv.innerHTML += `<p><strong>Reference:</strong> ${shippingData["reference"]}</p>`;
        }
    }

    // Delivery and Payment Details
    if (checkoutData) {
        checkoutDiv.innerHTML = `
            <h3>Delivery & Payment Details</h3>
            <p><strong>Delivery Option:</strong> ${formatOption(checkoutData.deliveryOption)}</p>
            <p><strong>Payment Method:</strong> ${formatOption(checkoutData.paymentOption)}</p>
        `;

        if (checkoutData.specialInstructions && checkoutData.specialInstructions.trim() !== "") {
            checkoutDiv.innerHTML += `<p><strong>Special Instructions:</strong> ${checkoutData.specialInstructions}</p>`;
        }

        if (checkoutData.paymentOption.toLowerCase() === "addcard" && checkoutData.cardNumber && checkoutData.expiryDate) {
            checkoutDiv.innerHTML += `
                <p><strong>Card Number:</strong> **** **** **** ${checkoutData.cardNumber.slice(-4)}</p>
                <p><strong>Expiry Date:</strong> ${checkoutData.expiryDate}</p>
            `;
        }
    }
});

// Notification
document.getElementById('placeOrder').addEventListener('click', function () {
  if (document.getElementById('confirmationPrompt')) return;

  // Create confirmation prompt
  const confirmBox = document.createElement('div');
  confirmBox.id = 'confirmationPrompt';

  Object.assign(confirmBox.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    zIndex: '1000',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  });

  confirmBox.innerHTML = `
    <p style="margin-bottom: 20px;">Are you sure that your information is final?</p>
    <div style="display: flex; gap: 10px;">
      <button id="yesConfirm" style="
        padding: 8px 16px;
        background-color: #91772b;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">Yes</button>
      <button id="noConfirm" style="
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">No</button>
    </div>
  `;

  document.body.appendChild(confirmBox);

  document.getElementById('yesConfirm').addEventListener('click', function () {
    confirmBox.remove();
    showOrderComplete();
  });

  document.getElementById('noConfirm').addEventListener('click', function () {
    confirmBox.remove();
  });
});

function showOrderComplete() {
  if (document.getElementById('notification')) return;

  const notification = document.createElement('div');
  notification.id = 'notification';

  Object.assign(notification.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    zIndex: '1000',
    width: '40%'
  });

  notification.innerHTML = `
    <h2 style="margin-top: 0; color: #755c12">Order complete – we’re on it!</h2>
    <p>We’re thrilled to craft something beautiful for you. Your confirmation email is on its way!</p>
    <button id="closeNotification" style="
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #755c12;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    ">Close</button>
  `;

  document.body.appendChild(notification);

  document.getElementById('closeNotification').addEventListener('click', function () {
    window.location.href = 'Assessment 2.html';
  });
}
