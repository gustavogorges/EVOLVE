import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Chart } from 'chart.js';
import { map } from 'rxjs';
import { DashBoardCharts } from 'src/model/DashBoardCharts';
import { Dashboard } from 'src/model/dashboard';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
@Component({
  selector: 'app-tela-full-view',
  templateUrl: './tela-full-view.component.html',
  styleUrls: ['./tela-full-view.component.scss'],
})
export class TelaFullViewComponent implements OnInit {

    projeto !: Project
    basicData : any
    basicOptions !: any
    options : any
    data : any
    status : Status = new Status();
    charts: any[] = []
    newDashVisibleBol: Boolean = false
    dashboards: any[] = []
    newChartBool: Boolean = false
    viewOptionsBol: Boolean = true
    viewEditBol: Boolean = false
    openMemberView : number | undefined
    unlockAllMembersView = false;
    statusNames:any[] = []
    statusValues:any[] = []
    chartstoDash : Array<DashBoardCharts> = new Array
    boolEditStatus: boolean = false;
    booleanAddStatus: boolean = false;

    constructor(private service : BackendEVOLVEService, private route : ActivatedRoute){}

    viewOptions(){
        this.viewOptionsBol = !this.viewOptionsBol
        this.viewEditBol = false

    }

    viewEdit(){
        this.viewEditBol = !this.viewEditBol
        this.newChartBool = false
        this.newDashVisibleBol = false
    }

    async chartToTrash(dashboard:any, chart:any){
        await this.service.deleteChart(dashboard.id, chart.id, this.projeto.id)
        dashboard.charts.splice(dashboard.charts.indexOf(chart), 1)
    }

    async ngOnInit() {
        
        this.route.paramMap.subscribe( async params  => {
            const projectId = params.get('projectId');
            const id  = Number(projectId)
            this.projeto = await this.service.getOne('project', id);
            this.dashboards = await this.service.getDashboards(this.projeto.id);
            console.log(await this.service.getDashboards(this.projeto.id));
            
            setTimeout(() => {
                this.getStatusChart()
                this.dashboards?.reverse()   
            });
            setTimeout(() => {
                this.chartsInitialize()   
            });
            setTimeout(() => {
                this.getCharts()
            })
        });
    }

    verifyStatusDefault(status:Status){
        if(status.name === 'não atribuido' ||
        status.name === 'concluido' ||
        status.name === 'pendente' ||
        status.name === 'em progresso'){
          return true
        }
        return false
    }

    editStatus(status:Status){
        this.status = status
        this.boolEditStatus = true
        this.booleanAddStatus = false
      }

    async enableStatus(status:Status){
    status.enabled = !status.enabled
    }

    getCharts() {
        this.dashboards.forEach(dashboard => {
            console.log(dashboard);
            
            setTimeout(() => {
                dashboard.charts.sort((a: any, b: any) => a.chartIndex - b.chartIndex);    
            });

            let updatedCharts: any[] = [];
    
            setTimeout(() => {
                dashboard.charts.forEach((chart: any) => {
                    const matchingChart = this.charts.find((c: any) => c.data.datasets[0].label === chart.label);
                    if (matchingChart) {
                        const updatedMatchingChart = { ...matchingChart, id: chart.id };
                        updatedCharts.push(updatedMatchingChart);
                    }
                });   
            });
            
            setTimeout(() => {
                dashboard.charts = updatedCharts   
            });
            console.log(dashboard.charts);
        });
    }

    async deleteStatus(status:Status){
        if(this.projeto.id != null){
          this.projeto = await this.service.deleteStatus(this.projeto.id, status)
        }else{
          this.projeto.statusList.splice(this.projeto.statusList.indexOf(status), 1)
        }
    }

    
    addStatus() {
        this.booleanAddStatus = true;
    }
    
    async novoStatus(): Promise<void> {
        if(this.status.name != ''){
            if(this.status.backgroundColor === ''){
            this.status.backgroundColor = "#ff0000"
            }
            this.status.backgroundColor.toUpperCase()
            this.status.textColor = "#000000";
            
            this.addStatus();
        }
        
        this.status = new Status
    }

    async editStatusPut(){
        this.boolEditStatus = false
        this.booleanAddStatus = false
        this.status = new Status
    }


