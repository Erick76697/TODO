import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos } from './usecases';


const elementIds = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(elementIds.TodoList, todos)
    }

    //cuando la funcion app() se llama
    (()=>{
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos();
    })();

    //referencias HTML
    const newDescriptionInput = document.querySelector(elementIds.newTodoInput);
    const todoListUl = document.querySelector(elementIds.TodoList);


    //Listeners
    newDescriptionInput.addEventListener('keyup', (event)=>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos()
        event.target.value = ''
    }),

    todoListUl.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })
    
    todoListUl.addEventListener('click', (event)=>{
        const deleteElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !deleteElement) return
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos()
        
        
    })
}
