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
    const dialog = document.querySelector("dialog");
    form.reset();
    //Change form title and button text for add mode
    const submitBtn = document.getElementById('task-submit-btn');
    const legend = document.querySelector('legend');
    legend.textContent = 'Add Task';
    submitBtn.textContent = 'Add';

    updateModalSelectOptions();
    
    const taskSubmitBtn = document.getElementById("task-submit-btn");
    taskSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault(); //Stop page refresh
        if (form.reportValidity()){
            var formDataObject = getData(form);
            TodoApp.createTodo(formDataObject.title,
                formDataObject.description,
                formDataObject.dueDate,
                formDataObject.priority,
                formDataObject.completeStatus,
                formDataObject.projectSelection
            );
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

        // Delete todo button
        const todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.innerText = 'Delete';
        todoDeleteBtn.addEventListener("click", () => {
            taskDeletion(currentProject, todoItem);
        })

        const editTaskBtn = document.createElement("button");
        editTaskBtn.innerText = 'Edit';
        editTaskBtn.addEventListener('click', () => {
            openTaskEditDialogue(todoItem);
        })

        todoTask.textContent = todoTitle;
        todoListItem.appendChild(todoTask);
        todoListItem.appendChild(todoDeleteBtn);
        todoListItem.appendChild(editTaskBtn);
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
    return formDataObject
}

function editTodo(formDataObj, todoObj) {
    todoObj.updateTitle(formDataObj.title);
    todoObj.updateDescription(formDataObj.description);
    todoObj.updateDueDate(formDataObj.dueDate);
    todoObj.updatePriority(formDataObj.priority);
    todoObj.changeCompleteStatus(formDataObj.completeStatus);
    todoObj.changeProject(formDataObj.projectSelection);
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

function openTaskEditDialogue(todoObj) {
    const editForm = document.getElementById("new-task-form");
    const editDialog = document.querySelector("dialog")
    const submitBtn = document.getElementById('task-submit-btn');
    const legend = document.querySelector('legend');

    //Change form title and button text for edit mode
    legend.textContent = 'Edit Task';
    submitBtn.textContent = 'Save Changes';

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); //Stop page refresh
        if (editForm.reportValidity()) {
            var formDataObject = getData(editForm);
            editTodo(formDataObject, todoObj);
            editForm.reset();
            editDialog.close();
            showTodoList(currentProject);
        }
    })

    //Populate form with cuurent task data
    editForm.title.value = todoObj.getTitle();
    editForm.description.value = todoObj.getDescription();
    editForm.dueDate.value = todoObj.getDueDate();

    // Set priority radio button
    const priorityValue = todoObj.getPriority();
    console.log(priorityValue);
    const priorityRadio = document.getElementById(priorityValue);
    priorityRadio.checked = true;

    // Set complete status checkbox
    editForm.completeStatus.checked = todoObj.getCompleteStatus() === 'Complete';

    // Set project selection
    // const projectSelection = document.getElementById('projectSelection');
    updateModalSelectOptions();

    editDialog.showModal();
} 

const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
const todo2 = TodoApp.createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Normal');

TodoApp.createProject('Personal');
TodoApp.createProject('Cleaning');
TodoApp.createProject('Groceries');
TodoApp.createProject('Chores');
TodoApp.createProject('Places to Eat');
const todo3 = TodoApp.createTodo('Sweep floor', 'Finish reading JavaScript book', '2025-02-26', 'Normal', 'Incomplete', 'Cleaning');
showProjectList();

showTodoList(currentProject); 