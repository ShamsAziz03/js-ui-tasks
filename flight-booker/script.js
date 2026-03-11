const elements = {
  returnDate: {
    input: document.getElementById("returnDate"),
    getIsoFormat: () => {
      let returnDate = elements.returnDate.input.value;
      let dateParts = returnDate.split(".");
      if (dateParts.length !== 3) return null;
      if (
        (dateParts[0].length !== 2 || dateParts[1].length !== 2) ||
        dateParts[2].length !== 4
      )
        return null;
      let isoDate = [...dateParts].reverse().join("-");
      const returnISODate = new Date(isoDate);
      if (isNaN(returnISODate.getTime())) {
        return null;
      } else {
        return returnISODate;
      }
    },
    errorInput: () => {
      elements.returnDate.input.style.backgroundColor = "red";
    },
    correctInput: () => {
      elements.returnDate.input.style.backgroundColor = "white";
    },
  },

  departureDate: {
    input: document.getElementById("departureDate"),
    getIsoFormat: () => {
      let departureDate = elements.departureDate.input.value;
      let dateParts = departureDate.split(".");
      if (dateParts.length !== 3) return null;
      if (
        (dateParts[0].length !== 2 || dateParts[1].length !== 2) ||
        dateParts[2].length !== 4
      )
        return null;
      let isoDate = [...dateParts].reverse().join("-");
      const departureISODate = new Date(isoDate);
      if (isNaN(departureISODate.getTime())) {
        return null;
      } else {
        return departureISODate;
      }
    },
    errorInput: () => {
      elements.departureDate.input.style.backgroundColor = "red";
    },
    correctInput: () => {
      elements.departureDate.input.style.backgroundColor = "white";
    },
  },

  button: {
    disableButton: () => {
      document.getElementById("sumbitButton").disabled = true;
      document.getElementById("sumbitButton").style.color = "gray";
    },

    enableButton: () => {
      document.getElementById("sumbitButton").disabled = false;
      document.getElementById("sumbitButton").style.color = "white";
    },
  },

  tripType: document.getElementById("tripType"),
};

//functions

function switchReturnDateStatus() {
  if (elements.tripType.value === "return") {
    elements.returnDate.input.disabled = false;
  } else {
    elements.returnDate.input.disabled = true;
    elements.button.enableButton();
    elements.returnDate.input.value = "";
  }
}

function validateReturnDate() {
  const returnResult = elements.returnDate.getIsoFormat();
  if (returnResult === null) {
    elements.returnDate.errorInput();
    elements.button.disableButton();
  } else {
    elements.returnDate.correctInput();
    elements.button.enableButton();
    updateSubmitButtonState();
  }
}

function validateDepartureDate() {
  const departureResult = elements.departureDate.getIsoFormat();
  if (departureResult === null) {
    elements.departureDate.errorInput();
    elements.button.disableButton();
  } else {
    elements.departureDate.correctInput();
    elements.button.enableButton();
  }
}

function updateSubmitButtonState() {
  if (elements.tripType.value === "return") {
    const isoReturnDate = elements.returnDate.getIsoFormat();
    const isoDepartureDate = elements.departureDate.getIsoFormat();
    if (isoDepartureDate > isoReturnDate) {
      elements.button.disableButton();
    } else {
      elements.button.enableButton();
    }
  }
}

function handleBookButton() {
  if (elements.tripType.value === "one-way") {
    alert(
      `You have booked a ${elements.tripType.value} flight on ${elements.departureDate.input.value}.`,
    );
  } else {
    alert(
      `You have booked a ${elements.tripType.value} flight on ${elements.departureDate.input.value} and returned at ${elements.returnDate.input.value}.`,
    );
  }
}

//use reg expr to validate
//remove duplicate in code using functions or objects like:
//-const elements={returnDateInput: doc.get(""),};
//and this is for global var to remove them:
// -const elements = {
//   returnDateInput: {
//     element: document.getElementbyId("returnDate"),
//     getIsoFormat: () => {},
//   },
// };
