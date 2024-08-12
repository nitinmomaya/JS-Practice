import { strings } from "./strings.js";

const addTaskButton = document.getElementById("add-task");
const titleHeading = document.getElementById("title-heading");
const taskInput = document.getElementById("todolist-input");
const renderList = document.getElementById("render-task");
taskInput.placeholder = strings.createTask;
addTaskButton.textContent = strings?.createTask;
titleHeading.textContent = strings?.todoListTitle;

let taskList = [];

const addTask = () => {
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
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
  console.log("ren", taskList);

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
      enableEdit(taskcontent, editButton);
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

const enableEdit = (taskContent, editButton) => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = taskContent?.textContent;
  taskContent?.replaceWith(input);
  editButton?.removeEventListener("click", enableEdit);
  editButton?.addEventListener("click", () => {
    updateTask(input, editButton);
  });
};

const updateTask = (input, editButton) => {
  const updatedTask = document.createElement("span");
  updatedTask.textContent = input.value;
  input.replaceWith(updatedTask);
  editButton?.removeEventListener("click", updateTask);
  editButton?.addEventListener("click", () => {
    enableEdit(updatedTask, editButton);
  });
};

const deleteTask = (id) => {
  taskList = taskList.filter((task) => task?.id !== id);
  renderTask();
};

addTaskButton.addEventListener("click", () => {
  addTask();
});
