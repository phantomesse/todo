import fs from 'fs';
import path from 'path';

// Manages the data within the app.
export class DataController {
  static _dataFilePath = path.join(__dirname, '../data/todo.md');

  toDoItems: ToDoItem[] = [];

  constructor() {
    let data = fs
      .readFileSync(DataController._dataFilePath, 'utf8')
      .split('\n')
      .filter(line => line.length > 0);
    this.toDoItems = data.map(line => {
      let isDone = line.startsWith('✔');
      let name = (isDone ? line.substr('✔'.length) : line).trim();
      return new ToDoItem(name, isDone);
    });
  }
}

class ToDoItem {
  name: string;
  isDone: boolean;

  constructor(name: string, isDone: boolean) {
    this.name = name;
    this.isDone = isDone;
  }
}
