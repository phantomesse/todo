// Manages the data within the app.
export class DataController {
  toDoItems: ToDoItem[] = [
    new ToDoItem('Finish writing this app!', false)
  ];
}

class ToDoItem {
  name: string;
  isDone: boolean;

  constructor(name: string, isDone: boolean) {
    this.name = name;
    this.isDone = isDone;
  }
}
