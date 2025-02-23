function createTodo (title, description = "", dueDate="", priority="") {
    console.log({
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    });
    return { title, description, dueDate, priority };
}

createTodo("First Todo");