import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaProjetoComponent } from './tela-projeto/tela-projeto.component';
import { TelaTarefaComponent } from './tela-tarefa/tela-tarefa.component';

const routes: Routes = [
  {
    path : "",
    component : TelaLoginComponent
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
    component: TelaProjetoComponent
  },
  {
    path:"tela-tarefa",
    component: TelaTarefaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
