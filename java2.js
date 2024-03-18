// Get the elements
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let timer; 
let running = false; 
let startTime; 
let elapsedTime = 0; 

// Function to format time 
function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Function to update the stopwatch display
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

// Function to start the stopwatch
function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      updateDisplay();
    }, 1000);
    running = true;
    startBtn.textContent = 'Pause';
  } else {
    clearInterval(timer);
    running = false;
    startBtn.textContent = 'Resume';
  }
}

// Function to pause the stopwatch
function pauseStopwatch() {
  clearInterval(timer);
  running = false;
  startBtn.textContent = 'Resume';
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  startBtn.textContent = 'Start';
  lapsList.innerHTML = ''; // Clear lap times
}

// Function to record lap time
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
