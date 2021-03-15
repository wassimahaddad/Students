const students_API = "https://apple-seeds.herokuapp.com/api/users/";
// --------------------------------------------------------------------
const tableArea = document.querySelector(".table-area");
const table = document.createElement("table");
table.classList.add("students-table");
tableArea.appendChild(table);
// --------------------------------------------------------------------
function createStudentRows(arr) {
  for (let i = 0; i < arr.length; i++) {
    const studentRow = document.createElement("tr");
    const buttons = document.createElement("td");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const values = Object.values(arr[i]);
    for (let j = 0; j < values.length; j++) {
      const el = document.createElement("td");
      el.textContent = values[j];
      studentRow.appendChild(el);
    }
    //class,ids,
    studentRow.id = `student${arr[i].id}`;
    editBtn.id = `left-button${arr[i].id}`;
    editBtn.classList.add("edit-button");
    delBtn.id = `right-button${arr[i].id}`;
    delBtn.classList.add("del-button");
    // append
    table.appendChild(studentRow);
    studentRow.appendChild(buttons);
    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);
    // event listeners
    editBtn.addEventListener("click", editRow);
    delBtn.addEventListener("click", deleteRow);
  }
}
// --------------------------------------------------------------------
async function getStudentData() {
  const allStudents = [];
  const result = await fetch(students_API);
  const parsed = await result.json();
  for (let i = 0; i < parsed.length; i++) {
    allStudents.push(parsed[i]);
  }

  for (let i = 0; i < allStudents.length; i++) {
    const result = await fetch(`${students_API}/${i}`);
    const parsed = await result.json();
    allStudents[i].age = parsed.age;
    allStudents[i].city = parsed.city;
    allStudents[i].gender = parsed.gender;
    allStudents[i].hobby = parsed.hobby;
  }
  console.log(allStudents);
  localStorage.setItem("data", JSON.stringify(allStudents));
  document.querySelector(".page-loader").classList.add("hidden"); //remove spinner
  createStudentRows(allStudents);
}
// --------------------------------------------------------------------
function deleteRow(event) {
  const id = event.target.parentElement.parentElement.id.replace("student", "");
  const index = JSON.parse(localStorage.getItem("data")).findIndex(
    (obj) => obj.id === parseInt(id)
  );

  console.log(index);
  let allStudents = JSON.parse(localStorage.getItem("data"));
  allStudents.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(allStudents));
  event.target.parentElement.parentElement.remove();
  // allStudents.splice(index, 1);
}
// --------------------------------------------------------------------
function editFields(event) {
  const els = event.target.parentElement.parentElement.children;
  for (let i = 1; i < els.length - 1; i++) {
    const el = els[i];
    const content = el.textContent;
    const fieldInput = document.createElement("input");
    if (i === 3 || i === 4) {
      fieldInput.type = "number";
    }
    fieldInput.value = content;
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
  const els = event.target.parentElement.parentElement.children;
  for (let i = 1; i < els.length - 1; i++) {
    const input = els[i].firstChild;
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
  const allStudents = JSON.parse(localStorage.getItem("data"));
  const index = allStudents.findIndex((obj) => obj.id === parseInt(id));
  allStudents[index].firstName = els[1].firstChild.value;
  allStudents[index].lastName = els[2].firstChild.value;
  allStudents[index].capsule = els[3].firstChild.value;
  allStudents[index].age = els[4].firstChild.value;
  allStudents[index].city = els[5].firstChild.value;
  allStudents[index].gender = els[6].firstChild.value;
  allStudents[index].hobby = els[7].firstChild.value;
  localStorage.setItem("data", JSON.stringify(allStudents));
  for (let i = 1; i < els.length - 1; i++) {
    const input = els[i].firstChild;
    let inputValue = els[i].firstChild.value;
    input.remove();
    if (i !== 3 || i != 4) {
      inputValue = inputValue.toLowerCase();
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    }
    els[i].textContent = inputValue;
  }
  const editBtn = event.target.previousSibling;
  const delBtn = event.target;
  flipButtonsBack(editBtn, delBtn);
}
// --------------------------------------------------------------------
let searchedTitle = "Search by";
function searchIn(event) {
  const title = event.target.value;
  searchedTitle = title;
}
// --------------------------------------------------------------------
function searchText(event) {
  const allStudents = JSON.parse(localStorage.getItem("data"));
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
        }
        if (typeof temp === "number") {
          temp = temp.toString();
        }
        if (temp.includes(text) && temp.charAt(0) === text.charAt(0)) {
          searchArr.push(allStudents[j]);
        }
      }
    }
  }
  table.innerHTML = "";
  createStudentRows(searchArr);
}
// --------------------------------------------------------------------
if (localStorage.length === 0 || localStorage.data === "[]") {
  getStudentData();
} else {
  document.querySelector(".page-loader").classList.add("hidden"); //remove spinner
  createStudentRows(JSON.parse(localStorage.getItem("data")));
}
const searchField = document.querySelector("#search-field");
searchField.addEventListener("input", searchText);
const searchTitle = document.querySelector("#dropdown");
searchTitle.addEventListener("change", searchIn);
