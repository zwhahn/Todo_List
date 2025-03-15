export const TodoApp = (function() {
    const projectDict = {'default':[]};

    function createTodo (title, description="", dueDate="", priority="", completeStatus="Incomplete", project="default") {

        const getTitle = () => title;
        const updateTitle = (newTitle) => title = newTitle;

        const getDescription = () => description;
        const updateDescription = (newDescription) => description = newDescription;

        const getDueDate = () => dueDate;
        const updateDueDate = (newDueDate) => dueDate = newDueDate;

        const getPriority = () => priority;
        const updatePriority = (newPriority) => priority = newPriority;

        const getCompleteStatus = () => completeStatus;
        const changeCompleteStatus = () => {
            if(completeStatus == "Incomplete") {
                completeStatus = "Complete"
            }
            else { completeStatus = "Incomplete"}
        };

        const getProject = () => project;
        const changeProject = (newProject) => {
            project = newProject;
        }

        const todoObj = { getTitle, updateTitle, getDescription, updateDescription, getDueDate, updateDueDate, getPriority, updatePriority, getCompleteStatus, changeCompleteStatus, getProject, changeProject};
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

    return {
        createTodo,
        createProject,
        updateProject,
        checkIfProjectExists,
        addTodoToProject,
        getTodoByTitle,
        getAllProjects,
        getProjectTodoItems
    };

})();

// const todo1 = createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
// const todo2 = createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

// // Todo Object Testing
// console.log(todo1.getTitle()); // Output: 'Buy groceries'
// console.log(todo2.getDescription()); // Output: 'Finish reading JavaScript book'


// // Project Testing
// console.log(todo1.getProject());
// console.log(updateProject(todo1, 'BigNewProject'));  // error project does not exist
// createProject('BigNewProject'); // create project
// updateProject(todo1, 'BigNewProject') // change update project
// // addTodoToProject(todo1);  //add todo to project dict
// console.log(todo1.getProject());
// addTodoToProject(todo2);
// console.log(projectDict['default'][0].getTitle()); // returns 'Read book'
// // console.log(projectDict['default'][todo2].getTitle()); // returns error
// console.log(getTodoByTitle('default', 'Read book')); // returns todo object with that title