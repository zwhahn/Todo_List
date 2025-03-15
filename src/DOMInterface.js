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
        projectList.appendChild(listItem);    
    }
    return
}

function displayProjectTitle(project) {
    const projectTitle = document.getElementById("project-title");
    projectTitle.textContent = project;
}

showProjectList()


const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
// const todo2 = createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

console.log(todo1.getTitle()); // Output: 'Buy groceries'
// TodoApp.addToProjectDict(todo1);
console.log(TodoApp.getAllProjects())