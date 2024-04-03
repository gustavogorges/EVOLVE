import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {

  booleanAddComment : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addCommentInput() : void {
    this.booleanAddComment = true;
  }

  addCommentValue() : void {
    


    this.booleanAddComment = false;
  }

}
