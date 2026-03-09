function celsiusCelsiusToFahrenheit() {
  let celsiusValue = document.getElementById("celsiusTmp").value;
  let celsiusNum = Number(celsiusValue);
  if (celsiusNum) {
    document.getElementById("fahrenheitTmp").value = celsiusNum * (9 / 5) + 32;
  } else {
    document.getElementById("fahrenheitTmp").value = "";
  }
}

function celsiusFahrenheitToCelsius() {
  let fahrenheitValue = document.getElementById("fahrenheitTmp").value;
  let fahrenheitNum = Number(fahrenheitValue);
  if (fahrenheitNum) {
    document.getElementById("celsiusTmp").value =
      (fahrenheitNum - 32) * (5 / 9);
  } else {
    document.getElementById("celsiusTmp").value = "";
  }
}
