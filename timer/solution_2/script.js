const elements = {
  userInputDuration: document.getElementById("duration"),
  elapsedNumberElement: document.getElementById("elapsedNumber"),
  elapsedBar: document.getElementById("elapsedTime"),
  elapsedTime: 0,
  timeOutId: 0,
  isTimerRunning: false,
  inputDurationNmber: 0,
};

function count() {
  if (elements.elapsedTime >= elements.inputDurationNumber) {
    clearTimeout(elements.timeOutId);
    elements.isTimerRunning = false;
    return;
  } else {
    elements.elapsedTime++;
    elements.elapsedBar.max = elements.userInputDuration.value;
    elements.elapsedBar.value = elements.elapsedTime;
    elements.elapsedNumberElement.innerText = elements.elapsedTime + "s";
    elements.timeOutId = setTimeout(count, 1000);
  }
}

function changeTimeDuration() {
  elements.inputDurationNumber = Number(elements.userInputDuration.value);
  //edge case when user change value to lower
  if (elements.elapsedTime >= elements.inputDurationNumber) {
    clearTimeout(elements.timeOutId);
    elements.isTimerRunning = false;
    elements.elapsedTime = 0;
    elements.elapsedBar.value = "0";
    elements.elapsedNumberElement.innerText = "0s";
  }
  if (!elements.isTimerRunning) {
    elements.isTimerRunning = true;
    count();
  }
}

function resetButton() {
  clearTimeout(elements.timeOutId);
  elements.isTimerRunning = false;
  elements.elapsedTime = 0;
  elements.elapsedBar.value = "0";
  elements.elapsedNumberElement.innerText = "0s";
  elements.elapsedBar.max = "100";
  elements.userInputDuration.value = "0";
}
