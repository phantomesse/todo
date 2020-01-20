import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoItemModel } from '../models/todo-item-model';

@Injectable({
  providedIn: 'root'
})
export class DataController {
  public socketIoScriptPath: string;
  private socket;
  private http: HttpClient;
  private backendUrlPrefix: string;
  private toDoItemsCache: ToDoItemModel[];

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
      if (this.toDoItemsCache !== undefined && this.toDoItemsCache.length > 0) {
        resolve(this.toDoItemsCache);
        return;
      }

      this.http.get(this.backendUrlPrefix + 'get').subscribe(
        (response: ToDoItemModel[]) => {
          this.toDoItemsCache = response;
          resolve(this.toDoItemsCache);
        },
        error => reject(error)
      );
    });
  }

  onUpdateToDoItem: EventEmitter<ToDoItemModel> = new EventEmitter();

  updateToDoItem(updatedToDoItem: ToDoItemModel): void {
    this.socket.emit('update', updatedToDoItem);
    this.onUpdateToDoItem.emit(updatedToDoItem);
  }

  listenForUpdates(
    toDoItemId: string,
    onUpdate: (updatedToDoItem: ToDoItemModel) => void
  ): void {
    this.socket.on('updated', function(updatedToDoItem) {
      if (updatedToDoItem.id === toDoItemId) onUpdate(updatedToDoItem);
    });
  }

  listenForAllUpdates(onUpdate: (updatedToDoItem: ToDoItemModel) => void) : void {
    this.onUpdateToDoItem.subscribe((updatedToDoItem: ToDoItemModel) => {
      onUpdate(updatedToDoItem);
    });
    this.socket.on('updated', (updatedToDoItem: ToDoItemModel) =>{
      onUpdate(updatedToDoItem);
    });
  }
}
