import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
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

   @HostListener('click', ['$event'])
   clicouFora(event:any){
    const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c73'));
      if(!element){
        for(let pFor of this.projects){
            pFor.isVisible = false;
        }
      }
   }

   teste(p:any){
     for(let pFor of this.projects){
       if(pFor != p){
         pFor.isVisible = false;
       }
       p.isVisible = true;
      }
    }
    
  ngOnInit(): void {}

}
