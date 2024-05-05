import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TODO'
  todo: Todo = new Todo();
  todos: Todo[] = [];
  actionLabel: string = 'ADD';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadTodos();
  }

  async addTodo() {
    if (!this.todo.name || !this.todo.password) {
      alert("Please enter both username and password");
      return;
    }

    if (this.todo.id) {
      const { error } = await this.api.ApiUpdateTodo(this.todo);
      if (error) {
        console.error('Error updating todo:', error);
        return;
      }
      alert("Successfully updated");
    } else {
      const { error } = await this.api.ApiaddTodo(this.todo);
      if (error) {
        console.error('Error adding todo:', error);
        return;
      }
      alert("Successfully added");
    }

    this.loadTodos();
    this.resetTodo();
  }

  async loadTodos() {
    const { data, error } = await this.api.ApiViewTodos();
    if (error) {
      console.error('Error fetching todos:', error);
      return;
    }
    this.todos = data || [];
  }

  async deleteTodo(todoId: number) {
    const { error } = await this.api.ApideleteTodo(todoId);
    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      alert("Successfully deleted");
      this.loadTodos();
      this.resetTodo();
    }
  }

  selectTodo(todoItem: Todo) {
    this.todo = { ...todoItem };
    this.actionLabel = 'Update';
  }
  async updateTodo(todo: Todo) {
    const { error } = await this.api.ApiUpdateTodo(todo);
    if (error) {
      console.error('Error updating todo:', error);
    } else {
      alert("Successfully updated");
      this.loadTodos();
      this.resetTodo();
    }
  }
  
  resetTodo() {
    this.todo = new Todo();
    this.actionLabel = 'ADD';
  }
}
