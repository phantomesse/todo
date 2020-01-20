import { Component, Inject, forwardRef, HostBinding } from "@angular/core";
import { CardComponent } from "../card/card";

@Component({
  selector: 'drag-handle',
  templateUrl: './drag-handle.html',
  styleUrls: ['./drag-handle.scss']
})
export class DragHandleComponent {
  constructor(@Inject(forwardRef(() => CardComponent)) private _cardComponent : CardComponent) {
  }

  @HostBinding('class.done')
  get isDone(): boolean  {
    return this._cardComponent === undefined ? false : this._cardComponent.isDone;
  }
}
