import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  todos: Todo[] = [];

  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')!) || [];
  }

  getAllTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveLocalStorage();
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo;
    this.saveLocalStorage();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
