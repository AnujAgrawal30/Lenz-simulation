import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  
import {FormsModule} from '@angular/forms';    

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LottieAnimationViewModule } from 'ng-lottie';
import { LottieModule } from 'ngx-lottie'; // add this line

export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} // add this line


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LottieAnimationViewModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
