//obj of two types of tmp
const element = {
  celsuis: {
    userInput: document.getElementById("celsiusTmp"),
    toCelsuisConvert: function (num) {
      //must use SRP
      return num * (9 / 5) + 32;
    },
  },
  fahrenheit: {
    userInput: document.getElementById("fahrenheitTmp"),
    toFahrenheitConvert: function (num) {
      //must use SRP
      return (num - 32) * (5 / 9);
    },
  },
};

function celsiusCelsiusToFahrenheit() {
  let celsiusNum = Number(element.celsuis.userInput.value);
  if (
    celsiusNum ||
    (celsiusNum === 0 && element.celsuis.userInput.value != "")
  ) {
    // || is to cover 0 case
    element.fahrenheit.userInput.value =
      element.celsuis.toCelsuisConvert(celsiusNum);
  } else {
    element.fahrenheit.userInput.value = "";
  }
}

function celsiusFahrenheitToCelsius() {
  let fahrenheitNum = Number(element.fahrenheit.userInput.value);
  if (
    fahrenheitNum ||
    (fahrenheitNum === 0 && element.fahrenheit.userInput.value != "")
  ) {
    // || is to cover 0 case
    element.celsuis.userInput.value =
      element.fahrenheit.toFahrenheitConvert(fahrenheitNum);
  } else {
    element.celsuis.userInput.value = "";
  }
}

//must add all edge cases in testing like neg- and pos+ numbers, decimals ...etc
function testing() {
  //Arrange - input, output (ready state)
  // Act - calc
  // Assert

  const input = 0;
  const expectedOutput = 32;

  const result = celsuisCalc(input);
  // console.assert(result === expectedOutput);
  if (result !== expectedOutput) {
    throw Error("error");
  }
  //unit test, check and read other types
}

// testing(); // to call
