import "./styles.css";
import { TodoApp } from "./TodoApp.js";

const addProjectBtn = document.getElementById("add-project-btn");
addProjectBtn.addEventListener('click', () => {
    const newProjectName = prompt('Enter new project name');
    // Tell user why project creation failed
    if (TodoApp.createProject(newProjectName) == false){
        alert('Project name already exists')
    };
    showProjectList()
})

const projectList = document.getElementById("project-list");
function showProjectList() {
    // Clear project list
    projectList.textContent = '';
    for (const project in TodoApp.getAllProjects()) {
        console.log(project);
        const projectListItem = document.createElement("li");
        projectListItem.textContent = project;
        projectListItem.addEventListener('click', function() {
            changeProjectTitle(this.textContent);
            showTodoList(this.textContent);
        }); 
        projectList.appendChild(projectListItem);    
    }
    return
}

function changeProjectTitle(project) {
    const projectTitle = document.getElementById("project-title");
    projectTitle.textContent = project;
}

const taskList = document.getElementById("task-list");
function showTodoList(project) {
    // Clear todo list
    taskList.textContent = '';

    // Get todo objects
    const todoItems = TodoApp.getProjectTodoItems(project); 
    todoItems.forEach(todoItem => {
        console.log(todoItem.getTitle());
        const todoListItem = document.createElement("li");
        todoListItem.textContent = todoItem.getTitle();
        taskList.appendChild(todoListItem);
    })
}


const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
const todo2 = TodoApp.createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

TodoApp.createProject('Personal');
TodoApp.createProject('Cleaning');
TodoApp.createProject('Groceries');
TodoApp.createProject('Chores');
TodoApp.createProject('Places to Eat');
const todo3 = TodoApp.createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium', 'Incomplete', 'Cleaning');
showProjectList();

showTodoList('default')