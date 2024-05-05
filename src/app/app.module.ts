import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { ShowAppComponent } from './show-app/show-app.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
 
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
