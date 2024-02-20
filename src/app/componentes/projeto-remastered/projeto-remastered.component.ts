import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-projeto-remastered',
  templateUrl: './projeto-remastered.component.html',
  styleUrls: ['./projeto-remastered.component.scss']
})
export class ProjetoRemasteredComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  @Input() projectOpen !: Boolean
  @Output() noCloseProject : EventEmitter<any> = new EventEmitter()

  openAgain(){
    this.noCloseProject.emit()
  }

}
