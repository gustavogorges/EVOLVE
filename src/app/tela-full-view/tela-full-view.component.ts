import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Project } from 'src/model/project';
@Component({
  selector: 'app-tela-full-view',
  templateUrl: './tela-full-view.component.html',
  styleUrls: ['./tela-full-view.component.scss'],
})
export class TelaFullViewComponent implements OnInit {

    basicData : any
    basicOptions !: any
    options : any
    data : any
    charts: any[] = []
    newDashVisibleBol: Boolean = false
    dashboards: any[] = []
    newChartBool: Boolean = false
    viewOptionsBol: Boolean = true
    viewEditBol: Boolean = false

    deleteDashboard(dashboard:any){
        this.dashboards.splice(this.dashboards.indexOf(dashboard), 1)
    }

    viewOptions(){
        this.viewOptionsBol = !this.viewOptionsBol
        this.viewEditBol = false

    }

    viewEdit(){
        this.viewEditBol = !this.viewEditBol
        this.newChartBool = false
        this.newDashVisibleBol = false
    }

    chartToTrash(dashboard:any,i:number){
        dashboard.charts.splice(i, 1)
    }

    ngOnInit() {
        this.chartsInitialize()
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

    @ViewChild ('Options') optionsMenu !: ElementRef
    @ViewChild ('dashElement') dashElement !: ElementRef
    @ViewChild ('newChartElement') newChartElement !: ElementRef
    @HostListener('click', ['$event'])
    outsideClick(event:any){
            
        if(!this.optionsMenu.nativeElement.contains(event.target) && !(event.target.tagName === "I")){
            this.viewOptionsBol = true
            this.viewEditBol = false
        }
        console.log(this.dashElement.nativeElement.contains(event.target));
        
        if(!(this.dashElement.nativeElement.contains(event.target))){
            this.newDashVisibleBol = false
        }

        if(!(this.newChartElement.nativeElement.contains(event.target))){
            this.newChartBool = false
        }
        
    }

    createNewDashBoard(dash:any){
        this.dashboards.push(dash)
        this.newDashVisibleBol = false
        this.dashboards = this.dashboards.reverse()
    }

    chartsInitialize(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.charts.push({
            id: 0,
            type: 'bar',
            data : {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [540, 325, 702, 620],
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
        
        {
            id: 1,
            type: 'pie',
            data : {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [540, 325, 702],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                    }
                ]
            },
    
            options : {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            }
        },
        {
            id: 2,
            type: 'doughnut',
            data : {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                    }
                ]
            },
    
            options : {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            }
        },

        {
            id: 3,
            type: 'bar',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
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

        {
            id: 4,
            type: 'bar',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            },
    
            options : {
                indexAxis: 'y',
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

        {
            id: 5,
            type: 'bar',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Dataset 1',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        data: [50, 25, 12, 48, 90, 76, 42]
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                        data: [21, 84, 24, 75, 37, 65, 34]
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                        data: [41, 52, 24, 74, 23, 21, 32]
                    }
                ]
            },
    
    
            options : {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        stacked: true,
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

        {
            id: 6,
            type: 'line',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        tension: 0.4
                    }
                ]
            },
    
            options : {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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
                            color: textColorSecondary
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

        {
            id: 7,
            type: 'line',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        yAxisID: 'y',
                        tension: 0.4,
                        data: [65, 59, 80, 81, 56, 55, 10]
                    },
                    {
                        label: 'Dataset 2',
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--green-500'),
                        yAxisID: 'y1',
                        tension: 0.4,
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            },
    
            options : {
                stacked: false,
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            drawOnChartArea: false,
                            color: surfaceBorder
                        }
                    }
                }
            }
        },

        {
            id: 8,
            type: 'line',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        tension: 0.4,
                        borderColor: documentStyle.getPropertyValue('--blue-500')
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderDash: [5, 5],
                        tension: 0.4,
                        borderColor: documentStyle.getPropertyValue('--teal-500')
                    },
                    {
                        label: 'Third Dataset',
                        data: [12, 51, 62, 33, 21, 62, 45],
                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--orange-500'),
                        tension: 0.4,
                        backgroundColor: 'rgba(255,167,38,0.2)'
                    }
                ]
            },
            
            options : {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            }
        },

        {
            id: 9,
            type: 'polarArea',
            data : {
                datasets: [
                    {
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--red-500'),
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--bluegray-500'),
                            documentStyle.getPropertyValue('--blue-500')
                        ],
                        label: 'My dataset'
                    }
                ],
                labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
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
                    r: {
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            }
        
        },

        {
            id: 10,
            type: 'radar',
            data : {
                labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                datasets: [
                    {
                        label: 'My First dataset',
                        borderColor: documentStyle.getPropertyValue('--bluegray-400'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
                        pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        borderColor: documentStyle.getPropertyValue('--pink-400'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
                        pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
                        data: [28, 48, 40, 19, 96, 27, 100]
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
                    r: {
                        grid: {
                            color: textColorSecondary
                        },
                        pointLabels: {
                            color: textColorSecondary
                        }
                    }
                }
            }
        },

        {
            id: 11,
            type: 'line',
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        type: 'line',
                        label: 'Dataset 1',
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        data: [50, 25, 12, 48, 56, 76, 42]
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                        data: [21, 84, 24, 75, 37, 65, 34],
                        borderColor: 'white',
                        borderWidth: 2
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                        data: [41, 52, 24, 74, 23, 21, 32]
                    }
                ]
            },
            
            options : {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            }
        }
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

    drop(event: CdkDragDrop<string[]>, dashboard:any) {
        if(dashboard.charts.length >= 2){
            this.newDashVisibleBol = false
            moveItemInArray(dashboard.charts, event.previousIndex, event.currentIndex);
        }
    }
    

    projeto !: Project
}
