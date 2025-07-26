document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector(".taskInput");
    const addTaskBtn = document.querySelector(".addTask");
    const taskList = document.querySelector(".taskList");
    const clearAllBtn = document.createElement("button");
    clearAllBtn.textContent = "Clear All";
    clearAllBtn.classList.add("clearAll");
    document.querySelector(".planner-container").appendChild(clearAllBtn);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();

    // Add Task
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="actions">
                    <button class="complete-btn" title="Mark Complete">${task.completed ? "↩" : "✔"}</button>
                    <button class="delete-btn" title="Delete Task">✖</button>
                </div>
            `;

            // Complete Task
            li.querySelector(".complete-btn").addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            // Delete Task
            li.querySelector(".delete-btn").addEventListener("click", () => {
                li.classList.add("fade-out");
                setTimeout(() => {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                }, 300);
            });

            taskList.appendChild(li);
        });

        clearAllBtn.style.display = tasks.length > 0 ? "block" : "none";
    }

    // Clear All
    clearAllBtn.addEventListener("click", () => {
        if (confirm("Clear all tasks?")) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
