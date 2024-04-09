import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';

@Component({
  selector: 'app-equipe-recente-card',
  templateUrl: './equipe-recente-card.component.html',
  styleUrls: ['./equipe-recente-card.component.scss']
})
export class EquipeRecenteComponent implements OnInit, OnChanges {

  @Input() team!: Team 

  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team']) {
      console.log(this.team);
      
      
    }  }
    getUserStyles(user: any): any {
      let styles: any = {};
      console.log(user);
      
      if(user.image!=null){
        styles['background'] = user.image.data;
        
      
      }
      styles['background-color'] = user.imageColor;

      
      
      
      return styles;
    }
    
}
