const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressValue = document.querySelector(".progress-value");
const progressText = document.querySelector(".progress-text");
const errorMessage = document.querySelector(".error-message");

// Retrieve saved goals from localStorage
function loadSavedGoals() {
  inputFields.forEach((input, index) => {
    const savedGoal = localStorage.getItem(`goal-${index}`);
    if (savedGoal) {
      input.value = savedGoal;
    }
  });
}

// Save a goal to localStorage
function saveGoal(index, goal) {
  localStorage.setItem(`goal-${index}`, goal);
}

// Attach event listeners to each checkbox
checkBoxList.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    const isInputFilled = inputFields[index].value.trim() !== "";

    if (isInputFilled) {
      // Toggle the "completed" class on the parent container
      checkbox.parentElement.classList.toggle("completed");
      updateProgressBar();
    } else {
      // Show error message if input is empty
      errorMessage.textContent = "Please add a goal before marking it complete.";
      errorMessage.style.display = "block";
    }
  });
});

// Attach event listeners to each input field
inputFields.forEach((input, index) => {
  input.addEventListener("focus", () => {
    // Hide the error message when input is focused
    errorMessage.style.display = "none";
  });

  input.addEventListener("input", () => {
    const goal = input.value.trim();
    if (goal !== "") {
      saveGoal(index, goal); // Save goal to localStorage
    }
  });
});

// Function to update the progress bar
function updateProgressBar() {
  const totalGoals = checkBoxList.length;
  const completedGoals = document.querySelectorAll(".goal-container.completed").length;

  const progressPercentage = (completedGoals / totalGoals) * 100;
  progressValue.style.width = `${progressPercentage}%`;
  progressValue.textContent = `${completedGoals}/${totalGoals} completed`;

  // Update progress message
  if (completedGoals === 0) {
    progressText.textContent = "Raise the bar by completing tasks";
    progressText.style.display = "flex";
    progressText.style.justifyContent = "center";
    progressText.style.color = "#48A300";
    progressText.style.alignItems = "center";
    progressText.style.height = "100%";
    progressText.style.textAlign = "center";
  

  } else if (completedGoals === totalGoals) {
    progressText.textContent = "All tasks completed!";
    progressText.style.color = "#48A300"; // Success color
  } else {
    progressText.textContent = `${completedGoals} tasks completed`;
    progressText.style.color = "#858586"; // Neutral color
  }

  // Hide error message if progress changes
  errorMessage.style.display = "none";
}


document.querySelector(".reset-button").addEventListener("click", () => {
  localStorage.clear();
  inputFields.forEach(input => (input.value = ""));
  document.querySelectorAll(".goal-container.completed").forEach(container => 
    container.classList.remove("completed")
  );
  updateProgressBar();
});


inputFields.forEach((input, index) => {
  input.addEventListener("focus", () => {
    document.querySelector(`.error-message-${index}`).style.display = "none";
  });
});

checkBoxList.forEach((checkbox, index) => {
  checkbox.disabled = inputFields[index].value.trim() === "";
  inputFields[index].addEventListener("input", () => {
    checkbox.disabled = inputFields[index].value.trim() === "";
  });
});





// Initialize the page
loadSavedGoals();
updateProgressBar();
