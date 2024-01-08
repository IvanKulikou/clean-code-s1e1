



var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
console.log(addButton);
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // <-- Corrected ID
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    listItem.className = "custom-li";
    var checkBox = document.createElement("input");
    checkBox.className = "custom-checkbox";
    var label = document.createElement("label");
    label.className = "task-list__task";
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    var deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    // label.className = 'task';

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "custom-input";

    editButton.innerText = "Edit";
    editButton.className = "edit btn";

    deleteButton.className = "delete btn";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

var addTask = function () {
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    console.log(editBtn);

    var containsClass = listItem.classList.contains("task-list__edit-mode");
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task-list__edit-mode");
};

var deleteTask = function () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".edit");
    var deleteButton = taskListItem.querySelector(".delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
