import { format,parseISO } from "date-fns";

export const TodoApp = (function() {
    const projectDict = {'default':[]};

    function createTodo (title, description="", dueDate="", priority="", completeStatus="Incomplete", project="default") {

        const getTitle = () => title;
        const updateTitle = (newTitle) => title = newTitle;

        const getDescription = () => description;
        const updateDescription = (newDescription) => description = newDescription;

        const getDueDate = () => formatDueDate(dueDate);
        const updateDueDate = (newDueDate) => dueDate = formatDueDate(newDueDate);

        const getPriority = () => priority;
        const updatePriority = (newPriority) => priority = newPriority;

        const getCompleteStatus = () => completeStatus;
        const updateCompleteStatus = (newCompleteStatus) => completeStatus = newCompleteStatus;

        const getProject = () => project;
        const changeProject = (newProject) => {
            project = newProject;
        }

        const todoObj = { getTitle, updateTitle, getDescription, updateDescription, getDueDate, updateDueDate, getPriority, updatePriority, getCompleteStatus, updateCompleteStatus, getProject, changeProject};
        addTodoToProject(todoObj);
        
        return todoObj;
    }


    function createProject (newProjectName) {
        if (checkIfProjectExists(newProjectName)) {
            return false;
        } else {
            projectDict[newProjectName] = []
            return;
        }
    }

    function updateProject(todoObj, projectName) {
        if (checkIfProjectExists(projectName)) {
            todoObj.changeProject(projectName);
            addTodoToProject(todoObj);
        }
        else {
            return "Error: Project does not exist"
        }
    }
    
    function checkIfProjectExists (projectName) {
        if (projectDict[projectName]) {
            return true
        } else {
            return false
        }
    }

    function addTodoToProject (todoObj) {
        projectDict[todoObj.getProject()].push(todoObj);
    }

    function getTodoByTitle (projectName, todoTitle) {
        // Check if project exists
        if (checkIfProjectExists(projectName)) {
            const project = projectDict[projectName];
            return project.find(todo => todo.getTitle() === todoTitle);
        }

        return "Project does not exist"
    }

    function getAllProjects () {
        return projectDict;
    }

    function getProjectTodoItems (project) {
        return projectDict[project];
    }

    function deleteProject (project) {
        delete projectDict[project];
    }

    function deleteTodo (projectName, todoTitle) {
        // Check if project exists
        if (checkIfProjectExists(projectName)) {
            // Filter out tasks by name
            projectDict[projectName] = projectDict[projectName].filter(todo => todo.getTitle() !== todoTitle);
            return projectDict[projectName];
        }

        return "Project does not exist"
    }

    function formatDueDate (dueDateInput) {
        var parsedDate = parseISO(dueDateInput);
        const formattedDate = format(parsedDate, 'M/d');
        return formattedDate;
    }

    return {
        createTodo,
        createProject,
        updateProject,
        checkIfProjectExists,
        addTodoToProject,
        getTodoByTitle,
        getAllProjects,
        getProjectTodoItems,
        deleteProject,
        deleteTodo
    };

})();