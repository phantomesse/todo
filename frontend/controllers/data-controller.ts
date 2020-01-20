import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoItemModel } from '../models/todo-item-model';

@Injectable({
  providedIn: 'root'
})
export class DataController {
  private http: HttpClient;
  private backendUrlPrefix: string;
  public socketIoScriptPath: string;
  private socket;

  constructor(http: HttpClient) {
    this.http = http;
    this.backendUrlPrefix = environment.production
      ? '/'
      : 'http://localhost:1338/';
    this.socketIoScriptPath = `${this.backendUrlPrefix}socket.io/socket.io.js`;
    this.socket = io(this.backendUrlPrefix);
  }

  getToDoItems(): Promise<ToDoItemModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.backendUrlPrefix + 'get').subscribe(
        (response: ToDoItemModel[]) => resolve(response),
        error => reject(error)
      );
    });
  }

  updateToDoItem(updatedToDoItem: ToDoItemModel): void {
    this.socket.emit('update', updatedToDoItem);
  }

  listenForUpdates(
    toDoItemId: string,
    onUpdate: (updatedToDoItem: ToDoItemModel) => void
  ): void {
    this.socket.on('updated', function(updatedToDoItem) {
      if (updatedToDoItem.id === toDoItemId) onUpdate(updatedToDoItem);
    });
  }
}
