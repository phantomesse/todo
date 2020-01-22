import { Injectable } from '@angular/core';
import { CardComponent } from "../components/card/card";
import { CardAreaComponent } from "../components/card-area/card-area";

@Injectable({
  providedIn: 'root'
})
export class DragController {
  private _draggingCard: CardComponent;
  
  startDrag(card: CardComponent) {
    this._draggingCard = card;
  }

  drop(updatedIsDone: boolean) {
    if (this._draggingCard === undefined) return;
    this._draggingCard.isDone = updatedIsDone;
  }
}
