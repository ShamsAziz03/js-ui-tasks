const elements = {
  userInputDuration: document.getElementById("duration"),
  elapsedNumber: document.getElementById("elapsedNumber"),
  elapsedBar: document.getElementById("myBar"),
  isIntervalRunning: false,
  elapsedWidth: 0,
  intervalId: 0,
  inputDurationNumber: 0,
};

function frame() {
  if (elements.elapsedWidth >= elements.inputDurationNumber) {
    clearInterval(elements.intervalId);
    elements.isIntervalRunning = false;
  } else {
    elements.elapsedWidth++;
    elements.elapsedBar.style.width =
      (elements.elapsedWidth / elements.inputDurationNumber) * 100 + "%";
    elements.elapsedNumber.innerText = elements.elapsedWidth + "s";
  }
}

function move() {
  if (!elements.isIntervalRunning) {
    elements.isIntervalRunning = true;
    elements.intervalId = setInterval(frame, 1000);
  }
}

function changeTimeDuration() {
  elements.inputDurationNumber = Number(elements.userInputDuration.value);
  if (elements.elapsedWidth >= elements.inputDurationNumber) {
    clearInterval(elements.intervalId);
    elements.isIntervalRunning = false;
    elements.elapsedWidth = 0;
    elements.elapsedNumber.innerText = "0s";
    elements.elapsedBar.style.width = "0%";
  }
  move();
}

function resetButton() {
  clearInterval(elements.intervalId);
  elements.isIntervalRunning = false;
  elements.elapsedWidth = 0;
  elements.userInputDuration.value = "0";
  elements.elapsedNumber.innerText = "0s";
  elements.elapsedBar.style.width = "0%";
}
