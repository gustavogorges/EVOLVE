import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { projetoService } from 'src/service/projetoService';
import { ProjetoComponent } from '../componentes/projeto/projeto.component';
@Component({
  selector: 'app-tela-projeto',
  templateUrl: './tela-projeto.component.html',
  styleUrls: ['./tela-projeto.component.scss']
})
export class TelaProjetoComponent implements OnInit {

  projeto = ProjetoComponent
  constructor(private renderer: Renderer2, private el: ElementRef, private revela : projetoService) {
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

   
   teste(p:any){
    let ultimoP
     for(let pFor of this.projects){
       pFor.isVisible = false;
      }
      if(ultimoP === p){
        p.isVisible = false;
      }else{
        p.isVisible = true;
      }
      ultimoP = p
   }

  ngOnInit(): void {
    
  }

  lista:[] = []

  ngAfterViewInit(){
    let divElement = this.el.nativeElement.querySelectorAll('#projeto')
    this.lista = divElement
    this.lista.forEach(projeto => {
      this.renderer.listen(projeto, 'click', ()=> {
        this.lista.forEach(outroPojeto => {
          if(projeto != outroPojeto){
            console.log(outroPojeto)
          }
        });
      })
    });
  }

   

}
