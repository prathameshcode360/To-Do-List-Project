document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const addButton = document.getElementById("addButton");
  const todoList = document.getElementById("todoList");
  const totalTasks = document.getElementById("totalTasks");
  const allTasksButton = document.getElementById("allTasksButton");
  const incompleteTasksButton = document.getElementById(
    "incompleteTasksButton"
  );
  const completeTasksButton = document.getElementById("completeTasksButton");
  const deleteSelectedButton = document.getElementById("deleteSelectedButton");
  const completeSelectedButton = document.getElementById(
    "completeSelectedButton"
  );

  addButton.addEventListener("click", addTodo);
  allTasksButton.addEventListener("click", showAllTasks);
  incompleteTasksButton.addEventListener("click", showIncompleteTasks);
  completeTasksButton.addEventListener("click", showCompleteTasks);
  deleteSelectedButton.addEventListener("click", deleteSelectedTasks);
  completeSelectedButton.addEventListener("click", completeSelectedTasks);

  function addTodo() {
    const taskText = input.value.trim();
    if (taskText !== "") {
      const listItem = document.createElement("li");
      listItem.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "select-task";

      const span = document.createElement("span");
      span.textContent = taskText;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", deleteTodo);

      const completeButton = document.createElement("button");
      completeButton.className = "complete";
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", completeTodo);

      listItem.appendChild(checkbox);
      listItem.appendChild(span);
      listItem.appendChild(deleteButton);
      listItem.appendChild(completeButton);

      todoList.appendChild(listItem);
      input.value = "";

      updateTotalTasks();
      updateBulkActionButtons();
    }
  }

  function deleteTodo() {
    this.parentElement.remove();
    updateTotalTasks();
    updateBulkActionButtons();
  }

  function completeTodo() {
    this.parentElement.classList.toggle("completed");
    alert("Task Completed");
    updateBulkActionButtons();
  }

  function updateTotalTasks() {
    totalTasks.textContent = todoList.children.length;
  }

  function showAllTasks() {
    const items = todoList.children;
    for (let item of items) {
      item.style.display = "flex";
    }
  }

  function showIncompleteTasks() {
    const items = todoList.children;
    for (let item of items) {
      if (item.classList.contains("completed")) {
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    }
  }

  function showCompleteTasks() {
    const items = todoList.children;
    for (let item of items) {
      if (item.classList.contains("completed")) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    }
  }

  function deleteSelectedTasks() {
    const selectedTasks = document.querySelectorAll(".select-task:checked");
    selectedTasks.forEach((task) => task.parentElement.remove());
    updateTotalTasks();
    updateBulkActionButtons();
  }

  function completeSelectedTasks() {
    const selectedTasks = document.querySelectorAll(".select-task:checked");
    selectedTasks.forEach((task) => {
      task.parentElement.classList.add("completed");
      task.checked = false;
    });
    alert("Selected tasks completed");
    updateBulkActionButtons();
  }

  function updateBulkActionButtons() {
    const selectedTasks = document.querySelectorAll(".select-task:checked");
    const anySelected = selectedTasks.length > 0;
    deleteSelectedButton.disabled = !anySelected;
    completeSelectedButton.disabled = !anySelected;
  }

  todoList.addEventListener("change", function (event) {
    if (event.target.classList.contains("select-task")) {
      updateBulkActionButtons();
    }
  });
});
