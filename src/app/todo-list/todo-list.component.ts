import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo.model';

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

  getList(): Todo[] {
    return this.todoListService.getList();
  }

  edit(todo: Todo): void {
    todo.editable = true;
  }
  update(todo: Todo, newTitle: string): void {

    if (!todo){
      return;
    }

    const title = newTitle.trim();
    if (title) {
      todo.setTitle(title);
      todo.editable = false;
    } else {
      const index = this.getList().indexOf(todo);
      if (index != -1) {
        this.remove(index);
      }
    }

  }

  remove(index: number): void {
    this.todoListService.remove(index);
  }

  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

}
