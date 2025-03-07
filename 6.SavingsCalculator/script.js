// Initialize Feather icons
feather.replace();

// Roadmap Step 1: Select DOM elements
const goalAmountInput = document.getElementById("goal-amount");
const currentSavingsInput = document.getElementById("current-savings");
const monthlyContributionInput = document.getElementById(
  "monthly-contribution"
);
const calculatebtn = document.getElementById("calculate-btn");
const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("result");

// Roadmap Step 2: Add event listener for calculate button
calculatebtn.addEventListener("click", () => {
  // Roadmap Step 3: Validate user input
  const goalAmount = parseFloat(goalAmountInput.value);
  const currentSavings = parseFloat(currentSavingsInput.value);
  const monthlyContribution = parseFloat(monthlyContributionInput.value);
  if (
    isNaN(goalAmount) ||
    isNaN(currentSavings) ||
    isNaN(monthlyContribution)
  ) {
    result.textContent = "Please Enter Valid Numbers";
    result.classList.add("show");
    return;
  }
  // Roadmap Step 4: Calculate remaining amount and months to reach goal
  const remainingAmount = goalAmount - currentSavings;
  const monthsToGoal = Math.ceil(remainingAmount / monthlyContribution);
  const progressPercentage = (currentSavings / goalAmount) * 100;
  // Roadmap Step 5: Update progress bar based on current savings
  progressBar.style.width = `${progressPercentage}%`;
  // Roadmap Step 6: Display result based on the savings progress
  result.classList.remove("show");
  setTimeout(() => {
    // Roadmap Step 7: Handle UI updates and transitions for result display
    if (currentSavings >= goalAmount) {
      result.innerHTML = `Congrats,Your Goal Is Achieved`;
    } else {
      result.innerHTML = `Keep Going You'll Achieve The Goal in ${monthsToGoal} Months`;
    }
    result.classList.add("show");
  });
});
