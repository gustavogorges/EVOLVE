import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LogarithmicScale } from 'chart.js';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';

@Component({
  selector: 'app-equipe-recente-card',
  templateUrl: './equipe-recente-card.component.html',
  styleUrls: ['./equipe-recente-card.component.scss']
})
export class EquipeRecenteComponent implements OnInit, OnChanges {

  @Input() team!: Team 

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team']) {
      
      
    }  }
    getUserStyles(user: any): any {
      let styles: any = {};
      
      if(user.image!=null){
        styles['background'] = user.image.data;
        
      
      }
      styles['background-color'] = user.imageColor;

      
      
      
      return styles;
    }
    goToPerfil(member: User){
      this.router.navigate(['/tela-perfil/'+member.id]);

    }
    
}
