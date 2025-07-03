const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = ""; // Clear previous list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = task.completed ? "completed" : "";

    taskText.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    });

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
      }
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Allow pressing Enter to add task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
