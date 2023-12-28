// ****** SELECT ITEMS **********

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);

// clear item
clearBtn.addEventListener("click", clearItems);

// delete item
deleteBtn.addEventListener("click", deleteItem);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value !== "" && editFlag === false) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML =
      '<p class="title">' +
      value +
      "</p>" +
      '<div class="btn-container"><button type="button" class="edit-btn">' +
      '<i class="fas fa-edit"></i></button>' +
      '<button type="button" class="delete-btn"><i class="fas fa-trash"></i>' +
      "</button></div>";

    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item add to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag === true) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // edit local storage
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter value", "danger");
  }
}

// diplay alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add("alert-" + action);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove("alert-" + action);
  }, 2000);
}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// clear items

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
}

// delete item
function deleteItem(e) {
  // selecting grocery-item
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item deleted", "danger");
  setBackToDefault();
  removeFromLocalStorage(id);
}

// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}
// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value) {
  const grocery = { id: id, value: value };
  let items = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {}

// edit local storage function

function editLocalStorage(id, value) {}

/*methodes we need to learn to work with localstorage
1- localStorage API
2- setItem
3- getItem
4- removeItem
the variables will be saved as STRINGS */

// ****** SETUP ITEMS **********
