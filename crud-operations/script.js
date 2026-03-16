const elements = {
  names: [
    "Ahmad Ali",
    "Sami Sami",
    "Omar Khalid",
    "Hassan Noor",
    "Bilal Ahmed",
    "Yusuf Karim",
    "Tariq Zain",
    "Nadia Rahman",
    "Layla Hasan",
    "Fatima Zahra",
    "Aisha Malik",
    "Sara Jamil",
    "Mariam Ali",
    "Huda Sami",
    "Zara Khalid",
  ],
  namesElement: document.getElementById("namesList"),
  userName: document.getElementById("name"),
  userSurname: document.getElementById("surName"),
  updateButton: document.getElementById("updateButton"),
  deleteButton: document.getElementById("deleteButton"),
  filterPrefix: document.getElementById("filterPrefix"),
  elementId: 0,
  selectedOption: null,
};

function fillInputs(elementId) {
  const selectedUserName = document
    .getElementById(`${elementId}`)
    .value.split(" ");
  elements.userName.value = selectedUserName[0];
  elements.userSurname.value = selectedUserName[1];

  elements.selectedOption = document.getElementById(`${elementId}`);
  elements.updateButton.disabled = false;
  elements.deleteButton.disabled = false;
}

function renderNames(names) {
  let innerHtml = ``;
  elements.elementId = 0;
  for (const k of names) {
    innerHtml += `<option id="${elements.elementId}" value="${k}" onclick='fillInputs(${elements.elementId})'>${k}</option>`;
    elements.elementId++;
  }
  elements.namesElement.innerHTML = innerHtml;
}

function checkFullInput(name, surname) {
  if (name === "" || surname === "") return false;
  return true;
}

function checkNameExist(name) {
  return elements.names.some(
    (item) => item.toLowerCase() === name.toLowerCase(),
  );
}

function clearInputs() {
  elements.userName.value = "";
  elements.userSurname.value = "";
  elements.updateButton.disabled = true;
  elements.deleteButton.disabled = true;
}

function addName() {
  //to check that user enter values
  if (!checkFullInput(elements.userName.value, elements.userSurname.value)) {
    alert("fill name and surname");
    return;
  }
  const fullName = elements.userName.value + " " + elements.userSurname.value;
  //to check that name does not exist
  if (checkNameExist(fullName)) {
    alert("name exits!");
    return;
  }

  elements.names.push(fullName);
  elements.namesElement.innerHTML += `<option id="${elements.elementId}" value="${fullName}" onclick='fillInputs(${elements.elementId})'>${fullName}</option>`;
  elements.elementId++;
  alert("Name added Successfully");
  clearInputs();
}

function deleteName() {
  if (!checkFullInput(elements.userName.value, elements.userSurname.value)) {
    alert("Fill All input Please!");
    return;
  }

  elements.names = elements.names.filter(
    (name) => name !== elements.selectedOption.value,
  );
  renderNames(elements.names);
  alert("Name deleted Successfully");
  clearInputs();
}

function updateName() {
  if (!checkFullInput(elements.userName.value, elements.userSurname.value)) {
    alert("Fill All input Please!");
    return;
  }
  const fullName = elements.userName.value + " " + elements.userSurname.value;

  if (elements.selectedOption === null) {
    alert("Select name to update!");
    return;
  }

  const indexOfName = elements.names.indexOf(elements.selectedOption.value);
  if (indexOfName === -1) {
    alert("Name not exist to update!");
    return;
  }
  elements.names[indexOfName] = fullName;

  //now change the UI for user
  elements.selectedOption.value = fullName;
  elements.selectedOption.text = fullName;
  //or using render names instead of change value and text
  // renderNames(elements.names);
  alert("Name updated successfully");
  clearInputs();
}

function search() {
  // the text feild is emplty
  if (filterPrefix.value === "") {
    renderNames(elements.names);
    return;
  }
  const filteredNames = elements.names.filter((name) =>
    //if user want chars in general in surname not on start of surname
    // name.split(" ")[1].toLowerCase().includes(filterPrefix.value.trim().toLowerCase()),
    //if prefix only in start of surname
    name
      .split(" ")[1]
      .toLowerCase()
      .startsWith(filterPrefix.value.trim().toLowerCase()),
  );
  renderNames(filteredNames);
}

renderNames(elements.names);
