import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private service : BackendEVOLVEService, private route:Router) {}

   @HostListener('click', ['$event'])
   clicouFora(event:any){
    const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c73'));
      if(!element){
        for(let pFor of this.projetos){
            pFor.isVisible = false;
        }
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
    this.limpa()
  }

  deletarPai(id:number){
    this.projetos.forEach((e) =>{
      if(e.id == id){
        this.projetos.splice(this.projetos.indexOf(e),1)
      }
    })
    this.service.deleteById("projeto",id);
  }

  salvarPai(p:Projeto){
    this.service.putProjeto(p)
  }

  abrirProjetoPai(p:Projeto){
    this.projetos.forEach(element => {
      if(p != element){
        element.isVisible = false
      }
   });
    p.isVisible = !p.isVisible

  }

  limpa(){
    this.projetos.forEach(element => {
      if(element.nome === null || element.nome === ''){
        setTimeout(() => {
          this.deletarPai(element.id)
        }, 300);
      }
    });
  }

  async router(){
    let projeto:Projeto = await this.service.postProjeto(new Projeto)
    localStorage.setItem('projeto', JSON.stringify(projeto))
    this.route.navigate(['/criar-projeto'])
  }

}
