import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tela-projeto-remastered',
  templateUrl: './tela-projeto-remastered.component.html',
  styleUrls: ['./tela-projeto-remastered.component.scss']
})
export class TelaProjetoRemasteredComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isVisible: boolean = false
  id!: number

  projetos:any[] = [
    {
      id : 0,
      isVisible : false
    },
    {
      id : 1,
      isVisible : false
    },
    {
      id : 2,
      isVisible : false
    },
    {
      id : 3,
      isVisible : false
    },
    {
      id : 4,
      isVisible : false
    }
  ]


  openProject(p:any){
      this.projetos.forEach(element => {
        if(element.id != p.id){
          element.isVisible = false
        }
      });
      p.isVisible = !p.isVisible
  }

  @ViewChild('projectElement') projectElement!:ElementRef
  @HostListener('click', ['$event'])
  clickOutside(event:any){
    if(event.target.contains(this.projectElement.nativeElement)){
      this.projetos.forEach(element => {
        element.isVisible = false
      });
    }
  }

}

