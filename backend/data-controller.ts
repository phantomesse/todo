// Manages the data within the app.
export class DataController {
  toDoItems: ToDoItem[] = [
    new ToDoItem('Finish writing this app!', false),
    new ToDoItem('Read a book', true)
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
