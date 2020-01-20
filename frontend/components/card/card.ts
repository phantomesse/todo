import { Component, NgModule, Input } from '@angular/core';
import { ToDoItemModel } from '../../models/todo-item-model';
import { DataController } from '../../controllers/data-controller';

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})
export class CardComponent {
  constructor(private dataController: DataController) {}

  @Input()
  set item(item: ToDoItemModel) {
    this._item = item;
    this.dataController.listenForUpdates(
      item.id,
      updatedItem => (this._item = updatedItem)
    );
  }

  private _item: ToDoItemModel;

  get name(): string {
    return this._item.name;
  }

  set name(name: string) {
    this._item.name = name;
    this.dataController.updateToDoItem(this._item);
  }

  get isDone(): boolean {
    return this._item.isDone;
  }

  set isDone(isDone: boolean) {
    this._item.isDone = isDone;
    this.dataController.updateToDoItem(this._item);
  }
}

@NgModule({
  declarations: [CardComponent],
  bootstrap: [CardComponent]
})
export class CardComponentModule {}
