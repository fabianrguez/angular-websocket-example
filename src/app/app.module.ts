import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommentsComponent } from './components/comments/comments.component';
import {FormsModule} from '@angular/forms';
import {StompRService} from '@stomp/ng2-stompjs';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    StompRService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
