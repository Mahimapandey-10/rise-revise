// ----------------------
// 1. Pomodoro Timer
// ----------------------
let timer;
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;

const countdownEl = document.querySelector('.countdown');
const startBtn = document.getElementById('startBtn');

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startBtn.textContent = "Pause Timer";
    countdownEl.classList.add('running');

    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alert("Time's up! Great job 🎉");
        resetTimer();
      }
    }, 1000);
  } else {
    pauseTimer();
  }
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
  startBtn.textContent = "Resume Timer";
  countdownEl.classList.remove('running');
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateDisplay();
  startBtn.textContent = "Start Timer";
  countdownEl.classList.remove('running');
}

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  countdownEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ----------------------
// 2. Toggle Background Music
// ----------------------
function toggleMusic() {
  const music = document.getElementById('bg-music');
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// ----------------------
// 3. Typing Animation for Welcome Text
// ----------------------
const welcomeText = document.querySelector('.welcome');
const fullText = welcomeText.textContent;
welcomeText.textContent = "";

let index = 0;
function typeEffect() {
  if (index < fullText.length) {
    welcomeText.textContent += fullText.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
window.addEventListener('load', typeEffect);

// ----------------------
// 4. Add Reset Button (Optional)
// ----------------------
const resetButton = document.createElement('button');
resetButton.textContent = "Reset Timer";
resetButton.className = "stars";
resetButton.style.marginLeft = "10px";
resetButton.onclick = resetTimer;
startBtn.insertAdjacentElement('afterend', resetButton);
