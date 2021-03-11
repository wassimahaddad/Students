// --------------------------------------------------------------------
const tableArea = document.querySelector(".table-area");
const table = document.createElement("table");
// --------------------------------------------------------------------
function createTable() {
  const titles = document.createElement("tr");
  tableArea.appendChild(table);
  table.appendChild(titles);

  const idTitle = document.createElement("th");
  const fNameTitle = document.createElement("th");
  const lNameTitle = document.createElement("th");
  const capsTitle = document.createElement("th");
  const ageTitle = document.createElement("th");
  const cityTitle = document.createElement("th");
  const genderTitle = document.createElement("th");
  const hobbyTitle = document.createElement("th");
  const button1 = document.createElement("th");
  const button2 = document.createElement("th");

  createTitleRow(idTitle, "ID", titles);
  createTitleRow(fNameTitle, "First Name", titles);
  createTitleRow(lNameTitle, "Last Name", titles);
  createTitleRow(capsTitle, "Capsule No.", titles);
  createTitleRow(ageTitle, "Age", titles);
  createTitleRow(cityTitle, "City", titles);
  createTitleRow(genderTitle, "Gender", titles);
  createTitleRow(hobbyTitle, "Hobby", titles);
  createTitleRow(button1, "", titles);
  createTitleRow(button2, "", titles);
}
// --------------------------------------------------------------------
function createTitleRow(el, text, parent) {
  el.textContent = text;
  parent.appendChild(el);
}
// --------------------------------------------------------------------
function createStudentRows() {
  for (let i = 0; i < allStudents.length; i++) {
    // decalre
    const studentRow = document.createElement("tr");
    const studentId = document.createElement("td");
    const studentfName = document.createElement("td");
    const studentlName = document.createElement("td");
    const studentCapsule = document.createElement("td");
    const studentAge = document.createElement("td");
    const studentCity = document.createElement("td");
    const studentGender = document.createElement("td");
    const studentHobby = document.createElement("td");
    const buttons = document.createElement("td");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    // Id,class, data
    studentRow.id = `student${allStudents[i].id}`;
    // assign
    studentId.textContent = allStudents[i].id;
    studentfName.textContent = allStudents[i].firstName;
    studentlName.textContent = allStudents[i].lastName;
    studentCapsule.textContent = allStudents[i].capsule;
    studentAge.textContent = allStudents[i].age;
    studentCity.textContent = allStudents[i].city;
    studentGender.textContent = allStudents[i].gender;
    studentHobby.textContent = allStudents[i].hobby;
    editBtn.textContent = "Edit";
    delBtn.textContent = "Delete";
    // append
    table.appendChild(studentRow);
    studentRow.appendChild(studentId);
    studentRow.appendChild(studentfName);
    studentRow.appendChild(studentlName);
    studentRow.appendChild(studentCapsule);
    studentRow.appendChild(studentAge);
    studentRow.appendChild(studentCity);
    studentRow.appendChild(studentGender);
    studentRow.appendChild(studentHobby);
    studentRow.appendChild(buttons);
    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);
    // event listeners
    editBtn.addEventListener("click", editRow);
    delBtn.addEventListener("click", deleteRow);
  }
}

// --------------------------------------------------------------------
function editRow(event) {
  console.log(event.target);
  console.log("row=", event.target.parentElement.parentElement);
  editFields(event);
  replaceButtons(event);
}
// --------------------------------------------------------------------
function replaceButtons(event) {
  const editBtn = event.target;
  const delBtn = event.target.nextSibling;
  editBtn.textContent = "Cancel";
  delBtn.textContent = "Apply";
  editBtn.removeEventListener("click", editRow);
  delBtn.removeEventListener("click", deleteRow);
  editBtn.addEventListener("click", cancelEdit);
  delBtn.addEventListener("click", applyEdit);
}
// --------------------------------------------------------------------
function deleteRow(event) {
  const id = event.target.parentElement.parentElement.id.replace("student", "");
  const index = allStudents.findIndex((obj) => obj.id === parseInt(id));
  allStudents.splice(index, 1);
  table.innerHTML = "";
  createTable();
  createStudentRows();
}

// --------------------------------------------------------------------
function editFields(event) {
  const els = event.target.parentElement.parentElement.children;
  for (let i = 1; i < els.length - 1; i++) {
    const el = els[i];
    const field = el.textContent;
    const fieldInput = document.createElement("input");
    fieldInput.value = field;
    el.textContent = "";
    el.appendChild(fieldInput);
  }
}

// --------------------------------------------------------------------
function cancelEdit(event) {
  console.log(event.target);
  const els = event.target.parentElement.parentElement.children;
  console.log(els);
  for (let i = 1; i < els.length - 1; i++) {
    const input = els[i].firstChild;
    console.log(input);
    const inputValue = els[i].firstChild.value;
    input.remove();
    els[i].textContent = inputValue;
  }
  const editBtn = event.target;
  const delBtn = event.target.nextSibling;
  editBtn.textContent = "Edit";
  delBtn.textContent = "Delete";
  editBtn.removeEventListener("click", cancelEdit);
  delBtn.removeEventListener("click", applyEdit);
  editBtn.addEventListener("click", editRow);
  delBtn.addEventListener("click", deleteRow);
}

// --------------------------------------------------------------------

// --------------------------------------------------------------------
function applyEdit(event) {
  const id = event.target.parentElement.parentElement.id.replace("student", "");
  const els = event.target.parentElement.parentElement.children;
  const index = allStudents.findIndex((obj) => obj.id === parseInt(id));
  allStudents[index].firstName = els[1].firstChild.value;
  allStudents[index].lastName = els[2].firstChild.value;
  allStudents[index].capsule = els[3].firstChild.value;
  allStudents[index].age = els[4].firstChild.value;
  allStudents[index].city = els[5].firstChild.value;
  allStudents[index].gender = els[6].firstChild.value;
  allStudents[index].hobby = els[7].firstChild.value;
  console.log(allStudents[index]);
}

// --------------------------------------------------------------------

createTable();
createStudentRows();
