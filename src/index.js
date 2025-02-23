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
    const updateProject = (newProject) => project = newProject;

    return { getTitle, updateTitle, getDescription, updateDescription, getDueDate, updateDueDate, getPriority, updatePriority, getCompleteStatus, changeCompleteStatus, getProject, updateProject};
}

function createProject (name) {
    projectList = []
    const getName = () => name;

    projectList = []
    const addToProjectList = () => {
        projectList.push(name);
    }
    const getProjectList = () => projectList;

    return { getName, addToProjectList, getProjectList }
}

projectDict = {}
function manageProjectDict (todoObj) {
    project = todoObj.getProject()

    if (projectDict[proj]) {
        projectDict[proj].push(todoObj);
    } else {
        projectDict[proj] = [todoObj];
    }
}

const todo1 = createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
const todo2 = createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

console.log(todo1.getTitle()); // Output: 'Buy groceries'
console.log(todo2.getDescription()); // Output: 'Finish reading JavaScript book'
