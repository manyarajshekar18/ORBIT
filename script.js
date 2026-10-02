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

const taskSummary =
  document.getElementById("taskSummary");


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
   PROJECT STATUS
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

    taskSummary.textContent =
      "Total: 0 | Pending: 0 | Completed: 0";

    return;

  }


  const tasks =
    projectTasks[
      selectedProjectName
    ];


  let completedCount = 0;


  tasks.forEach(function (task) {

    if (task.completed) {

      completedCount++;

    }

  });


  const totalCount =
    tasks.length;


  const pendingCount =
    totalCount -
    completedCount;


  taskSummary.textContent =
    "Total: " +
    totalCount +
    " | Pending: " +
    pendingCount +
    " | Completed: " +
    completedCount;



  /* =========================
     CREATE TASK ELEMENTS
  ========================== */

  tasks.forEach(
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



      /* =========================
         COMPLETE TASK
      ========================== */

      taskTextElement.addEventListener(
        "click",
        function () {


          task.completed =
            !task.completed;


          saveTasks();


          displayTasks();

        }
      );



      /* =========================
         DELETE TASK
      ========================== */

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



      /* =========================
         ADD ELEMENTS TO TASK
      ========================== */

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