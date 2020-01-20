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
    this.toDoItems = data.map((line, index) => {
      let id = this._generateId(index);
      let isDone = line.startsWith('✔');
      let name = (isDone ? line.substr('✔'.length) : line).trim();
      return new ToDoItem(id, name, isDone);
    });
  }

  _generateId(index?: number): string {
    if (index === undefined) index = Math.round(Math.random() * 1000);
    let id = `${(Date.now() * (index + 1) % 10000000)}`;
    if (this.toDoItems.filter(item => item.id === id).length > 0) {
      return this._generateId(index + 1);
    }
    return id;
  }
}

class ToDoItem {
  id: string;
  name: string;
  isDone: boolean;

  constructor(id: string, name: string, isDone: boolean) {
    this.id = id;
    this.name = name;
    this.isDone = isDone;
  }
}
