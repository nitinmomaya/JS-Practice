const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timerText = document.getElementById("timer");
let timeInterval;
let isTimerStarted = false;
let timer = 0;
start.textContent = "start";
stop.textContent = "stop";
reset.textContent = "reset";
timerText.textContent = "00:00:00";

start.addEventListener("click", () => {
  startTimer();
});

stop.addEventListener("click", () => {
  stopTimer();
});

reset.addEventListener("click", () => {
  resetTimer();
});

const startTimer = () => {
  if (!isTimerStarted) {
    timeInterval = setInterval(() => {
      updateTimer();
    }, 1000);
    isTimerStarted = true;
  }
};

const stopTimer = () => {
  timeInterval = clearInterval(timeInterval);
  isTimerStarted = false;
};

const updateTimer = () => {
  timer++;
  const hour = Math.floor(timer / 3600);
  const min = Math.floor(timer / 60);
  const sec = Math.floor(timer % 60);

  const updatedTime = `${hour < 10 ? `0${hour}` : hour}:${
    min < 10 ? `0${min}` : min
  }:${sec < 10 ? `0${sec}` : sec}`;
  timerText.textContent = updatedTime;
};

const resetTimer = () => {
  timer = 0;

  timerText.textContent = "00:00:00";
  if (isTimerStarted) {
    timeInterval = clearInterval(timeInterval);
  }
  isTimerStarted = false;
};
