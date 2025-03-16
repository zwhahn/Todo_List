import "./styles.css";
import { TodoApp } from "./TodoApp.js";

var currentProject = 'default'

const addProjectBtn = document.getElementById("add-project-btn");
addProjectBtn.addEventListener('click', () => {
    const newProjectName = prompt('Enter new project name');
    // Tell user why project creation failed
    if (TodoApp.createProject(newProjectName) == false){
        alert('Project name already exists');
    };
    showProjectList();
})

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener('click', () => {
    const form = document.getElementById("new-task-form");
    const dialog = document.querySelector("dialog")
    updateModalSelectOptions();
    
    const taskSubmitBtn = document.getElementById("task-submit-btn");
    taskSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault(); //Stop page refresh
        if (form.reportValidity()){
            getData(form);
            form.reset();
            dialog.close();
            showTodoList(currentProject);
        };
    });

    dialog.showModal();
})

const projectList = document.getElementById("project-list");
function showProjectList() {
    // Clear project list
    projectList.textContent = '';
    for (const project in TodoApp.getAllProjects()) {
        console.log(project);
        const projectListItem = document.createElement("li");
        const projectTitle = document.createElement("div");

        // Delete project button
        const projectDeleteBtn = document.createElement("button");
        projectDeleteBtn.innerText = 'Delete';
        projectDeleteBtn.addEventListener("click", () => {
            projectDeletion(project)
        })
     
        projectTitle.textContent = project;
        projectTitle.addEventListener('click', function() {
            showTodoList(this.textContent);
        }); 
        projectListItem.appendChild(projectTitle);
        projectListItem.appendChild(projectDeleteBtn);
        projectList.appendChild(projectListItem);    
    }
    return
}

function changeProjectTitle(project) {
    const projectTitle = document.getElementById("project-title");
    projectTitle.textContent = project;
    currentProject = project;
}

const taskList = document.getElementById("task-list");
function showTodoList(project) {
    // Clear todo list
    taskList.textContent = '';

    changeProjectTitle(project);

    // Get todo objects
    const todoItems = TodoApp.getProjectTodoItems(project); 
    todoItems.forEach(todoItem => {
        const todoTitle = todoItem.getTitle();
        console.log(todoTitle);
        const todoListItem = document.createElement("li");
        const todoTask = document.createElement("div");

        // Delete project button
        const todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.innerText = 'Delete';
        todoDeleteBtn.addEventListener("click", () => {
            taskDeletion(currentProject, todoItem);
        })

        todoTask.textContent = todoTitle;
        todoListItem.appendChild(todoTask);
        todoListItem.appendChild(todoDeleteBtn);
        taskList.appendChild(todoListItem);

    });
}

// Update project drop down list dynamically
function updateModalSelectOptions() {
    const projectSelection = document.getElementById("projectSelection");
    // Clear existing options
    projectSelection.innerHTML = '';
    
    for (const projectName in TodoApp.getAllProjects()) {
        const projectOption = document.createElement('option');
        projectOption.value = projectName;
        projectOption.textContent = projectName;
        // Default project is the current project
        if (projectName === currentProject) {
            projectOption.selected = "selected";
        }
        projectSelection.appendChild(projectOption);
    };
}

function getData(form) {
    var formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    TodoApp.createTodo(formDataObject.title,
        formDataObject.description,
        formDataObject.dueDate,
        formDataObject.priority,
        formDataObject.completeStatus,
        formDataObject.projectSelection
    );
}

function projectDeletion(project) {
    TodoApp.deleteProject(project);
    showProjectList();
    currentProject = Object.keys(TodoApp.getAllProjects())[0];
    console.log("Current Project: " + currentProject);

    // Handle empty project list
    if (currentProject === undefined) {
        createNewProject();
        return;
    }
    showTodoList(currentProject);
}

function taskDeletion(currentProject, todoObj) {
    const todoTitle = todoObj.getTitle();
    console.log(TodoApp.deleteTodo(currentProject, todoTitle));
    showTodoList(currentProject);
}

function createNewProject() {
    TodoApp.createProject('New Project');
    currentProject = 'New Project';
    showTodoList(currentProject);
    showProjectList();
}

function openTaskEditDialogue() {
    const dialog = document.querySelector('dialog');
    const form = document.getElementById('new-task-form')
} 

const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
const todo2 = TodoApp.createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

TodoApp.createProject('Personal');
TodoApp.createProject('Cleaning');
TodoApp.createProject('Groceries');
TodoApp.createProject('Chores');
TodoApp.createProject('Places to Eat');
const todo3 = TodoApp.createTodo('Sweep floor', 'Finish reading JavaScript book', '2025-02-26', 'Medium', 'Incomplete', 'Cleaning');
showProjectList();

showTodoList(currentProject); 