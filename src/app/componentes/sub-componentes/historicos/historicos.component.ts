import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.scss']
})
export class HistoricosComponent implements OnInit {

  constructor() { }

  @Input()
  task : Task = new Task;

  ngOnInit(): void {
  }

}
