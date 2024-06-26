import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { CookiesService } from 'src/service/cookies-service.service';
import { UsuarioTarefa } from 'src/model/userTask';

@Component({
  selector: 'app-dashboard-perfil',
  templateUrl: './dashboard-perfil.component.html',
  styleUrls: ['./dashboard-perfil.component.scss']
})
export class DashboardPerfilComponent implements OnInit, OnChanges {

  constructor(private service: BackendEVOLVEService,
    private cookies_service : CookiesService
  ) { }
  @Input()
  project!: Project
  @Input()
  user!: User
  stackedData!: any;
  stackedOptions: any;
  totalTask : number =0
  listaTasks!: Array<any>
  horasTotais : string = "00"
  minutosTotais : string = "00";
  loggedUser:User = new User;

  @ViewChild('chart') chart!: UIChart;

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // Handle changes in input data
    if (changes['project'] || changes['user']) {
     
      await this.calculateTotalTasks()
      this.dashboard()

    }
    
    if(changes['listaTasks']){
      this.dashboard()
    }
  }

  userAllWorkedTimeProject: Array<UsuarioTarefa> = []

   async ngOnInit() {
    this.listaTasks =[]
    this.loggedUser = await this.cookies_service.getLoggedUser();
    this.calculateWorkedTimeOnProject();
  }
  setData(project: Project): any {

    const datasets = project.statusList.map((status: Status) => {
      let list = this.listaTasks.filter((t)=>{
        
        return t.currentStatus.id ==status.id
        
      })

      return {
        type: 'bar',
        label: status.name,
        backgroundColor: status.backgroundColor,
        data:[list.length] 
      };
    });
  
 this.stackedData = {
      labels: [''],
      datasets: datasets,
    };
    
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
   
       this.project =await this.service.getOne("project", this.project.id)
       
       this.project.tasks.map((t: Task)=>{

        if(t.associates?.find(user=> this.user.id ==user.id)){
          this.totalTask+=1   
          
          this.listaTasks.push(t)   
               
        }
       })
  }

  async calculateWorkedTimeOnProject() {
    this.userAllWorkedTimeProject = await this.service.getAllWorkedTime(this.loggedUser.id, this.project.id); 
    this.userAllWorkedTimeProject.forEach((userTask) => {
      this.horasTotais = (parseInt(this.horasTotais) + userTask.workedHours).toString();
      this.minutosTotais = (parseInt(this.minutosTotais) + userTask.workedMinutes).toString();
    });
    if(parseInt(this.horasTotais) < 10){
      this.horasTotais = "0" + this.horasTotais;
    }
    if(parseInt(this.minutosTotais) < 10){
      this.minutosTotais = "0" + this.minutosTotais;
    }
  }

}
