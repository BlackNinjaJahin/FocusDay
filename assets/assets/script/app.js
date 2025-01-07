const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressValue = document.querySelector(".progress-value");
const progressText = document.querySelector(".progress-text");

checkBoxList.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    // Check if the input field for the current goal is filled
    const isInputFilled = inputFields[index].value.trim() !== "";

    if (isInputFilled) {
      // Toggle the "completed" class on the parent container
      checkbox.parentElement.classList.toggle("completed");
    }

    // Update the progress bar dynamically
    updateProgressBar();
  });
});

// Function to update the progress bar
function updateProgressBar() {
  const totalGoals = checkBoxList.length;
  const completedGoals = document.querySelectorAll(".goal-container.completed").length;

  const progressPercentage = (completedGoals / totalGoals) * 100;
  progressValue.style.width = `${progressPercentage}%`;
  progressValue.textContent = `${completedGoals}/${totalGoals} completed`;

  // Show an appropriate progress message
  if (completedGoals === 0) {
    progressText.textContent = "0 completed";
    progressText.style.color = "#red"; // Error color
  } else if (completedGoals === totalGoals) {
    progressText.textContent = "All tasks completed!";
    progressText.style.color = "#48A300"; // Success color
  } else {
    progressText.textContent = `${completedGoals} tasks completed`;
    progressText.style.color = "#858586"; // Neutral color
  }
}

// Initial state for the progress bar
updateProgressBar();
