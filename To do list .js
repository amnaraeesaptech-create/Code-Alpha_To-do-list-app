let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();
    input.value = "";
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task";

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}"
                  onclick="toggleTask(${index})">
                  ${task.completed ? '✅' : '📌'} ${task.text}
            </span>

            <div class="icons">
                <span onclick="deleteTask(${index})">🗑️</span>
            </div>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}