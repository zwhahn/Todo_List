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
    projectList.textContent = '';
    for (const project in TodoApp.getAllProjects()) {
        console.log(project);
        const listItem = document.createElement("li");
        listItem.textContent = project;
        listItem.addEventListener('click', function() {
            displayProjectTitle(this.textContent);  
        }); 
        projectList.appendChild(listItem);    
    }
    return
}

function displayProjectTitle(project) {
    const projectTitle = document.getElementById("project-title");
    projectTitle.textContent = project;
}





const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
const todo2 = TodoApp.createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

TodoApp.createProject('Personal');
TodoApp.createProject('Cleaning');
TodoApp.createProject('Groceries');
TodoApp.createProject('Chores');
TodoApp.createProject('Places to Eat');
showProjectList();