    getStatusChart(){
        if(this.projeto){
            this.projeto.charts.forEach(element => {
                if(element.label === "Status das tarefas")[
                    element.labels.forEach(chart => {
                        this.statusNames.push(
                            [
                                chart.label
                            ]
                        )
                    })
                ]
            });

            this.projeto.charts.forEach(element => {
                if(element.label === "Status das tarefas")[
                    element.labels.forEach(chart => {
                        this.statusValues.push(
                            [
                                chart.value
                            ]
                        )
                    })
                ]
            });
        }
    }
    

    openMember(index:number){
        if(this.openMemberView != undefined){
            if(this.openMemberView === index){
                this.closeMember()
            }else{
                this.openMemberView = index
            }
        }
        else{
            this.openMemberView = index
        }
    }

    blockMember(){
       if(!this.unlockAllMembersView){
        return 4;
       }else{
        return 999999999;
       }
    }

    unlockMembersView(){
        this.unlockAllMembersView = !this.unlockAllMembersView
     }

    closeMember(){
        this.openMemberView = undefined
    }

    ngOnDestroy(){
        localStorage.removeItem("project-view")
    }
    
    newDashVisible(){
        this.newDashVisibleBol = !this.newDashVisibleBol
        this.newChartBool = false
        this.viewEditBol = false
    }

    newChartVisible(){
        this.newChartBool = !this.newChartBool
        this.newDashVisibleBol = false
        this.viewEditBol = false
    }

    @ViewChild('statusClose') statusClose!:ElementRef
    @HostListener('click', ['$event'])
    outsideClick(event: any) {

        if(event.target.contains(this.statusClose.nativeElement)){
            this.boolEditStatus = false
            this.booleanAddStatus = false
        }
    }

    createNewDashBoard(dash:any){
        this.dashboards.push(dash)
        this.newDashVisibleBol = false
        this.dashboards = this.dashboards.reverse()
    }

    getIdStatusCharts():number{
        let numForReturn : number = 0
        this.projeto.charts.forEach(element => {
            if(element.label === "Status das tarefas"){
                numForReturn = element.id
            }
        });
        return numForReturn
    }

