import {Component, NgModule} from '@angular/core';
// import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'root',
  templateUrl: './root.html',
  styleUrls: ['./root.scss'],
})
export class RootComponent {
  constructor() {}
}

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule
    // AppRoutingModule
  ],
  bootstrap: [RootComponent],
})
export class RootComponentModule {}
