import { Component, NgModule, Input } from "@angular/core";
import { ToDoItemModel } from "../../models/todo-item-model";

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})
export class CardComponent {
  @Input() item: ToDoItemModel;
}

@NgModule({
  declarations: [CardComponent],
  bootstrap: [CardComponent]
})
export class CardComponentModule {}
