let startStopBtn = document.getElementById("startStopBtn");
let settingsBtn = document.getElementById("settingsBtn");
let timerBorder = document.getElementsByClassName("timer-completion-border")[0];

let timerStatus = "stopped";
let editingStatus = "not-editing";

let timer = new Worker("scripts/timer.js");
let audio = new Audio("audio/old-alarm-clock.mp3");

let minutesInput = document.getElementById("minutesInput");
let secondsInput = document.getElementById("secondsInput");

timer.postMessage("getCurrent");

audio.onplaying = () => {
  requestAnimationFrame(() => {
    setTimeout(() => window.alert("Timer is done!"), 0);
  });
};

function updateTimerDisplay(minutes, seconds) {
  minutesInput.value = pad(minutes);
  secondsInput.value = pad(seconds);
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

startStopBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (timerStatus === "stopped") {
    timerStatus = "started";
    settingsBtn.style.visibility = "hidden";
    startStopBtn.innerHTML = "stop";
    timer.postMessage("start");
  } else if (timerStatus === "started") {
    timerStatus = "stopped";
    settingsBtn.style.visibility = "visible";
    startStopBtn.innerHTML = "start";
    timer.postMessage("stop");
  } else if (timerStatus === "finished") {
    timerStatus = "started";
    timerBorder.classList.remove("ending");
    settingsBtn.style.visibility = "hidden";
    startStopBtn.innerHTML = "stop";
    timer.postMessage("start");
  } else {
    throw new Error("Invalid timer status");
  }
});

settingsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (editingStatus === "not-editing") {
    editingStatus = "editing";
    minutesInput.removeAttribute("disabled");
    secondsInput.removeAttribute("disabled");
    startStopBtn.style.visibility = "hidden";
  } else if (editingStatus === "editing") {
    editingStatus = "not-editing";
    minutesInput.setAttribute("disabled", "");
    secondsInput.setAttribute("disabled", "");
    startStopBtn.style.visibility = "visible";
    timer.postMessage("getCurrent");
  }
});

timer.addEventListener("message", (e) => {
  if (e.data === "done") {
    timerBorder.classList.add("ending");
    audio.play();
    timerStatus = "finished";
    settingsBtn.style.visibility = "visible";
    startStopBtn.innerHTML = "start";
    timer.postMessage("restart");
    timer.postMessage("getCurrent");
  } else {
    updateTimerDisplay(e.data.minutes, e.data.seconds);
  }
});

minutesInput.addEventListener("change", (e) => {
  e.preventDefault();
  if (
    isNaN(minutesInput.value) ||
    Number(minutesInput.value) < 0 ||
    Number(minutesInput.value) > 59
  ) {
    minutesInput.value = 00;
  }
  if (
    isNaN(secondsInput.value) ||
    Number(secondsInput.value) < 0 ||
    Number(secondsInput.value) > 59
  ) {
    secondsInput.value = 00;
  }
  if (timerBorder.classList.contains("ending")) {
    timerBorder.classList.remove("ending");
  }
  timer.postMessage({
    minutes: Number(minutesInput.value),
    seconds: Number(secondsInput.value),
  });
});

secondsInput.addEventListener("change", (e) => {
  e.preventDefault();
  if (
    isNaN(minutesInput.value) ||
    Number(minutesInput.value) < 0 ||
    Number(minutesInput.value) > 59
  ) {
    minutesInput.value = 00;
  }
  if (
    isNaN(secondsInput.value) ||
    Number(secondsInput.value) < 0 ||
    Number(secondsInput.value) > 59
  ) {
    secondsInput.value = 00;
  }
  if (timerBorder.classList.contains("ending")) {
    timerBorder.classList.remove("ending");
  }
  timer.postMessage({
    minutes: Number(Math.round(minutesInput.value)),
    seconds: Number(Math.round(secondsInput.value)),
  });
});
