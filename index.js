import { strings } from "./strings.js";

const addTaskButton = document.getElementById("add-task");
const titleHeading = document.getElementById("title-heading");
const taskInput = document.getElementById("todolist-input");
const renderList = document.getElementById("render-task");
taskInput.placeholder = strings.createTask;
addTaskButton.textContent = strings?.createTask;
titleHeading.textContent = strings?.todoListTitle;

let taskList = [];
let editId = null;

const addTask = () => {
  const taskValue = taskInput.value.trim();
  if (editId) {
    taskList = taskList.map((task) =>
      task.id === editId ? { ...task, task: taskValue } : task
    );
    editId = null;
  } else if (taskValue === "") {
    alert("please add a task");
  } else {
    const taskItem = {
      id: Date.now(),
      task: taskValue,
    };
    taskList.push(taskItem);
  }
  renderTask();
  taskInput.value = "";
};

const renderTask = () => {
  renderList.innerHTML = "";
  taskList.forEach((task) => {
    const wrapper = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    wrapper.className = "list-item";
    buttonWrapper.className = "button-wrapper";
    const taskcontent = document.createElement("span");
    const editButton = document.createElement("button");
    editButton.className = "edit";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    taskcontent.textContent = task?.task;
    editButton.textContent = strings?.edit;
    deleteButton.textContent = strings?.delete;

    editButton.addEventListener("click", () => {
      editTask(task?.id);
    });
    deleteButton.addEventListener("click", () => {
      deleteTask(task?.id);
    });

    wrapper.append(taskcontent);
    wrapper.append(editButton);
    buttonWrapper.append(deleteButton);
    buttonWrapper.append(editButton);
    wrapper.append(buttonWrapper);
    renderList.append(wrapper);
  });
};

const deleteTask = (id) => {
  taskList = taskList.filter((task) => task?.id !== id);
  renderTask();
};

const editTask = (id) => {
  const [taskItem] = taskList.filter((task) => task?.id === id);
  if (taskItem) {
    taskInput.value = taskItem.task;
    editId = taskItem.id;
    console.log("Editing task:", taskItem.task, taskList);
  } else {
    console.error("Task not found for id:", id);
  }
};

addTaskButton.addEventListener("click", () => {
  addTask();
});
