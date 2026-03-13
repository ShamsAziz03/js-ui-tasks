const elements = {
  userInputDuration: document.getElementById("duration"),
  elapsedNumberElement: document.getElementById("elapsedNumber"),
  elapsedBar: document.getElementById("elapsedTime"),
  elapsedTime: 0,
  timeOutId: 0,
  newTimeOut: 1,
};

function count() {
  const inputDuration = Number(elements.userInputDuration.value);
  if (elements.elapsedTime >= inputDuration) {
    clearTimeout(elements.timeOutId);
    elements.newTimeOut = 1;
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
  //edge case when user change value to lower
  if (elements.elapsedTime >= Number(elements.userInputDuration.value)) {
    clearTimeout(elements.timeOutId);
    elements.newTimeOut = 1;
    elements.elapsedTime = 0;
    elements.elapsedBar.value = "0";
    elements.elapsedNumberElement.innerText = "0s";
  }
  if (elements.newTimeOut === 1) {
    elements.newTimeOut = 0;
    count();
  }
}

function resetButton() {
  clearTimeout(elements.timeOutId);
  elements.newTimeOut = 1;
  elements.elapsedTime = 0;
  elements.elapsedBar.value = "0";
  elements.elapsedNumberElement.innerText = "0s";
  elements.elapsedBar.max = "100";
  elements.userInputDuration.value = "0";
}
