import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { ProjetoComponent } from '../componentes/projeto/projeto.component';
import { TelaCriarProjetoComponent } from '../tela-criar-projeto/tela-criar-projeto.component';
@Component({
  selector: 'app-tela-projeto',
  templateUrl: './tela-projeto.component.html',
  styleUrls: ['./tela-projeto.component.scss']
})
export class TelaProjetoComponent implements OnInit {

  

  projeto = ProjetoComponent
  constructor(private service : BackendEVOLVEService) {
   }

   @HostListener('click', ['$event'])
   clicouFora(event:any){
    const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c73'));
      if(!element){
        for(let pFor of this.projetos){
            pFor.isVisible = false;
        }
      }
   }

   openProjeto(p:Projeto){
     for(let pFor of this.projetos){
       if(pFor != p){
         pFor.isVisible = false;
       }
       p.isVisible = true;
      }
    }

  projetos !: Projeto[]
    
  ngOnInit(): void {
    this.funcao()
  }

  ngOnChange(): void {
    this.funcao()
  }

  async funcao(){
    this.projetos = await this.service.getAllSomething('projeto')
  }


  deletarPai(id:number){
    this.projetos.forEach((e) =>{
      if(e.id == id){
        this.projetos.splice(this.projetos.indexOf(e),1)
      }
    })
    this.service.deleteById("projeto",id);

    console.log(this.service.deleteById("projeto",id));
    
  }
  
  

  


}
