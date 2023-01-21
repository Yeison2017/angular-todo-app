import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColorPickerControl } from '@iplab/ngx-color-picker';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  showValidationErrors: boolean;
  primaryColor: string = '#348756';
  secondaryColor: string = '#54b6ca';
  githubControlPrimary = new ColorPickerControl().setValueFrom(
    this.primaryColor
  );
  githubControlSecondary = new ColorPickerControl().setValueFrom(
    this.secondaryColor
  );
  changeStyle: boolean = false;

  constructor(private dataService: DataService, private dialog: MatDialog) {
    this.todos = [];
    this.showValidationErrors = false;
    this.saveColors();
  }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    const { value } = form;

    if (form.invalid) return (this.showValidationErrors = true);
    this.dataService.addTodo(new Todo(value.text));

    this.showValidationErrors = false;
    form.reset();

    return false;
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveLocalStorage();
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(index, result);
      }
    });
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.dataService.deleteTodo(index);
  }

  saveLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  saveColors() {
    this.primaryColor =
      localStorage.getItem('primaryColor') || this.primaryColor;
    this.secondaryColor =
      localStorage.getItem('secondaryColor') || this.secondaryColor;
  }

  changePrimaryColor(color: string) {
    this.primaryColor = color;
    localStorage.setItem('primaryColor', color);
  }

  changeSecondaryColor(color: string) {
    this.secondaryColor = color;
    localStorage.setItem('secondaryColor', color);
  }

  openChangeStyle() {
    this.changeStyle = !this.changeStyle;
  }
}
