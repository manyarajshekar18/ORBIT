const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskItem = document.createElement("li");

  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskText;

  const statusElement = document.createElement("span");
  statusElement.textContent = "Pending";
  statusElement.classList.add("task-status");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(statusElement);
  taskItem.appendChild(deleteButton);

  taskTextElement.addEventListener("click", function () {

    taskItem.classList.toggle("completed");

    if (taskItem.classList.contains("completed")) {
      statusElement.textContent = "Completed";
    } else {
      statusElement.textContent = "Pending";
    }

  });

  deleteButton.addEventListener("click", function () {
    taskItem.remove();
  });

  taskList.appendChild(taskItem);

  taskInput.value = "";

});