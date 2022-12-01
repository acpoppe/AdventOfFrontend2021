let startingMins = 25;
let startingSecs = 00;

let minutes = startingMins;
let seconds = startingSecs;

let running = false;
let interval;

function tick() {
  if (running) {
    if (minutes === 0 && seconds === 0) {
      running = false;
      postMessage("done");
      clearInterval(interval);
      return;
    }
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    postMessage({ minutes, seconds });
  }
}

self.addEventListener("message", (e) => {
  if (e.data === "start") {
    running = true;
    interval = setInterval(tick, 1000);
  } else if (e.data === "stop") {
    running = false;
    clearInterval(interval);
  } else if (e.data === "getCurrent") {
    postMessage({ minutes, seconds });
  } else if (e.data === "restart") {
    minutes = startingMins;
    seconds = startingSecs;
  } else {
    startingMins = e.data.minutes;
    startingSecs = e.data.seconds;
    minutes = startingMins;
    seconds = startingSecs;
  }
});
