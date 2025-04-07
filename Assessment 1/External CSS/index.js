// Select input fields and button
const petrolCostInput = document.getElementById("petrol-cost");
const litersInput = document.getElementById("liters");
const calculateBtn = document.getElementById("calculate-btn");
const totalCostDisplay = document.getElementById("total-cost");

// Function to calculate the total cost
function calculateTotalCost() {
  const petrolCost = parseFloat(petrolCostInput.value);
  const liters = parseFloat(litersInput.value);

  // Validate inputs to ensure they are numbers
  if (isNaN(petrolCost) || isNaN(liters)) {
    totalCostDisplay.textContent = "Please enter valid numbers.";
    return;
  }

  // Calculate the total cost
  const totalCost = petrolCost * liters;

  // Update the total cost display
  totalCostDisplay.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

// Add click event listener to the button
calculateBtn.addEventListener("click", calculateTotalCost);
