import "./styles.css";
import { format,parseISO } from "date-fns";
import { TodoApp } from "./TodoApp.js";
import trashIcon from '../icons/trash.svg';
import editIcon from '../icons/edit.svg';

var currentProject = 'default'
let formMode = 'Add';
let currentEditTodo = null;
const submitBtn = document.getElementById('task-submit-btn');
const form = document.getElementById("new-task-form");
const dialog = document.querySelector("dialog");


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
    const dialog = document.querySelector("dialog");
    form.reset();
    //Change form title and button text for add mode
    formMode = 'Add';
    const legend = document.querySelector('legend');
    legend.textContent = 'New Task';
    submitBtn.textContent = 'Add';

    updateModalSelectOptions();

    dialog.showModal();
})

submitBtn.addEventListener('click', function(e) {
    e.preventDefault(); //Stop page refresh
    modalSubmitBtn(formMode, form, dialog);
});

function modalSubmitBtn(formMode, form, dialog, currentEditTodo) {

    console.log(`currentEditTodo: ${currentEditTodo}`);
    
    //Add Mode
    if (formMode =='Add' && form.reportValidity()) {
        console.log("Add Button");
            var formDataObject = getData(form);
            TodoApp.createTodo(formDataObject.title,
                formDataObject.description,
                formDataObject.dueDate,
                formDataObject.priority,
                formDataObject.completeStatus,
                formDataObject.projectSelection
            );
    };

    //Edit Mode
    if (formMode =='Edit' && form.reportValidity()) {
        console.log("Edit Button")
        var formDataObject = getData(form);
        console.log('todoObj ' + currentEditTodo);
        editTodo(formDataObject, currentEditTodo);
    };

    form.reset();
    dialog.close();
    showTodoList(currentProject);
}

const projectList = document.getElementById("project-list");
function showProjectList() {
    // Clear project list
    projectList.textContent = '';

    // Add all projects back
    for (const project in TodoApp.getAllProjects()) {
        console.log(project);

        const projectListItem = document.createElement("li");
        projectListItem.classList.add('project-list-item')
        const projectTitle = document.createElement("div");
        projectTitle.classList.add('project-title')

        // Add delete project button
        const projectDeleteBtn = document.createElement("input");
        projectDeleteBtn.classList.add('project-delete-btn');
        projectDeleteBtn.type = 'image';
        projectDeleteBtn.src = trashIcon;
        projectDeleteBtn.alt = 'Delete';
        // projectDeleteBtn.innerText = 'Delete';
        projectDeleteBtn.addEventListener("click", () => {
            projectDeletion(project)
        })
     
        projectTitle.textContent = project;
        projectTitle.addEventListener('click', function() {
            showTodoList(project);
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

        // const todoContainer = document.createElement("div");
        // todoContainer.classList.add('todo-container');

        // const detailContainer = document.createElement("div");
        // detailContainer.classList.add('task-detail-container');
       
        const todoListItem = document.createElement("li");
        todoListItem.classList.add('todo-list-item');

        // Title
        const todoTitle = document.createElement("div");
        todoTitle.classList.add('todo-title');
        todoTitle.textContent = todoItem.getTitle();
        
        // Description
        const todoDescription = document.createElement("div");
        todoDescription.classList.add('todo-description');
        const todoDescriptionText = document.createElement("span");
        todoDescriptionText.classList.add('task-description-text')
        todoDescriptionText.textContent = todoItem.getDescription();
        todoDescription.appendChild(todoDescriptionText);
        
        // Date
        const taskDate = document.createElement("div");
        taskDate.classList.add('task-date');
        taskDate.textContent = todoItem.getDueDate();
        
        // Delete task button
        const deleteTaskBtn = document.createElement("input");
        deleteTaskBtn.classList.add('delete-task-btn');
        deleteTaskBtn.type = 'image';
        deleteTaskBtn.src = trashIcon;
        deleteTaskBtn.alt = 'Delete';
        deleteTaskBtn.addEventListener("click", () => {
            taskDeletion(currentProject, todoItem);
        })
        
        // Edit task button
        const editTaskBtn = document.createElement("input");
        editTaskBtn.classList.add('edit-task-btn');
        editTaskBtn.type = 'Image';
        editTaskBtn.src = editIcon;
        editTaskBtn.alt = 'Edit';
        editTaskBtn.addEventListener('click', () => {
            openTaskdialogue(todoItem);
        })
        
        todoListItem.appendChild(todoTitle);
        todoListItem.appendChild(todoDescription);
        todoListItem.appendChild(taskDate);
        todoListItem.appendChild(editTaskBtn);
        todoListItem.appendChild(deleteTaskBtn);
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

function editTodo(formDataObj) {
    currentEditTodo.updateTitle(formDataObj.title);
    currentEditTodo.updateDescription(formDataObj.description);
    currentEditTodo.updateDueDate(formDataObj.dueDate);
    currentEditTodo.updatePriority(formDataObj.priority);
    if (formDataObj.completeStatus === 'on') {
        currentEditTodo.updateCompleteStatus('Complete');
    } else {
        currentEditTodo.updateCompleteStatus('Incomplete')
    }
    currentEditTodo.changeProject(formDataObj.projectSelection);
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

function openTaskdialogue(todoObj) {
    const dialog = document.querySelector("dialog")
    formMode = 'Edit';
    currentEditTodo = todoObj;
    console.log(`todoObj: ${currentEditTodo}`)
    const legend = document.querySelector('legend');

    //Change form title and button text for edit mode
    legend.textContent = 'Edit Task';
    submitBtn.textContent = 'Save Changes';

    //Populate form with current task data
    form.title.value = todoObj.getTitle();
    form.description.value = todoObj.getDescription();
    form.dueDate.value = todoObj.getDueDate();

    // Set priority radio button
    const priorityValue = todoObj.getPriority();
    console.log(priorityValue);
    const priorityRadio = document.getElementById(priorityValue);
    priorityRadio.checked = true;

    // Set complete status checkbox
    // console.log(`Complete Status: ${todoObj.getCompleteStatus()}`)
    form.completeStatus.checked = todoObj.getCompleteStatus() === 'Complete';

    // Set project selection
    // const projectSelection = document.getElementById('projectSelection');
    updateModalSelectOptions();

    dialog.showModal();
} 

function formatDate () {
    format()
}

const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', format(new Date(2017, 10, 6), 'LLL do'), 'High');
const todo2 = TodoApp.createTodo('Read book', 'Finish reading JavaScript book', format(new Date(2017, 10, 6), 'LLL do'), 'Normal');

TodoApp.createProject('Personal');
TodoApp.createProject('Cleaning');
TodoApp.createProject('Groceries');
TodoApp.createProject('Chores');
TodoApp.createProject('Places to Eat');
const todo3 = TodoApp.createTodo('Sweep floor', 'Finish reading JavaScript book', format(new Date(2017, 10, 6), 'LLL do'), 'Normal', 'Incomplete', 'Cleaning');
showProjectList();

showTodoList(currentProject); 