import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaTarefaComponent } from './tela-tarefa/tela-tarefa.component';
import { TelaCriarProjetoComponent } from './tela-criar-projeto/tela-criar-projeto.component';
import { TelaChatComponent } from './tela-chat/tela-chat.component';

import { TeamCreationScreenComponent } from './team-creation-screen/team-creation-screen.component';

import { TelaFullViewComponent } from './tela-full-view/tela-full-view.component';
import { TelaProjetoRemasteredComponent } from './tela-projeto-remastered/tela-projeto-remastered.component';


const routes: Routes = [
  {
    path : "",
    component : TelaProjetoRemasteredComponent
  },
  {
    path : "tela-cadastro",
    component : TelaCadastroComponent
  }, 
  {
    path : "tela-inicial",
    component : TelaInicialComponent
  },
  {
    path:"tela-projeto",
    component: TelaProjetoRemasteredComponent
  },
  {
    path:"tela-tarefa",
    component: TelaTarefaComponent
  },
  {
    path:"criar-projeto",
    component: TelaCriarProjetoComponent
  },
  {
    path:"tela-chat",
    component: TelaChatComponent
  },
  {

    path:"equipe/criar",
    component: TeamCreationScreenComponent
  },
  {
    path:'view-project',
    component: TelaFullViewComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
