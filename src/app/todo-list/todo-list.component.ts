import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  addTodo(inputRef: any): void {

    console.log(inputRef.value)
    const todo = inputRef.value.trim();

    if (todo) {
      this.todoListService.add(todo);
      inputRef.value = '';
    }

  }

  getList(): string[] {
    return this.todoListService.getList();
  }
}
