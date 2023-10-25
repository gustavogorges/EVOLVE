import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AccordionModule} from 'primeng/accordion';     

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { TelaLoginComponent } from './tela-login/tela-login.component';


@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
