import { Component, OnInit } from '@angular/core';
import { ProjetoComponent } from '../componentes/projeto/projeto.component';
@Component({
  selector: 'app-tela-projeto',
  templateUrl: './tela-projeto.component.html',
  styleUrls: ['./tela-projeto.component.scss']
})
export class TelaProjetoComponent implements OnInit {

  projeto = ProjetoComponent
  constructor() {
   }

  ngOnInit(): void {
    let projetos = document.querySelectorAll("#projeto")
    projetos.forEach((e)=>{
      e.addEventListener('click', () => {
        projetos.forEach((a) => {
          if(e != a){
            a.toggleAttribute('click')
          }
        })
      })
    })
  }

   

}
