import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/model/project';


@Component({
  selector: 'app-important-project',
  templateUrl: './important-project.component.html',
  styleUrls: ['./important-project.component.scss']
})
export class ImportantProjectComponent implements OnInit {
  caminho = "assets/naoVector.svg"
    caminhoEstrela="assets/estrelaNaoMarcada.svg"

@Input()
project !: Project;
  constructor() { }

  ngOnInit(): void {
  }
  favorite(){


    if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
      this.caminhoEstrela = "assets/estrelaMarcada.svg"
      this.project.favorited=true;
    } else {
      this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
      this.project.favorited=false;

    }
    
  


  }
 
}

