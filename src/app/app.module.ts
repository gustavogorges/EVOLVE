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

import { TelaTarefaComponent } from './tela-tarefa/tela-tarefa.component';
import { TarefaCardPadraoComponent } from './componentes/tarefa-card-padrao/tarefa-card-padrao.component';

import { EquipeRecenteComponent } from './componentes/equipe-recente/equipe-recente.component';
import { DiaCalendarioComponent } from './componentes/dia-calendario/dia-calendario.component';
import { TarefaDiaComponent } from './componentes/tarefa-dia/tarefa-dia.component';



@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaCadastroComponent,
    TelaInicialComponent,
    NavegacaoComponent,
    EntregaProxComponent,
    TelaProjetoComponent,

    TelaTarefaComponent,
    TarefaCardPadraoComponent

    EquipeRecenteComponent,
    DiaCalendarioComponent,
    TarefaDiaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
