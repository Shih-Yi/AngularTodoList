import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo.model';

import { TodoStatusType } from './todo-status-type.enum'

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

    let list: Todo[] = [];

    switch (this.status) {

      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;

      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;

      default:
        list = this.todoListService.getList();
        break;

    }

    return list;

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

  /**
   * 待辦事項狀態的列舉
   *
   * @memberof TodoListComponent
   */
  todoStatusType = TodoStatusType;

  /**
   * 目前狀態
   *
   * @private
   * @memberof TodoListComponent
   */
  private status = TodoStatusType.All;

  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }

  setStatus(status: number): void {
    this.status = status;
  }

  checkStatus(status: number): boolean {
    return this.status === status;
  }

  removeCompleted(): void {
    this.todoListService.removeComplted();
  }
}
