import "./styles.css";
import { TodoApp } from "./TodoApp.js";


const todo1 = TodoApp.createTodo('Buy groceries', 'Milk, eggs, and bread', '2025-02-25', 'High');
// const todo2 = createTodo('Read book', 'Finish reading JavaScript book', '2025-02-26', 'Medium');

console.log(todo1.getTitle()); // Output: 'Buy groceries'
// TodoApp.addToProjectDict(todo1);
console.log(TodoApp.getAllProjects())