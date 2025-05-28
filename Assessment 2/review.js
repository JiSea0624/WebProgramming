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

// Convert the image file to a Base64 string
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

// Load comments from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    loadComments();

    // Image Upload - Show uploaded file name
    document.getElementById("image-upload").addEventListener("change", function () {
        const fileInput = this.files[0];
        const imageNameElement = document.getElementById("image-name");

        if (fileInput) {
            imageNameElement.textContent = fileInput.name;
        } else {
            imageNameElement.textContent = "No image uploaded";
        }
    });
});

// Handle form submission
document.getElementById("comment-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim() || "Anonymous";
    const message = document.getElementById("message").value.trim();

    if (!message) {
        alert("Please enter a message.");
        return;
    }

    const imageFile = document.getElementById("image-upload").files[0];
    let imageData = ""; // Initialize image data

    // Convert image to Base64 if it exists
    if (imageFile) {
        imageData = await convertToBase64(imageFile);
    }

    const timestamp = new Date().toLocaleString();

    const comment = {
        name: name,
        message: message,
        image: imageData, // Store Base64 image data
        timestamp: timestamp,
        likes: 0,
    };

    saveCommentToLocalStorage(comment);

    // Reset the form
    document.getElementById("comment-form").reset();
    document.getElementById("image-name").textContent = "No image uploaded";
});

// Save comment to localStorage
function saveCommentToLocalStorage(comment) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
}

// Load comments and display images
function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = ""; // Clear the comment list

    comments.reverse(); // Show newest comments first

    comments.forEach(function (comment, index) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="profile-info">${comment.name}</span>
                <span class="timestamp">${comment.timestamp}</span>
            </div>
            <p>${comment.message}</p>
            ${
                comment.image
                    ? `<img src="${comment.image}" alt="Uploaded Image" width="100">`
                    : ""
            }
            <div class="comment-actions">
                <span class="like-button" onclick="likeComment(this, ${index})">Like (${comment.likes})</span>
                <button onclick="deleteComment(${index})">Delete</button>
            </div>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Like a comment
function likeComment(likeButton, commentIndex) {
    const comments = JSON.parse(localStorage.getItem("comments"));
    const comment = comments[commentIndex];

    comment.likes++;
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
}

// Delete a comment
function deleteComment(commentIndex) {
    const confirmation = confirm("Are you sure you want to delete this comment?");
    if (confirmation) {
        const comments = JSON.parse(localStorage.getItem("comments"));
        comments.splice(commentIndex, 1); // Remove the comment from the array
        localStorage.setItem("comments", JSON.stringify(comments));
        loadComments(); // Reload comments after deletion
    }
}
