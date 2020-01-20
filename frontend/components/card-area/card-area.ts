import {
  Component,
  NgModule,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CardComponent } from '../card/card';
import { ToDoItemModel } from '../../models/todo-item-model';
import { DataController } from '../../controllers/data-controller';

@Component({
  selector: 'card-area',
  templateUrl: './card-area.html',
  styleUrls: ['./card-area.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAreaComponent {
  constructor(
    private dataController: DataController,
    private changeDetector: ChangeDetectorRef
  ) {}

  @Input()
  set isDone(isDone: boolean) {
    this.dataController.getToDoItems().then((toDoItems: ToDoItemModel[]) => {
      toDoItems = toDoItems.filter(item => item.isDone === isDone);
      for (let item of toDoItems) {
        this.idToToDoItems.set(item.id, item);
      }
      this.dataController.listenForAllUpdates(updatedToDoItem =>
        this._updateToDoItem(updatedToDoItem, isDone)
      );
      this.changeDetector.markForCheck();
    });
  }

  idToToDoItems: Map<string, ToDoItemModel> = new Map();

  get toDoItems(): ToDoItemModel[] {
    return [...this.idToToDoItems.values()];
  }

  private _updateToDoItem(
    updatedToDoItem: ToDoItemModel, isDone: boolean
  ): void {
    if (
      updatedToDoItem.isDone === isDone &&
      !this.idToToDoItems.has(updatedToDoItem.id)
    ) {
      this.idToToDoItems.set(updatedToDoItem.id, updatedToDoItem);
    }
    else if (
      updatedToDoItem.isDone !== isDone &&
      this.idToToDoItems.has(updatedToDoItem.id)
    ) {
      this.idToToDoItems.delete(updatedToDoItem.id);
    }
    this.changeDetector.markForCheck();
  }
}

@NgModule({
  declarations: [CardAreaComponent, CardComponent],
  bootstrap: [CardAreaComponent]
})
export class CardAreaComponentModule {}