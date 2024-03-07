import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';     
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
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

import { TelaTarefaComponent } from './tela-tarefa/tela-tarefa.component';
import { TarefaCardPadraoComponent } from './componentes/tarefa-card-padrao/tarefa-card-padrao.component';
import { ToastModule } from 'primeng/toast';
import { EquipeRecenteComponent } from './componentes/equipe-recente-card/equipe-recente-card.component';
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

import {ColorPickerModule} from 'primeng/colorpicker';

import { TelaCriarProjetoComponent } from './tela-criar-projeto/tela-criar-projeto.component';
import { MembrosEquipeComponent } from './componentes/membros-equipe/membros-equipe.component';
import { StatusComponentCriarTarefaComponent } from './componentes/sub-componentes/status-component-criar-tarefa/status-component-criar-tarefa.component';

import { TarefaCardListaComponent } from './tarefa-card-lista/tarefa-card-lista.component';
import { SelectCustomComponent } from './componentes/select-custom/select-custom.component';




// import { RecentTeamsComponent } from './componentes/recent-teams/recent-teams.component';
import { EquipesRecentesComponent } from './componentes/equipes-recentes/equipes-recentes.component';

import { TelaChatComponent } from './tela-chat/tela-chat.component';
// import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';

import { BotaoAddTarefaComponent } from './botao-add-tarefa/botao-add-tarefa.component';
import { SelectPropriedadeComponent } from './componentes/select-propriedade/select-propriedade.component';

import { MessageComponent } from './message/message.component';
import { MessageBarComponent } from './message-bar/message-bar.component';

import { TeamCreationScreenComponent } from './team-creation-screen/team-creation-screen.component';

import { TelaFullViewComponent } from './tela-full-view/tela-full-view.component';
import { ChartModule } from 'primeng/chart';
import { ChartModalComponent } from './componentes/chart-modal/chart-modal.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';


import { CdTimerModule } from 'angular-cd-timer';

import { TarefaKanbanComponent } from './tarefa-kanban/tarefa-kanban.component';
import { DndModule } from 'ngx-drag-drop';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GreenDivLandingpageComponent } from './componentes/sub-componentes/green-div-landingpage/green-div-landingpage.component';




@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaCadastroComponent,
    TelaInicialComponent,
    NavegacaoComponent,
    EntregaProxComponent,
    TelaProjetoComponent,
    ProjetoComponent,


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

    TelaCriarProjetoComponent,
    MembrosEquipeComponent,
    StatusComponentCriarTarefaComponent,
    TarefaCardListaComponent,
    SelectCustomComponent,
    SelectStatusComponent,

    // RecentTeamsComponent,
    EquipesRecentesComponent,

    TelaChatComponent,
    // ContactsComponent,
    ContactComponent,

    BotaoAddTarefaComponent,

    MessageComponent,
    MessageBarComponent,


    TeamCreationScreenComponent,

    TelaFullViewComponent,
    ChartModalComponent,

    TarefaKanbanComponent,
    SelectPropriedadeComponent,
    LandingPageComponent,
    GreenDivLandingpageComponent
  ],
  
  imports: [
    MessageModule,
    MessagesModule,
    ChartModule,
    BrowserAnimationsModule,
    CalendarModule,
    AppRoutingModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    InputTextareaModule,
    FormsModule,
    ToastModule,
    CalendarModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    CdTimerModule,
    BrowserModule,
    DragDropModule,
    DndModule

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
