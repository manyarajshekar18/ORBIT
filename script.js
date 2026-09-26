const taskInput =
  document.getElementById("taskInput");

const addTaskButton =
  document.getElementById("addTaskButton");

const taskList =
  document.getElementById("taskList");

const projectCards =
  document.querySelectorAll(".project-card");

const selectedProject =
  document.getElementById("selectedProject");

const currentProject =
  document.getElementById("currentProject");


let selectedProjectName = null;


/* =========================
   PROJECT TASKS
========================= */

let projectTasks =
  JSON.parse(
    localStorage.getItem("orbitTasks")
  ) || {

    "Website Development": [],

    "Mobile Application": [],

    "Marketing Campaign": []

  };


/* =========================
   PROJECT STATUS
========================= */

let projectStatuses =
  JSON.parse(
    localStorage.getItem("orbitStatuses")
  ) || {

    "Website Development":
      "In Progress",

    "Mobile Application":
      "Planning",

    "Marketing Campaign":
      "Not Started"

  };


/* =========================
   SAVE TASKS
========================= */

function saveTasks() {

  localStorage.setItem(
    "orbitTasks",
    JSON.stringify(projectTasks)
  );

}


/* =========================
   SAVE PROJECT STATUS
========================= */

function saveProjectStatuses() {

  localStorage.setItem(
    "orbitStatuses",
    JSON.stringify(projectStatuses)
  );

}


/* =========================
   LOAD PROJECT STATUS
========================= */

projectCards.forEach(function (projectCard) {

  const projectName =
    projectCard.dataset.project;

  const statusDropdown =
    projectCard.querySelector(
      ".project-status"
    );


  statusDropdown.value =
    projectStatuses[projectName];


  statusDropdown.addEventListener(
    "change",
    function () {

      projectStatuses[projectName] =
        statusDropdown.value;

      saveProjectStatuses();

    }
  );

});


/* =========================
   PROJECT SELECTION
========================= */

projectCards.forEach(function (projectCard) {

  const selectButton =
    projectCard.querySelector(
      ".select-project"
    );


  selectButton.addEventListener(
    "click",
    function () {

      const projectName =
        projectCard.dataset.project;


      selectedProjectName =
        projectName;


      selectedProject.textContent =
        "Selected project: " +
        projectName;


      currentProject.textContent =
        "Managing tasks for: " +
        projectName;


      displayTasks();

    }
  );

});


/* =========================
   ADD TASK
========================= */

addTaskButton.addEventListener(
  "click",
  function () {

    if (selectedProjectName === null) {

      alert(
        "Please select a project first."
      );

      return;

    }


    const taskText =
      taskInput.value.trim();


    if (taskText === "") {

      return;

    }


    const task = {

      text: taskText,

      completed: false

    };


    projectTasks[
      selectedProjectName
    ].push(task);


    saveTasks();


    taskInput.value = "";


    displayTasks();

  }
);


/* =========================
   DISPLAY TASKS
========================= */

function displayTasks() {

  taskList.innerHTML = "";


  if (selectedProjectName === null) {

    return;

  }


  projectTasks[
    selectedProjectName
  ].forEach(
    function (task, index) {

      const taskItem =
        document.createElement("li");


      const taskTextElement =
        document.createElement("span");


      taskTextElement.textContent =
        task.text;


      const statusElement =
        document.createElement("span");


      statusElement.textContent =
        task.completed
          ? "Completed"
          : "Pending";


      statusElement.classList.add(
        "task-status"
      );


      const deleteButton =
        document.createElement("button");


      deleteButton.textContent =
        "Delete";


      taskTextElement.addEventListener(
        "click",
        function () {

          task.completed =
            !task.completed;


          saveTasks();


          displayTasks();

        }
      );


      deleteButton.addEventListener(
        "click",
        function () {

          projectTasks[
            selectedProjectName
          ].splice(index, 1);


          saveTasks();


          displayTasks();

        }
      );


      taskItem.appendChild(
        taskTextElement
      );


      taskItem.appendChild(
        statusElement
      );


      taskItem.appendChild(
        deleteButton
      );


      taskList.appendChild(
        taskItem
      );

    }
  );

}


/* =========================
   LOAD SAVED PROJECT STATUS
========================= */

projectCards.forEach(function (projectCard) {

  const projectName =
    projectCard.dataset.project;

  const statusDropdown =
    projectCard.querySelector(
      ".project-status"
    );


  statusDropdown.value =
    projectStatuses[projectName];

});