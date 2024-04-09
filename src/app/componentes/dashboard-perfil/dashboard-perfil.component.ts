import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-perfil',
  templateUrl: './dashboard-perfil.component.html',
  styleUrls: ['./dashboard-perfil.component.scss']
})
export class DashboardPerfilComponent implements OnInit, OnChanges {

  constructor(private service: BackendEVOLVEService) { }
  @Input()
  project!: Project
  @Input()
  user!: User
  stackedData!: any;
  stackedOptions: any;
  totalTask : number =0
  listaTasks!: Array<any>
  @ViewChild('chart') chart!: UIChart;

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // Handle changes in input data
    console.log('Input data changed:', changes);
    if (changes['project'] || changes['user']) {
     
      await this.calculateTotalTasks()
      this.dashboard()

      console.log(this.listaTasks);
      
    }
    
    if(changes['listaTasks']){
      this.dashboard()
      console.log(this.listaTasks);
      

    }
  }

   ngOnInit(): void {
    this.listaTasks =[]
    
  }
  setData(project: Project): any {
    console.log(this.listaTasks);
    

    const datasets = project.statusList.map((status: Status) => {
      let list = this.listaTasks.filter((t)=>{
        
        return t.currentStatus.id ==status.id
        
      })
      console.log(list.length);
      
     
      
      
      
      return {
        type: 'bar',
        label: status.name,
        backgroundColor: status.backgroundColor,
        data:[list.length] 
      };
    });
    console.log(datasets);
    
  
 this.stackedData = {
      labels: ['January'],
      datasets: datasets,
    };

    console.log(this.stackedData);

    
  }

  dashboard(): void {
    this.setData(this.project)
    this.stackedOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#6b6b6b',
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,

          ticks: {
            color: '#6b6b6b',
          },
          grid: {
            color: '',
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: '',
          },
          grid: {
            color: '',
          },
        },
      },
    };

  }
  async calculateTotalTasks():Promise<void> {
    this.totalTask = 0;
   console.log("abu");
   
       this.project =await this.service.getOne("project", this.project.id)
       console.log(this.project);
       
       this.project.tasks.map((t: Task)=>{
        console.log(this.user);
        console.log(t.associates);
        

        if(t.associates?.find(user=> this.user.id ==user.id)){
          this.totalTask+=1   
          
          this.listaTasks.push(t)   
          console.log(this.listaTasks);
               
        }
       })
    


  }

}
