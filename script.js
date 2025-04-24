let timer;
let isRunning = false;
let hours = 0;
let minutes = 25;
let seconds = 0;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");
const setTimeButton = document.getElementById("set-time");
const water = document.getElementById("water");
const alarmSound = document.getElementById("alarm-sound"); // Alarm sound element

function updateDisplay() {
  hoursDisplay.textContent = String(hours).padStart(2, "0");
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let elapsedSeconds = 0;

  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          clearInterval(timer);
          alarmSound.play(); // Play the alarm sound
          alert("Time's up!"); // Notify the user
          isRunning = false;
          return;
        } else {
          hours--;
          minutes = 59;
          seconds = 59;
        }
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    elapsedSeconds++;
    const percentage = ((elapsedSeconds / totalSeconds) * 100).toFixed(2);
    water.style.height = `${percentage}%`; // Adjust water height dynamically
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  hours = 0;
  minutes = 25;
  seconds = 0;
  water.style.height = "0%"; // Reset water height
  updateDisplay();
}

function setCustomTime() {
  const inputHours = parseInt(hoursInput.value, 10);
  const inputMinutes = parseInt(minutesInput.value, 10);
  const inputSeconds = parseInt(secondsInput.value, 10);

  if (
    (!isNaN(inputHours) && inputHours >= 0) ||
    (!isNaN(inputMinutes) && inputMinutes >= 0) ||
    (!isNaN(inputSeconds) && inputSeconds >= 0)
  ) {
    hours = inputHours || 0;
    minutes = inputMinutes || 0;
    seconds = inputSeconds || 0;
    water.style.height = "0%"; // Reset water height
    updateDisplay();
  } else {
    alert("Please enter valid numbers for hours, minutes, and seconds.");
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
setTimeButton.addEventListener("click", setCustomTime);

updateDisplay();