
import {Todo} from '../models/todo.models'
import { createTodoHTML } from './';

let element;

/**
 * 
 * @param {Stirng} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    

    //Todo referencia
    if(!element)
        element = document.querySelector(elementId) 
    if(!element) throw new Error (`Element ${elementId} not found`)

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    });



}