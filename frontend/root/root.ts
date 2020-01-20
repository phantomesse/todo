import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataController } from '../controllers/data-controller';
import { ToDoItemModel } from '../models/todo-item-model';
import { CardAreaComponent } from '../components/card-area/card-area';
import { CardComponent } from '../components/card/card';
import {DragHandleComponent} from '../components/drag-handle/drag-handle';

@Component({
  selector: 'root',
  templateUrl: './root.html',
  styleUrls: ['./root.scss']
})
export class RootComponent {
  socketIoScriptPath: string;
  toDoItems: ToDoItemModel[] = [];

  constructor(dataController: DataController) {
    this.socketIoScriptPath = dataController.socketIoScriptPath;
  }
}

@NgModule({
  declarations: [RootComponent, CardAreaComponent, CardComponent, DragHandleComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DataController],
  bootstrap: [RootComponent]
})
export class RootComponentModule {}
