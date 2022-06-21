// UI Variables

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// Load event listners

loadEventListeners();

//Load all event listnerrs

function loadEventListeners() {
  // Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear tasks
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li element

    const li = document.createElement("li");

    // class
    li.className = "collection-item";

    // Create textnode(whatever the user types in) and append
    li.appendChild(document.createTextNode(task));

    // create new link button (x)
    const link = document.createElement("a");

    // class
    link.className = "delete-item secondary-content";

    // add icon
    link.innerHTML = '<i class="fa-solid fa-remove"></i>';

    // append link to li

    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

// add tasks
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task Mr man/Mrs woman");
  }

  // Create li element

  const li = document.createElement("li");

  // class
  li.className = "collection-item";

  // Create textnode(whatever the user types in) and append
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link button (x)
  const link = document.createElement("a");

  // class
  link.className = "delete-item secondary-content";

  // add icon
  link.innerHTML = '<i class="fa-solid fa-remove"></i>';

  // append link to li

  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear inputs
  taskInput.value = "";

  e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks

function clearTasks() {
  taskList.innerHTML = "";

  //   clear from local storage
  clearTasksFromLocalStorage();
}

// clear tasls from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
// filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
