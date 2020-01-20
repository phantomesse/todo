import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataController } from '../controllers/data-controller';

@Component({
  selector: 'root',
  templateUrl: './root.html',
  styleUrls: ['./root.scss']
})
export class RootComponent {
  socketIoScriptPath: string;
  toDoItems: { name: string; isDone: boolean }[] = [];

  constructor(dataController: DataController) {
    this.socketIoScriptPath = dataController.socketIoScriptPath;
    dataController.getToDoItems().then(
      items => this.toDoItems = items,
      error => console.log(error)
    );
  }
}

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DataController],
  bootstrap: [RootComponent]
})
export class RootComponentModule {}
