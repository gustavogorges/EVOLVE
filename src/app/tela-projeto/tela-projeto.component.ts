import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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

   projects =[
    {
      isVisible: false
    },
    {
      isVisible: false
    },
    {
      isVisible: false
    },
    {
      isVisible: false
    },
    {
      isVisible: false
    },
    {
      isVisible: false
    },
    {
      isVisible: false
    },
   ]

   ultimoP = ProjetoComponent

   clicouFora(){
    for(let pFor of this.projects){
        pFor.isVisible = false;
        console.log(event)
    }
   }
   
   teste(p:any){
    
     for(let pFor of this.projects){
       if(pFor != p){
         pFor.isVisible = false;
       }
      }
      if(this.ultimoP === p){
        p.isVisible = true
      }else{
        p.isVisible = true;
      }
      this.ultimoP = p;
   }

  ngOnInit(): void {
    
  }


}
