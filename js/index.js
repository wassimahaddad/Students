// --------------------------------------------------------------------
const tableArea = document.querySelector(".table-area");
const table = document.createElement("table");
// --------------------------------------------------------------------
function createTitleRow(el, text, parent) {
  el.textContent = text;
  parent.appendChild(el);
}
// --------------------------------------------------------------------
function createTable() {
  // declare
  const titles = document.createElement("tr");
  const idTitle = document.createElement("th");
  const fNameTitle = document.createElement("th");
  const lNameTitle = document.createElement("th");
  const capsTitle = document.createElement("th");
  const ageTitle = document.createElement("th");
  const cityTitle = document.createElement("th");
  const genderTitle = document.createElement("th");
  const hobbyTitle = document.createElement("th");
  const buttons = document.createElement("th");
  // classes
  titles.classList.add("titles");
  idTitle.id = "id-title";
  //   append
  tableArea.appendChild(table);
  table.appendChild(titles);
  //   call
  createTitleRow(idTitle, "ID", titles);
  createTitleRow(fNameTitle, "First Name", titles);
  createTitleRow(lNameTitle, "Last Name", titles);
  createTitleRow(capsTitle, "Capsule", titles);
  createTitleRow(ageTitle, "Age", titles);
  createTitleRow(cityTitle, "City", titles);
  createTitleRow(genderTitle, "Gender", titles);
  createTitleRow(hobbyTitle, "Hobby", titles);
  createTitleRow(buttons, "", titles);
}

// --------------------------------------------------------------------
function createStudentRows(arr) {
  table.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
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
    studentRow.id = `student${arr[i].id}`;
    studentId.classList.add("student-ids");
    // studentId.classList.add("numbers");
    // studentCapsule.classList.add("numbers-long");
    // studentAge.classList.add("numbers");
    // studentGender.classList.add("gender");
    // studentfName.classList.add("first-last");
    // studentlName.classList.add("first-last");
    // buttons.classList.add("row-buttons");
    // assign
    studentId.textContent = arr[i].id;
    studentfName.textContent = arr[i].firstName;
    studentlName.textContent = arr[i].lastName;
    studentCapsule.textContent = arr[i].capsule;
    studentAge.textContent = arr[i].age;
    studentCity.textContent = arr[i].city;
    studentGender.textContent = arr[i].gender;
    studentHobby.textContent = arr[i].hobby;
    // classed,id,attr
    editBtn.id = `left-button${arr[i].id}`;
    editBtn.classList.add("edit-button");
    delBtn.id = `right-button${arr[i].id}`;
    delBtn.classList.add("del-button");
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
    fieldInput.classList.add("edit-inputs");
    el.textContent = "";
    el.appendChild(fieldInput);
  }
}
// --------------------------------------------------------------------
function flipButtons(event) {
  const editBtn = event.target;
  const delBtn = event.target.nextSibling;
  editBtn.classList.remove("edit-button");
  editBtn.classList.add("cancel-button");
  delBtn.classList.remove("del-button");
  delBtn.classList.add("ok-button");
  editBtn.removeEventListener("click", editRow);
  delBtn.removeEventListener("click", deleteRow);
  editBtn.addEventListener("click", cancelEdit);
  delBtn.addEventListener("click", applyEdit);
  document.activeElement.blur();
}

// --------------------------------------------------------------------
function editRow(event) {
  console.log(event.target);
  console.log("row=", event.target.parentElement.parentElement);
  editFields(event);
  flipButtons(event);
}
// --------------------------------------------------------------------
function flipButtonsBack(button1, button2) {
  button1.classList.remove("cancel-button");
  button1.classList.add("edit-button");
  button2.classList.remove("ok-button");
  button2.classList.add("del-button");
  button1.removeEventListener("click", cancelEdit);
  button2.removeEventListener("click", applyEdit);
  button1.addEventListener("click", editRow);
  button2.addEventListener("click", deleteRow);
  document.activeElement.blur();
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
  flipButtonsBack(editBtn, delBtn);
}

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
  for (let i = 1; i < els.length - 1; i++) {
    const input = els[i].firstChild;
    const inputValue = els[i].firstChild.value;
    input.remove();
    els[i].textContent = inputValue;
  }
  console.log(allStudents[index]);
  const editBtn = event.target.previousSibling;
  const delBtn = event.target;
  flipButtonsBack(editBtn, delBtn);
}

// --------------------------------------------------------------------

const searchField = document.querySelector("#search-field");
searchField.addEventListener("input", searchText);
const searchTitle = document.querySelector("#dropdown");
searchTitle.addEventListener("change", searchIn);
let searchedTitle = "Search by";
function searchIn(event) {
  const title = event.target.value;
  console.log(title);
  searchedTitle = title;
}

function searchText(event) {
  const cat = searchTitle.children;
  let text = event.target.value;
  let searchArr = [];
  let temp;
  if (searchedTitle === cat[0].textContent) {
    searchArr = allStudents;
  }
  for (let i = 1; i < cat.length; i++) {
    if (searchedTitle === cat[i].textContent) {
      for (let j = 0; j < allStudents.length; j++) {
        temp = Object.values(allStudents[j])[i];
        if (typeof temp === "string") {
          temp = temp.toLowerCase();
          text = text.toLowerCase();
          console.log(text);
        }
        if (typeof temp === "number") {
          temp = temp.toString();
        }
        if (temp.includes(text)) {
          searchArr.push(allStudents[j]);
        }
      }
    }
  }
  createStudentRows(searchArr);
}

createTable();
createStudentRows(allStudents);
