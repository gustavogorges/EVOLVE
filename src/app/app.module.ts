import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AccordionModule} from 'primeng/accordion';     

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import {CheckboxModule} from 'primeng/checkbox';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { NavegacaoComponent } from './componentes/navegacao/navegacao.component';
import { EntregaProxComponent } from './componentes/entrega-prox/entrega-prox.component';
import { TelaProjetoComponent } from './tela-projeto/tela-projeto.component';
import { ProjetoComponent } from './componentes/projeto/projeto.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaCadastroComponent,
    TelaInicialComponent,
    NavegacaoComponent,
    EntregaProxComponent,
    TelaProjetoComponent,
    ProjetoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
