const add = document.getElementById('addTask')
const inputs = document.getElementById('taskInput')
const emptyTask = document.querySelector('.no-tasks')
const taskCount = document.querySelector('.countTask')
const compTask = document.querySelector('.countCompTask')

let totalTasks = 0;
let completedTasks = 0;


taskCount.textContent = totalTasks;
compTask.textContent = `${completedTasks} of ${totalTasks}`;


// Event listener for the add button
// This will add a new task to the list when the add button is clicked
add.addEventListener('click', ()=>{
    if(inputs.value.trim() ==''){
        inputs.focus()
    }else{
        const taskList = document.querySelector('.task-list')
        const li = document.createElement('li')
        li.innerHTML = `
            <input type="checkbox" id="taskCheck">
            <label id="toDo">${inputs.value}</label>
            <button class="deleteBtn"><img src="png/delete.svg" alt=""></button>
        `
        taskList.appendChild(li)
        inputs.value = ''
        emptyTask.style.display = 'none';
        if(totalTasks >= 0){
            totalTasks++;
            taskCount.textContent = totalTasks;
            compTask.textContent = `${completedTasks} of ${totalTasks}`;
        } else{
            totalTasks = 0;
        }

    }
})

// Event listener for the delete button
// This will remove the task from the list when the delete button is clicked
const listTask = document.querySelector('.task-list')
listTask.addEventListener('click', function(event){
    if(event.target.closest('.deleteBtn')){
        event.stopPropagation();
        const li = event.target.closest('li');
        if(li) listTask.removeChild(li);
        if(totalTasks > 0){
            totalTasks--;
            completedTasks = Math.max(0, completedTasks - 1);
            taskCount.textContent = totalTasks;
            compTask.textContent = `${completedTasks} of ${totalTasks}`;
        } else{
            totalTasks = 0;
        }
        if(listTask.children.length === 0){
            emptyTask.style.display = 'flex';
        }
    }
})

// Task completion logic the event listener for checkboxes
listTask.addEventListener('change', function(event) {
    if (event.target && event.target.type === 'checkbox') {
        if (event.target.checked) {
            completedTasks++;
        } else {
            completedTasks = Math.max(0, completedTasks - 1);
        }
        compTask.textContent = `${completedTasks} of ${totalTasks}`;

        const disabledLList = document.querySelectorAll('.task-list input[type="checkbox"]');
        disabledLList.forEach((checkbox) => {
            checkbox.disabled = true;
        });    
    }
});
