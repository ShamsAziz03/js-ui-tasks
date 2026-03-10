function switchReturnDateStatus() {
  let tripType = document.getElementById("tripType").value;
  if (tripType === "return") {
    document.getElementById("returnDate").disabled = false;
  } else {
    document.getElementById("returnDate").disabled = true;
    document.getElementById("sumbitButton").disabled = false;
    document.getElementById("sumbitButton").style.color = "white";
    document.getElementById("returnDate").value = "";
  }
}

let returnDateIsoFormat = "";
let departureDateIsoFormat = "";

function validateReturnDate() {
  let returnDate = document.getElementById("returnDate").value;
  let dateParts = returnDate.split(".");
  if (dateParts.length !== 3) {
    document.getElementById("returnDate").style.backgroundColor = "red";
    document.getElementById("sumbitButton").disabled = true;
    document.getElementById("sumbitButton").style.color = "gray";
    return;
  } else {
    if (
      dateParts[0].length === 2 &&
      dateParts[1].length === 2 &&
      dateParts[2].length === 4
    ) {
      let isoDate = [...dateParts].reverse().join("-");
      const returnISODate = new Date(isoDate);
      if (isNaN(returnISODate.getTime())) {
        document.getElementById("returnDate").style.backgroundColor = "red";
        document.getElementById("sumbitButton").disabled = true;
        document.getElementById("sumbitButton").style.color = "gray";
        return;
      } else {
        document.getElementById("returnDate").style.backgroundColor = "white";
        document.getElementById("sumbitButton").disabled = false;
        document.getElementById("sumbitButton").style.color = "white";
        returnDateIsoFormat = returnISODate;
        updateSubmitButtonState();
      }
    } else {
      document.getElementById("returnDate").style.backgroundColor = "red";
      document.getElementById("sumbitButton").disabled = true;
      document.getElementById("sumbitButton").style.color = "gray";
      return;
    }
  }
}

function validateDepartureDate() {
  let departureDate = document.getElementById("departureDate").value;
  let dateParts = departureDate.split(".");
  if (dateParts.length !== 3) {
    document.getElementById("departureDate").style.backgroundColor = "red";
    document.getElementById("sumbitButton").disabled = true;
    document.getElementById("sumbitButton").style.color = "gray";
    return;
  } else {
    if (
      dateParts[0].length === 2 &&
      dateParts[1].length === 2 &&
      dateParts[2].length === 4
    ) {
      let isoDate = [...dateParts].reverse().join("-");
      const departureISODate = new Date(isoDate);
      if (isNaN(departureISODate.getTime())) {
        document.getElementById("departureDate").style.backgroundColor = "red";
        document.getElementById("sumbitButton").disabled = true;
        document.getElementById("sumbitButton").style.color = "gray";
        return;
      } else {
        document.getElementById("departureDate").style.backgroundColor =
          "white";
        document.getElementById("sumbitButton").disabled = false;
        document.getElementById("sumbitButton").style.color = "white";
        departureDateIsoFormat = departureISODate;
      }
    } else {
      document.getElementById("departureDate").style.backgroundColor = "red";
      document.getElementById("sumbitButton").disabled = true;
      document.getElementById("sumbitButton").style.color = "gray";
      return;
    }
  }
}

function updateSubmitButtonState() {
  if (departureDateIsoFormat === "" || returnDateIsoFormat === "") return;
  let tripType = document.getElementById("tripType").value;
  if (tripType === "return") {
    if (departureDateIsoFormat > returnDateIsoFormat) {
      document.getElementById("sumbitButton").disabled = true;
      document.getElementById("sumbitButton").style.color = "gray";
    } else {
      document.getElementById("sumbitButton").disabled = false;
      document.getElementById("sumbitButton").style.color = "white";
    }
  }
}

function handleBookButton() {
  const tripWay = document.getElementById("tripType").value;
  if (tripWay === "one-way") {
    const departureDate = document.getElementById("departureDate").value;
    alert(`You have booked a ${tripWay} flight on ${departureDate}.`);
  } else {
    const returnDate = document.getElementById("returnDate").value;
    const departureDate = document.getElementById("departureDate").value;
    alert(
      `You have booked a ${tripWay} flight on ${departureDate} and returned at ${returnDate}.`,
    );
  }
}
