import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding
} from '@angular/core';
import { ToDoItemModel } from '../../models/todo-item-model';
import { DataController } from '../../controllers/data-controller';

// Contains a single todo item.
@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  constructor(
    private dataController: DataController,
    private changeDetector: ChangeDetectorRef
  ) {}

  @HostBinding('draggable')
  isDraggable: boolean = true;

  @Input()
  set item(item: ToDoItemModel) {
    this._item = item;
    this.dataController.listenForUpdates(item.id, updatedItem => {
      this._item = updatedItem;
      this.changeDetector.markForCheck();
    });
  }

  private _item: ToDoItemModel;

  get name(): string {
    return this._item.name;
  }

  set name(name: string) {
    this._item.name = name;
    this._updateItem();
  }

  get isDone(): boolean {
    return this._item.isDone;
  }

  set isDone(isDone: boolean) {
    this._item.isDone = isDone;
    this._updateItem();
  }

  _updateItem() : void {
    this.dataController.updateToDoItem(this._item);
  }
}
