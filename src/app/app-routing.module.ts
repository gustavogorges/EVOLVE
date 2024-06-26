import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaTarefaComponent } from './tela-tarefa/tela-tarefa.component';
import { TelaCriarProjetoComponent } from './tela-criar-projeto/tela-criar-projeto.component';
import { TelaChatComponent } from './tela-chat/tela-chat.component';

import { TeamCreationScreenComponent } from './team-creation-screen/team-creation-screen.component';

import { TelaFullViewComponent } from './tela-full-view-project/tela-full-view.component';
import { TelaProjetoRemasteredComponent } from './tela-projeto-remastered/tela-projeto-remastered.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaReportsComponent } from './tela-reports/tela-reports.component';
import { AuthGuard } from './shared/auth.guard';
import { TelaLandingPageComponent } from './tela-landing-page/tela-landing-page.component';


const routes: Routes = [
  {
    path : "",
    component : TelaLandingPageComponent,
  },
  {
    path : "login",
    component : TelaLoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "tela-cadastro",
    component : TelaCadastroComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path : "tela-inicial",
    component : TelaInicialComponent,
   canActivate: [AuthGuard]
  },
  {
    path:"tela-projeto/:teamId",
    component: TelaProjetoRemasteredComponent,
   canActivate: [AuthGuard]
  },
  {
    path:"tela-tarefa/:projectId",
    component: TelaTarefaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"criar-projeto/:teamId",
    component: TelaCriarProjetoComponent,
   canActivate: [AuthGuard]
  },
  {
    path:"tela-chat",
    component: TelaChatComponent,
    canActivate: [AuthGuard]
  },
  {

    path:"equipe/:teamId",
    component: TeamCreationScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'view-project/:projectId',
    component: TelaFullViewComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'reports',
    component: TelaReportsComponent,
    canActivate: [AuthGuard]

  },
  {

    path:"tela-perfil/:userId",
    component: TelaPerfilComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
