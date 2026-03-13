const elements = {
  userInputDuration: document.getElementById("duration"),
  elapsedNumber: document.getElementById("elapsedNumber"),
  elapsedBar: document.getElementById("myBar"),
  flagStartInterval: 0,
  elapsedWidth: 0,
  intervalFunction: () => {},
};

function move() {
  if (elements.flagStartInterval == 0) {
    elements.flagStartInterval = 1;
    intervalFunction = setInterval(frame, 1000);
    function frame() {
      if (elements.elapsedWidth >= Number(elements.userInputDuration.value)) {
        clearInterval(intervalFunction);
        elements.flagStartInterval = 0;
      } else {
        elements.elapsedWidth++;
        elements.elapsedBar.style.width =
          (elements.elapsedWidth / Number(elements.userInputDuration.value)) *
            100 +
          "%";
        elements.elapsedNumber.innerText = elements.elapsedWidth + "s";
      }
    }
  }
}

function changeTimeDuration() {
  if (elements.elapsedWidth >= Number(elements.userInputDuration.value)) {
    clearInterval(intervalFunction);
    elements.flagStartInterval = 0;
    elements.elapsedWidth = 0;
    elements.elapsedNumber.innerText = "0s";
    elements.elapsedBar.style.width = "0%";
  }
  move();
}

function resetButton() {
  clearInterval(intervalFunction);
  elements.flagStartInterval = 0;
  elements.elapsedWidth = 0;
  elements.userInputDuration.value = "0";
  elements.elapsedNumber.innerText = "0s";
  elements.elapsedBar.style.width = "0%";
}
