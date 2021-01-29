export class Todo {

  constructor(title: string) {
    this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
  }

  private title = '';
  private completed = false;
  /**
   * 是否處於編輯模式
   *
   * @private
   * @memberof Todo
   */
  private editMode = false;

  get done(): boolean {
    return this.completed;
  }

  getTitle(): string {
    return this.title;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }

  get editing(): boolean {
    return this.editMode;
  }

  set editable(bl: boolean) {
    this.editMode = bl;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setCompleted(completed: boolean): void {
    this.completed = completed;
  }

}
