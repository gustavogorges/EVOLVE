import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { ToastModule } from 'primeng/toast';
import { EquipeRecenteComponent } from './componentes/equipe-recente/equipe-recente.component';
import { DiaCalendarioComponent } from './componentes/dia-calendario/dia-calendario.component';
import { TarefaDiaComponent } from './componentes/tarefa-dia/tarefa-dia.component';
import { ModalTarefaComponent } from './componentes/modal-tarefa/modal-tarefa.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SubTarefaComponent } from './componentes/sub-componentes/sub-tarefa/sub-tarefa.component';
import { ComentariosComponent } from './componentes/sub-componentes/comentarios/comentarios.component';
import { HistoricosComponent } from './componentes/sub-componentes/historicos/historicos.component';
import { AnexosComponent } from './componentes/sub-componentes/anexos/anexos.component';
import { AutomacaoComponent } from './componentes/sub-componentes/automacao/automacao.component';
import { IntegracaoComponent } from './componentes/sub-componentes/integracao/integracao.component';
import { CalendarModule } from 'primeng/calendar';
import { SelectStatusComponent } from './componentes/select-status/select-status.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    TarefaCardPadraoComponent,

    EquipeRecenteComponent,
    DiaCalendarioComponent,
    TarefaDiaComponent,
    ModalTarefaComponent,
    SubTarefaComponent,
    ComentariosComponent,
    HistoricosComponent,
    AnexosComponent,
    AutomacaoComponent,
    IntegracaoComponent,
    TarefaDiaComponent,
    SelectStatusComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    InputTextareaModule,
    FormsModule,
    ToastModule,
    CalendarModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    BrowserModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
