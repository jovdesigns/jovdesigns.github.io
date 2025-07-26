let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
        <span>${task.name} (${task.priority}) - ${task.date}</span>
        <div>
          <button onclick="toggleComplete(${index})">✔️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;
      list.appendChild(li);
    });
}

function addTask(e) {
  e.preventDefault();
  const name = document.getElementById("task-name").value;
  const date = document.getElementById("task-date").value;
  const priority = document.getElementById("task-priority").value;

  tasks.push({ name, date, priority, completed: false });
  saveTasks();
  renderTasks();
  e.target.reset();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

document.getElementById("task-form").addEventListener("submit", addTask);
renderTasks();
