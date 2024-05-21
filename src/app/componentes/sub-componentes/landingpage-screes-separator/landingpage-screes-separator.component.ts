import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage-screes-separator',
  templateUrl: './landingpage-screes-separator.component.html',
  styleUrls: ['./landingpage-screes-separator.component.scss']
})
export class LandingpageScreesSeparatorComponent implements OnInit {

  @Input() slide : number = 0

  status : any[] = [
    {
      status: "to-do",
      color: "#67BFE0",
      tasks: []
    },
    {
      status: "done",
      color: "#4C956C",
      tasks: []
    },
    {
      status: "doing",
      color: "#F5D112",
      tasks: []
    },
  ];

  cards: any[] = [{},{},{},{},{},{},{},{}];

  ngOnInit(): void {
    this.cards.forEach((element, index) => {
      if (index < 3) {
        element.status = this.status[0];
        this.status[0].tasks.push(element);
      } else if (index < 5) {
        element.status = this.status[1];
        this.status[1].tasks.push(element);
      } else {
        element.status = this.status[2];
        this.status[2].tasks.push(element);
      }
    });
  }


  drop(event: CdkDragDrop<any[]>) {
    const movedItem = event.previousContainer.data[event.previousIndex];
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
        event.container.data[event.currentIndex] = movedItem;
  }
  

  


  alterarTarefaFavoritado(task: any) {
    task.favorited = !task.favorited;
  }

}
