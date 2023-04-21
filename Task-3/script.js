const toDoForm = document.querySelector('#to-do-form');
const taskList = document.querySelector('#task-list');
const completedList = document.querySelector('#completed-list');
const inputTask = document.querySelector('#input-task');

let tasks = [];

// Add task to list
function addTask(task) {
  tasks.push(task);
  renderTasks();
}

// Delete task from list
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Toggle completed status of task
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Render tasks in the list
function renderTasks() {
  taskList.innerHTML = '';
  completedList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement('li');
    const taskName = document.createTextNode(tasks[i].name);
    const deleteButton = document.createElement('button');
    const completedCheckbox = document.createElement('input');
    completedCheckbox.setAttribute('type', 'checkbox');
    completedCheckbox.setAttribute('class', 'completed-checkbox');

    // Set the completed status of the task
    if (tasks[i].completed) {
      completedCheckbox.checked = true;
      li.classList.add('completed');
      completedList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }

    // Add the task name and buttons to the list item
    li.appendChild(completedCheckbox);
    li.appendChild(taskName);
    li.appendChild(deleteButton);
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', () => deleteTask(i));
    completedCheckbox.addEventListener('change', () => toggleCompleted(i));
  }
}

// Add a new task when the form is submitted
toDoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskName = inputTask.value.trim();
  if (taskName !== '') {
    const task = { name: taskName, completed: false };
    addTask(task);
    inputTask.value = '';
  }
});
