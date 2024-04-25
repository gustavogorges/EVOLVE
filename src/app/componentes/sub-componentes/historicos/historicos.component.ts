import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.scss']
})
export class HistoricosComponent implements OnInit {

  constructor( private service : BackendEVOLVEService) { }

  @Input()
  task : Task = new Task;

  async ngOnInit(): Promise<void> {
    this.task = await this.service.getOne("task", this.task.id); 
    console.log(this.task);
   console.log
   ( this.task.historic)
  }

}
