document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-countdown");
  const pauseBtn = document.getElementById("pause-countdown");
  const cancelBtn = document.getElementById("cancel-countdown");
  const resumeBtn = document.getElementById("resume-countdown");
  const timerDisplay = document.getElementById("timer-display");
  let countdownTimer;
  let endTime;

  function updateDisplay(time) {
    const days = Math.floor(time / 1000 / 60 / 60 / 24);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  function resetDisplay() {
    document.getElementById("target-date").value = "";
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    cancelBtn.disabled = true;
  }

  function startCountdown(duration, isResuming = false) {
    if (!isResuming) {
      endTime = Date.now() + duration;
    }
    countdownTimer = setInterval(() => {
      const now = Date.now();
      const timeLeft = endTime - now;
      if (timeLeft < 0) {
        clearInterval(countdownTimer);
        displayMessage("Time's up!");
        localStorage.removeItem("countdownTarget");
        resetDisplay();
        return;
      }
      updateDisplay(timeLeft);
    }, 1000);
  }

  function displayMessage(message) {
    timerDisplay.textContent = message;
  }

  startBtn.addEventListener("click", () => {
    const targetDateValue = document.getElementById("target-date").value;
    if (targetDateValue) {
      const targetDate = new Date(targetDateValue);
      const now = new Date();
      if (targetDate > now) {
        const duration = targetDate - now;
        localStorage.setItem("countdownTarget", targetDate.toString());
        startCountdown(duration);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;
        cancelBtn.disabled = false;
      } else {
        alert("Please enter a future date");
      }
    } else {
      alert("Please enter a date and time");
    }
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(countdownTimer);
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
  });

  resumeBtn.addEventListener("click", () => {
    const duration = endTime - Date.now();
    startCountdown(duration, true);
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  });

  cancelBtn.addEventListener("click", () => {
    clearInterval(countdownTimer);
    resetDisplay();
    localStorage.removeItem("countdownTarget");
  });

  // Initialize the countdown if there is a saved target date
  const savedTargetDate = localStorage.getItem("countdownTarget");
  if (savedTargetDate) {
    const savedTargetDateObj = new Date(savedTargetDate);
    const now = new Date();
    if (savedTargetDateObj > now) {
      const duration = savedTargetDateObj - now;
      startCountdown(duration);
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      resumeBtn.disabled = true;
      cancelBtn.disabled = false;
    } else {
      localStorage.removeItem("countdownTarget");
      resetDisplay();
    }
  } else {
    resetDisplay();
  }
});
