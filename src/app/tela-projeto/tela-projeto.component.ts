import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/project';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-projeto',
  templateUrl: './tela-projeto.component.html',
  styleUrls: ['./tela-projeto.component.scss']
})
export class TelaProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route:Router) {}

   @HostListener('click', ['$event'])
   clicouFora(event:any){
    const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c76'));
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
    console.log(await this.service.getAllSomething('projeto'));
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

  async router(){
    console.log(new Projeto)
    localStorage.setItem('projeto', JSON.stringify(await this.service.postProjeto(new Projeto)))
    this.route.navigate(['/criar-projeto'])
  }

}
