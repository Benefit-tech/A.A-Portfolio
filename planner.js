// =========================================================
// planner.js - Academic Planner (add, complete, delete tasks)
// =========================================================

// 1. Get the elements from the page
var taskInput = document.getElementById("taskInput");
var addButton = document.getElementById("addButton");
var taskList = document.getElementById("taskList");
var taskCount = document.getElementById("taskCount");

// 2. An ARRAY that stores all the tasks.
//    Each task is an object like: { text: "Study", done: false }
var tasks = [];

// 3. Function to show all tasks on the page
function showTasks() {
  // Clear the list first
  taskList.innerHTML = "";

  // Go through the array one task at a time
  for (var i = 0; i < tasks.length; i++) {
    // Create a new list item
    var li = document.createElement("li");

    // Create the task text
    var span = document.createElement("span");
    span.textContent = tasks[i].text;

    // If the task is done, add the "done" class (CSS adds a line through it)
    if (tasks[i].done === true) {
      li.className = "done";
    }

    // Create the delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    // When the text is clicked, mark the task as completed
    span.addEventListener("click", makeCompleteFunction(i));

    // When the button is clicked, delete the task
    deleteButton.addEventListener("click", makeDeleteFunction(i));

    // Put the text and button inside the list item, then add it to the page
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  // Show how many tasks are left
  var notDone = 0;
  for (var j = 0; j < tasks.length; j++) {
    if (tasks[j].done === false) {
      notDone = notDone + 1;
    }
  }
  taskCount.textContent = "Tasks remaining: " + notDone + " of " + tasks.length;
}

// 4. Function to ADD a task
function addTask() {
  var text = taskInput.value.trim();

  // Do not add empty tasks
  if (text === "") {
    alert("Please type a task first.");
    return;
  }

  // Add the new task to the end of the array
  tasks.push({ text: text, done: false });

  // Clear the input box and refresh the list
  taskInput.value = "";
  showTasks();
}

// 5. Functions that return the right action for each task
//    (they remember which task number "index" was clicked)
function makeCompleteFunction(index) {
  return function () {
    // Switch between done and not done
    tasks[index].done = !tasks[index].done;
    showTasks();
  };
}

function makeDeleteFunction(index) {
  return function () {
    // Remove 1 task from the array at this position
    tasks.splice(index, 1);
    showTasks();
  };
}

// 6. Events: run addTask when the button is clicked or Enter is pressed
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 7. Show the list when the page first loads
showTasks();
