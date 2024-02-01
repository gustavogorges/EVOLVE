import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-dashboard-modal',
  templateUrl: './new-dashboard-modal.component.html',
  styleUrls: ['./new-dashboard-modal.component.scss']
})
export class NewDashboardModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() newDashBool!:Boolean
}
