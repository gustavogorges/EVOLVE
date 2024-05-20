import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { InputNumberModule } from 'primeng/inputnumber';
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
import { ContactComponent } from './componentes/contact/contact.component';

import { BotaoAddTarefaComponent } from './botao-add-tarefa/botao-add-tarefa.component';
import { SelectPropriedadeComponent } from './componentes/select-propriedade/select-propriedade.component';

import { MessageComponent } from './componentes/message/message.component';
import { MessageBarComponent } from './componentes/message-bar/message-bar.component';

import { TeamCreationScreenComponent } from './team-creation-screen/team-creation-screen.component';

import { TelaFullViewComponent } from './tela-full-view-project/tela-full-view.component';
import { ChartModule } from 'primeng/chart';
import { ChartModalComponent } from './componentes/chart-modal/chart-modal.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';


import { CdTimerModule } from 'angular-cd-timer';

import { TarefaKanbanComponent } from './tarefa-kanban/tarefa-kanban.component';

import { TelaProjetoRemasteredComponent } from './tela-projeto-remastered/tela-projeto-remastered.component';
import { ProjetoRemasteredComponent } from './componentes/projeto-remastered/projeto-remastered.component';

import { NewDashboardModalComponent } from './componentes/new-dashboard-modal/new-dashboard-modal.component';
import { NewChartModalComponent } from './componentes/new-chart-modal/new-chart-modal.component';

import { DndModule } from 'ngx-drag-drop';
import { TaskCalendarComponent } from './componentes/task-calendar/task-calendar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { ImportantProjectComponent } from './important-project/important-project.component';
import { WeekCalendarComponent } from './componentes/week-calendar/week-calendar.component';
import { TasksWeekComponent } from './componentes/tasks-week/tasks-week.component';
registerLocaleData(localePT);


import { PropriedadeTarefaComponent } from './componentes/propriedade-tarefa/propriedade-tarefa.component';
import { SelectPrioridadeComponent } from './componentes/select-prioridade/select-prioridade.component';

import { SelectOpcaoComponent } from './componentes/select-opcao/select-opcao.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { UserCardPerfilComponent } from './componentes/user-card-perfil/user-card-perfil.component';
import { ProjectsInfoPerfilComponent } from './componentes/projects-info-perfil/projects-info-perfil.component';
import { DashboardPerfilComponent } from './componentes/dashboard-perfil/dashboard-perfil.component';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { ModalConfigComponent } from './componentes/modal-config/modal-config.component';

import { SelectAssociatesComponent } from './componentes/select-associates/select-associates.component';

import { VlibrasComponent } from './componentes/vlibras/vlibras.component';
import { TelaReportsComponent } from './tela-reports/tela-reports.component';
import { ConfirmActionProjectModalComponent } from './componentes/sub-componentes/confirm-action-project-modal/confirm-action-project-modal.component';
import { ModalOptionFullViewComponent } from './componentes/sub-componentes/modal-option-full-view/modal-option-full-view.component';
import { CommentsProjectComponent } from './componentes/sub-componentes/comments-project/comments-project.component';
import { MemberListFullViewProjectComponent } from './componentes/sub-componentes/member-list-full-view-project/member-list-full-view-project.component';

import { NotificationModalComponent } from './componentes/notification-modal/notification-modal.component';
import { AddMemberToProjectModalComponent } from './componentes/add-member-to-project-modal/add-member-to-project-modal.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchComponentComponent } from './componentes/search-component/search-component.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SearchUsersComponent } from './componentes/search-users/search-users.component';
import { UserMembersComponent } from './componentes/user-members/user-members.component';

import { MessageModalComponent } from './componentes/message-modal/message-modal.component';

import { TextToSpeechComponent } from './componentes/text-to-speech/text-to-speech.component';
import { ProjectTaskApprovalComponent } from './componentes/project-task-approval/project-task-approval.component';




export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaCadastroComponent,
    TelaInicialComponent,
    NavegacaoComponent,
    EntregaProxComponent,
    TelaProjetoRemasteredComponent,
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
    ProjectTaskApprovalComponent,
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

    TelaProjetoRemasteredComponent,
    ProjetoRemasteredComponent,


    NewDashboardModalComponent,
    NewChartModalComponent,

    TaskCalendarComponent,
    ImportantProjectComponent,
    WeekCalendarComponent,
    TasksWeekComponent,
    PropriedadeTarefaComponent,
    SelectPrioridadeComponent,
    TelaPerfilComponent,
    UserCardPerfilComponent,
    ProjectsInfoPerfilComponent,
    DashboardPerfilComponent,
    SideBarComponent,
    ModalConfigComponent,

    SelectOpcaoComponent,
    TelaPerfilComponent,
    SelectAssociatesComponent,
    VlibrasComponent,
    TelaReportsComponent,
    ConfirmActionProjectModalComponent,
    ModalOptionFullViewComponent,
    CommentsProjectComponent,
    MemberListFullViewProjectComponent,
    NotificationModalComponent,
    AddMemberToProjectModalComponent,
    SearchComponentComponent,
    SearchUsersComponent,
    UserMembersComponent,
    MessageModalComponent,
    TextToSpeechComponent

  ],
  
  imports: [
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
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
    ToastModule,
    CalendarModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    CdTimerModule,
    BrowserModule,
    DragDropModule,

    DndModule,
    CommonModule,

    InputNumberModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  
  providers: [HttpClient, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
