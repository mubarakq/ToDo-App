// Get all the needed elements
const add = document.getElementById('addTask');
const inputs = document.getElementById('taskInput');
const emptyTask = document.querySelector('.no-tasks');
const taskCount = document.querySelector('.countTask');
const compTask = document.querySelector('.countCompTask');
const listTask = document.querySelector('.task-list');

// Counters
let totalTasks = 0;
let completedTasks = 0;

// ---- STEP 1: Load saved tasks from localStorage ----
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ---- STEP 2: Function to save tasks into localStorage ----
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ---- STEP 3: Function to render tasks to the page ----
function renderTasks() {
  listTask.innerHTML = ''; // Clear old list
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="taskCheck" ${task.completed ? 'checked' : ''}>
      <label id="toDo">${task.text}</label>
      <button class="deleteBtn"><img src="png/delete.svg" alt=""></button>
    `;
    listTask.appendChild(li);
  });

  // Update counters
  totalTasks = tasks.length;
  completedTasks = tasks.filter(t => t.completed).length;
  taskCount.textContent = totalTasks;
  compTask.textContent = `${completedTasks} of ${totalTasks}`;

  // Show “No Tasks” message if empty
  emptyTask.style.display = tasks.length === 0 ? 'flex' : 'none';
}

// ---- STEP 4: Add new task ----
add.addEventListener('click', () => {
  if (inputs.value.trim() == '') {
    inputs.focus();
  } else {
    const newTask = {
      text: inputs.value,
      completed: false
    };
    tasks.push(newTask);    // add to array
    saveTasks();            // save to localStorage
    renderTasks();          // show on screen
    inputs.value = '';      // clear input
  }
});

// ---- STEP 5: Delete a task ----
listTask.addEventListener('click', function(event) {
  if (event.target.closest('.deleteBtn')) {
    event.stopPropagation();
    const li = event.target.closest('li');
    const label = li.querySelector('label');

    // Remove from array
    tasks = tasks.filter(task => task.text !== label.textContent);
    saveTasks();    // save changes
    renderTasks();  // update display
  }
});

// ---- STEP 6: Mark task as completed ----
listTask.addEventListener('change', function(event) {
  if (event.target && event.target.type === 'checkbox') {
    const label = event.target.nextElementSibling; // get label beside checkbox
    tasks.forEach(task => {
      if (task.text === label.textContent) {
        task.completed = event.target.checked;
      }
    });
    saveTasks(); // save updated status
    renderTasks();
  }
});

// ---- STEP 7: Load all tasks when the page opens ----
window.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});
