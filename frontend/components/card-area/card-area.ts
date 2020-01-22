import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ElementRef
} from '@angular/core';
import { ToDoItemModel } from '../../models/todo-item-model';
import { DataController } from '../../controllers/data-controller';
import { DragController } from '../../controllers/drag-controller';

@Component({
  selector: 'card-area',
  templateUrl: './card-area.html',
  styleUrls: ['./card-area.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAreaComponent {
  constructor(
    private elementRef: ElementRef,
    private dataController: DataController,
    private _dragController: DragController,
    private changeDetector: ChangeDetectorRef
  ) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event): void {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event): void {
    event.preventDefault();
    this._dragController.drop(this._isDone);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    let x = event.changedTouches[0].pageX;
    let y = event.changedTouches[0].pageY;
    let rect = (this.elementRef
      .nativeElement as HTMLElement).getBoundingClientRect();
    let isCardInArea: boolean =
      x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
    this._dragController.drop(isCardInArea ? this._isDone : !this._isDone);
  }

  @Input()
  set isDone(isDone: boolean) {
    this._isDone = isDone;
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

  _isDone: boolean;

  idToToDoItems: Map<string, ToDoItemModel> = new Map();

  get toDoItems(): ToDoItemModel[] {
    return [...this.idToToDoItems.values()];
  }

  private _updateToDoItem(
    updatedToDoItem: ToDoItemModel,
    isDone: boolean
  ): void {
    if (
      updatedToDoItem.isDone === isDone &&
      !this.idToToDoItems.has(updatedToDoItem.id)
    ) {
      this.idToToDoItems.set(updatedToDoItem.id, updatedToDoItem);
    } else if (
      updatedToDoItem.isDone !== isDone &&
      this.idToToDoItems.has(updatedToDoItem.id)
    ) {
      this.idToToDoItems.delete(updatedToDoItem.id);
    }
    this.changeDetector.markForCheck();
  }
}