    chartsInitialize(){
        let namesStatus = this.statusNames
        let valueStatus = this.statusValues
        let idStatus = this.getIdStatusCharts()

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        
        this.charts.push({
            id: 1,
            type: 'bar',
            data : {
                labels: namesStatus,
                datasets: [
                    {
                        label: 'Status das tarefas',
                        data: valueStatus,
                        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                        borderWidth: 1
                    }
                ]
            },
    
            options : {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            }
        },
        
        // {
        //     id: 1,
        //     type: 'pie',
        //     data : {
        //         labels: ['A', 'B', 'C'],
        //         datasets: [
        //             {
        //                 data: [540, 325, 702],
        //                 backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
        //                 hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        //             }
        //         ]
        //     },
    
        //     options : {
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     usePointStyle: true,
        //                     color: textColor
        //                 }
        //             }
        //         }
        //     }
        // },
        // {
        //     id: 2,
        //     type: 'doughnut',
        //     data : {
        //         labels: ['A', 'B', 'C'],
        //         datasets: [
        //             {
        //                 data: [300, 50, 100],
        //                 backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
        //                 hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        //             }
        //         ]
        //     },
    
        //     options : {
        //         cutout: '60%',
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         }
        //     }
        // },

        {
            id: 2,
            type: 'bar',
            data : {
                labels: this.statusNames,
                datasets: [
                    {
                        label: 'Status das tarefa',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: this.statusValues
                    },
                ]
            },
    
            options : {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }

                }
            }
        },

        // {
        //     id: 4,
        //     type: 'bar',
        //     data : {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [
        //             {
        //                 label: 'My First dataset',
        //                 backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        //                 borderColor: documentStyle.getPropertyValue('--blue-500'),
        //                 data: [65, 59, 80, 81, 56, 55, 40]
        //             },
        //             {
        //                 label: 'My Second dataset',
        //                 backgroundColor: documentStyle.getPropertyValue('--pink-500'),
        //                 borderColor: documentStyle.getPropertyValue('--pink-500'),
        //                 data: [28, 48, 40, 19, 86, 27, 90]
        //             }
        //         ]
        //     },
    
        //     options : {
        //         indexAxis: 'y',
        //         maintainAspectRatio: false,
        //         aspectRatio: 0.8,
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             x: {
        //                 ticks: {
        //                     color: textColorSecondary,
        //                     font: {
        //                         weight: 500
        //                     }
        //                 },
        //                 grid: {
        //                     color: surfaceBorder,
        //                     drawBorder: false
        //                 }
        //             },
        //             y: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder,
        //                     drawBorder: false
        //                 }
        //             }
        //         }
        //     }
        // },

        // {
        //     id: 5,
        //     type: 'bar',
        //     data : {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [
        //             {
        //                 type: 'bar',
        //                 label: 'Dataset 1',
        //                 backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        //                 data: [50, 25, 12, 48, 90, 76, 42]
        //             },
        //             {
        //                 type: 'bar',
        //                 label: 'Dataset 2',
        //                 backgroundColor: documentStyle.getPropertyValue('--green-500'),
        //                 data: [21, 84, 24, 75, 37, 65, 34]
        //             },
        //             {
        //                 type: 'bar',
        //                 label: 'Dataset 3',
        //                 backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
        //                 data: [41, 52, 24, 74, 23, 21, 32]
        //             }
        //         ]
        //     },
    
    
        //     options : {
        //         maintainAspectRatio: false,
        //         aspectRatio: 0.8,
        //         plugins: {
        //             tooltips: {
        //                 mode: 'index',
        //                 intersect: false
        //             },
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             x: {
        //                 stacked: true,
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder,
        //                     drawBorder: false
        //                 }
        //             },
        //             y: {
        //                 stacked: true,
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder,
        //                     drawBorder: false
        //                 }
        //             }
        //         }
        //     }
        // },

        // {
        //     id: 6,
        //     type: 'line',
        //     data : {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [
        //             {
        //                 label: 'First Dataset',
        //                 data: [65, 59, 80, 81, 56, 55, 40],
        //                 fill: false,
        //                 borderColor: documentStyle.getPropertyValue('--blue-500'),
        //                 tension: 0.4
        //             },
        //             {
        //                 label: 'Second Dataset',
        //                 data: [28, 48, 40, 19, 86, 27, 90],
        //                 fill: false,
        //                 borderColor: documentStyle.getPropertyValue('--pink-500'),
        //                 tension: 0.4
        //             }
        //         ]
        //     },
    
        //     options : {
        //         maintainAspectRatio: false,
        //         aspectRatio: 0.6,
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             x: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder,
        //                     drawBorder: false
        //                 }
        //             },
        //             y: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder,
        //                     drawBorder: false
        //                 }
        //             }
        //         }
        //     }
        // },

        // {
        //     id: 7,
        //     type: 'line',
        //     data : {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [
        //             {
        //                 label: 'Dataset 1',
        //                 fill: false,
        //                 borderColor: documentStyle.getPropertyValue('--blue-500'),
        //                 yAxisID: 'y',
        //                 tension: 0.4,
        //                 data: [65, 59, 80, 81, 56, 55, 10]
        //             },
        //             {
        //                 label: 'Dataset 2',
        //                 fill: false,
        //                 borderColor: documentStyle.getPropertyValue('--green-500'),
        //                 yAxisID: 'y1',
        //                 tension: 0.4,
        //                 data: [28, 48, 40, 19, 86, 27, 90]
        //             }
        //         ]
        //     },
    
        //     options : {
        //         stacked: false,
        //         maintainAspectRatio: false,
        //         aspectRatio: 0.6,
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             x: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             },
        //             y: {
        //                 type: 'linear',
        //                 display: true,
        //                 position: 'left',
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             },
        //             y1: {
        //                 type: 'linear',
        //                 display: true,
        //                 position: 'right',
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     drawOnChartArea: false,
        //                     color: surfaceBorder
        //                 }
        //             }
        //         }
        //     }
        // },

        // {
        //     id: 8,
        //     type: 'line',
        //     data : {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [
        //             {
        //                 label: 'First Dataset',
        //                 data: [65, 59, 80, 81, 56, 55, 40],
        //                 fill: false,
        //                 tension: 0.4,
        //                 borderColor: documentStyle.getPropertyValue('--blue-500')
        //             },
        //             {
        //                 label: 'Second Dataset',
        //                 data: [28, 48, 40, 19, 86, 27, 90],
        //                 fill: false,
        //                 borderDash: [5, 5],
        //                 tension: 0.4,
        //                 borderColor: documentStyle.getPropertyValue('--teal-500')
        //             },
        //             {
        //                 label: 'Third Dataset',
        //                 data: [12, 51, 62, 33, 21, 62, 45],
        //                 fill: true,
        //                 borderColor: documentStyle.getPropertyValue('--orange-500'),
        //                 tension: 0.4,
        //                 backgroundColor: 'rgba(255,167,38,0.2)'
        //             }
        //         ]
        //     },
            
        //     options : {
        //         maintainAspectRatio: false,
        //         aspectRatio: 0.6,
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             x: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             },
        //             y: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             }
        //         }
        //     }
        // },

        // {
        //     id: 9,
        //     type: 'polarArea',
        //     data : {
        //         datasets: [
        //             {
        //                 data: [11, 16, 7, 3, 14],
        //                 backgroundColor: [
        //                     documentStyle.getPropertyValue('--red-500'),
        //                     documentStyle.getPropertyValue('--green-500'),
        //                     documentStyle.getPropertyValue('--yellow-500'),
        //                     documentStyle.getPropertyValue('--bluegray-500'),
        //                     documentStyle.getPropertyValue('--blue-500')
        //                 ],
        //                 label: 'My dataset'
        //             }
        //         ],
        //         labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
        //     },
            
        //     options : {
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             r: {
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             }
        //         }
        //     }
        
        // },

        // {
        //     id: 10,
        //     type: 'radar',
        //     data : {
        //         labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        //         datasets: [
        //             {
        //                 label: 'My First dataset',
        //                 borderColor: documentStyle.getPropertyValue('--bluegray-400'),
        //                 pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
        //                 pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
        //                 pointHoverBackgroundColor: textColor,
        //                 pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
        //                 data: [65, 59, 90, 81, 56, 55, 40]
        //             },
        //             {
        //                 label: 'My Second dataset',
        //                 borderColor: documentStyle.getPropertyValue('--pink-400'),
        //                 pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
        //                 pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
        //                 pointHoverBackgroundColor: textColor,
        //                 pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
        //                 data: [28, 48, 40, 19, 96, 27, 100]
        //             }
        //         ]
        //     },
            
        //     options : {
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             r: {
        //                 grid: {
        //                     color: textColorSecondary
        //                 },
        //                 pointLabels: {
        //                     color: textColorSecondary
        //                 }
        //             }
        //         }
        //     }
        // },

        // {
        //     id: 11,
        //     type: 'line',
        //     data : {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [
        //             {
        //                 type: 'line',
        //                 label: 'Dataset 1',
        //                 borderColor: documentStyle.getPropertyValue('--blue-500'),
        //                 borderWidth: 2,
        //                 fill: false,
        //                 tension: 0.4,
        //                 data: [50, 25, 12, 48, 56, 76, 42]
        //             },
        //             {
        //                 type: 'bar',
        //                 label: 'Dataset 2',
        //                 backgroundColor: documentStyle.getPropertyValue('--green-500'),
        //                 data: [21, 84, 24, 75, 37, 65, 34],
        //                 borderColor: 'white',
        //                 borderWidth: 2
        //             },
        //             {
        //                 type: 'bar',
        //                 label: 'Dataset 3',
        //                 backgroundColor: documentStyle.getPropertyValue('--orange-500'),
        //                 data: [41, 52, 24, 74, 23, 21, 32]
        //             }
        //         ]
        //     },
            
        //     options : {
        //         maintainAspectRatio: false,
        //         aspectRatio: 0.6,
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     color: textColor
        //                 }
        //             }
        //         },
        //         scales: {
        //             x: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             },
        //             y: {
        //                 ticks: {
        //                     color: textColorSecondary
        //                 },
        //                 grid: {
        //                     color: surfaceBorder
        //                 }
        //             }
        //         }
        //     }
        // }
        )
    }

    gotoTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }

    async drop(event: CdkDragDrop<string[]>, dashboard:any) {
        if(dashboard.charts.length >= 2){
            this.newDashVisibleBol = false
            moveItemInArray(dashboard.charts, event.previousIndex, event.currentIndex);
        }

        dashboard.charts.forEach((element: any, index:number) => {
            element.chartIndex = dashboard.charts.indexOf(element)
        });
        console.log(dashboard);
        
        await this.service.updateChartList(dashboard.id, this.projeto.id, dashboard.charts)
        
    }
    

}
