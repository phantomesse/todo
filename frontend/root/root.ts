import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataController } from '../controllers/data-controller';
import { ToDoItemModel } from '../models/todo-item-model';
import { CardAreaComponent, CardAreaComponentModule } from '../components/card-area/card-area';
import { CardComponent } from '../components/card/card';

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
    // dataController.getToDoItems().then(
    //   items => this.toDoItems = items,
    //   error => console.log(error)
    // );
  }
}

@NgModule({
  declarations: [RootComponent, CardAreaComponent, CardComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DataController],
  bootstrap: [RootComponent]
})
export class RootComponentModule {}
