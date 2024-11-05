import todoStore, {Filters} from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './usecases';


const elementIds = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    todoFilters: '.filtro',
    pendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(elementIds.TodoList, todos);
        updatePendingCount()
    }

    const updatePendingCount  = () =>{
        renderPending(elementIds.pendingCountLabel);
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
    const clearCompletedBotton = document.querySelector(elementIds.clearCompleted);
    const filtersLIs = document.querySelectorAll(elementIds.todoFilters);


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
    clearCompletedBotton.addEventListener('click', () =>{
        todoStore.deleteCompleted()
        displayTodos()
    })
    filtersLIs.forEach(element =>{
        element.addEventListener('click', (element) =>{
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed); 
                    break;
            }
            displayTodos()

        })
    })
}
