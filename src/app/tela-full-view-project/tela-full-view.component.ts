import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { map } from 'rxjs';
import { DashBoardCharts } from 'src/model/DashBoardCharts';
import { Dashboard } from 'src/model/dashboard';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { User } from 'src/model/user';
import { cloneDeep } from 'lodash';

import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
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
    newChartBool: boolean = false
    viewOptionsBol: boolean = true
    viewEditBol: Boolean = false
    openMemberView : number | undefined
    unlockAllMembersView = false;
    statusNames:any[] = []
    statusValues:any[] = []
    chartstoDash : Array<DashBoardCharts> = new Array
    boolEditStatus: boolean = false;
    booleanAddStatus: boolean = false;
    closeAllOptions: boolean = false
    dashboardEdit !: Dashboard
    editProject : boolean = false
    miniPageView : string = 'Dashboards'
    confirmationActionModalBol : boolean = false
    response : any
    quest : any
    searchTerm : any = ''
    nameEdit : boolean = false
    nameEdited : string = ''
    descEdited : string = ''
    preImage:SafeUrl | undefined = '';
    imagemBlob!:Blob
    formData : any = undefined
    openModalAddMembers : boolean = false
    loggedUser : User = new User;

    constructor(private service : BackendEVOLVEService, private route : ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private cookies_service : CookiesService){}

    async ngOnInit() {
        this.loggedUser = await this.cookies_service.getLoggedUser();
        this.route.paramMap.subscribe( async params  => {
            const projectId = params.get('projectId');
            const id  = Number(projectId)
            this.projeto = await this.service.getOne('project', id);
            this.dashboards = await this.service.getDashboards(this.projeto.id);
            console.log(this.projeto);

            setTimeout(() => {
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

    viewOptions(){
        this.viewOptionsBol = !this.viewOptionsBol
        this.viewEditBol = false

    }

    setModalOpenAddMembers(){
        this.openModalAddMembers = !this.openModalAddMembers
    }

    setModalOpenAddMembersFalse(){
        this.openModalAddMembers = false
    }

    async setImageProject(event:any){
        if(event.target.files && event.target.files[0]){
          if(event.target.files[0].type === "image/jpeg" 
          || event.target.files[0].type === "image/webp" 
          || event.target.files[0].type === "image/png"){
            this.imagemBlob = event.target.files[0]
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            this.formData = formData
            const blob = new Blob([event.target.files[0]], { type: event.target.files[0].type });
    
            const imageUrl = URL.createObjectURL(blob);
            this.preImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
          }
        }
    }

    editProjectFun(){
        this.nameEdited = this.projeto.name
        this.descEdited = this.projeto.description
        this.nameEdit = !this.nameEdit
    }

    async saveProject(){
        if(this.nameEdited != this.projeto.name || this.descEdited != this.projeto.description){
            let projetoTemp:any = cloneDeep(this.projeto);
            projetoTemp.name = this.nameEdited
            projetoTemp.description = this.descEdited
            projetoTemp.image = null
            projetoTemp.members = []
            this.projeto = await this.service.putProjeto(projetoTemp)
        }
        if(this.formData != undefined){
            await this.service.patchImage(this.projeto.id, this.formData)
            this.formData = undefined
        }
        this.nameEdit = false
    }

    filteredNames() {
        return this.projeto?.members?.filter(element => element?.email?.toLowerCase()?.startsWith(this.searchTerm.toLowerCase()) || element.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
    }

    setResponse(event:any){
        this.response = event
        this.confirmationActionModalBol = false
    }

    setMiniPageView(value : string){
        this.miniPageView = value
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

    setdashboardEdit(event:any){
        this.dashboardEdit = event
        
    }

    getResponse(){
        return this.response
    }

    setQuest(event:any){
        this.quest = event
        this.response = undefined
        this.confirmationActionModalBol = true
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
        await this.postStatus(status)
    }

    organizeStatus() {
        const statusPadroes = ['não atribuido', 'concluido', 'pendente', 'em progresso'];
        let statusPadraoPrioritario: any[] = [];
        let outrosStatus: any[] = [];
    
        this.projeto.statusList.forEach(status => {
            if (statusPadroes.includes(status.name)) {
                statusPadraoPrioritario.push(status);
            } else {
                outrosStatus.push(status);
            }
        });
    
        return statusPadraoPrioritario.concat(outrosStatus);
    }
    

    goToPerfilMember(member:User){
        this.router.navigateByUrl('/tela-perfil/'+member.id);
    }
    

    getCharts() {
        
        this.dashboards.forEach(dashboard => {
            
            setTimeout(() => {
                dashboard.charts.sort((a: any, b: any) => a.chartIndex - b.chartIndex);    
            });

            let updatedCharts: any[] = [];
    
            setTimeout(() => {
                
                dashboard.charts.forEach((chart: any) => {
                    let matchingChart = this.charts.find((c: any) => c.type === chart.type);

                    setTimeout(() => {
                        if (matchingChart) {
                            console.log(this.getValuesChart(chart));
                            
                            let updatedMatchingChart = { ...matchingChart, id: chart.id, data : {labels: this.getLabelsChart(chart), datasets : [ {label : chart.label, data: this.getValuesChart(chart),}]}};   
                            
                            setTimeout(() => {
                                updatedCharts.push(updatedMatchingChart);   
                            });
                        }   
                    });
                });   
            });
            
            setTimeout(() => {
                dashboard.charts = updatedCharts   
            });
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
    
    isContrastSufficient(textColor: string, backgroundColor: string, threshold: number = 500): boolean {
        const intensity = (color: string) => {
            const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            if (!rgb) return 0;
            const r = parseInt(rgb[1], 16);
            const g = parseInt(rgb[2], 16);
            const b = parseInt(rgb[3], 16);
            return r + g + b;
        };
    
        const textColorIntensity = intensity(textColor);
        const backgroundColorIntensity = intensity(backgroundColor);
        const contrast = Math.abs(textColorIntensity - backgroundColorIntensity);
    
        return contrast >= threshold;
    }
    
    async novoStatus(): Promise<void> {
        if(this.status.name != ''){
            if(this.status.backgroundColor === ''){
            this.status.backgroundColor = "#ff0000"
            }
            this.status.backgroundColor.toUpperCase();
            
            if(!this.isContrastSufficient('#000000', this.status.backgroundColor)){
            this.status.textColor = "#F4F4F4";
            } else {
            this.status.textColor = "#000000";
            }

            this.projeto = await this.postStatus(this.status)
            this.addStatus();
        }
        this.status = new Status();
    }

    async postStatus(status:Status) {
        return await this.service.updateStatusList(this.projeto.id, this.loggedUser.id, status)
    }

    async editStatusPut(){
        this.boolEditStatus = false
        this.booleanAddStatus = false
        await this.postStatus(this.status)
        this.status = new Status
    }


    getLabelsChart(chart : DashBoardCharts){
        let valueNames: string[][] = []
        if(chart.labels != null){
            chart.labels.forEach(chartFor => {
                valueNames.push(
                    [
                        chartFor.label
                    ]
                )
            })
            return valueNames
        }
        return ['Nada encontrado']
    }

    getValuesChart(chart : DashBoardCharts){
        
        let valueLabels: number[][] = []
        if(chart.labels != null){
            chart.labels.forEach(chart => {
              valueLabels.push(
                  [
                      chart.value
                  ]
              )
          })
          return valueLabels
        }
        return [0]
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


    @ViewChild('dashElement') dashElement!: ElementRef;
    @ViewChild('statusClose') statusClose!:ElementRef
    @ViewChild('addMember') addMember!:ElementRef
    @HostListener('click', ['$event'])
    outsideClick(event: any) {

        if (this.dashElement && !this.dashElement.nativeElement.contains(event.target)) {
            this.newDashVisibleBol = false;
        }

        if (this.addMember && !this.addMember.nativeElement.contains(event.target)) {
            this.openModalAddMembers = false;
        }

        if (this.statusClose && event.target.contains(this.statusClose.nativeElement)) {
            this.boolEditStatus = false;
            this.booleanAddStatus = false;
            this.status = new Status
        }
    }

    

    async deleteDashboard(dashboard : Dashboard){
        await this.service.deleteDashboard(dashboard.id,this.loggedUser.id)
        this.dashboards.splice(this.dashboards.indexOf(dashboard), 1)
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

    setViewEditBol(event:any){
        this.viewEditBol = event
    }

    chartsInitialize(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.charts.push(
            {
                id: 1,
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
                id: 2,
                type: 'doughnut',
                data : {
                    labels: ['A', 'B', 'C'],
                    datasets: [
                        {
                            label: 'Example name',
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
                type: 'pie',
                data : {
                    labels: ['A', 'B', 'C'],
                    datasets: [
                        {
                            label: 'First Dataset',
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

            // {
            //     id: 4,
            //     type: 'line',
            //     data : {
            //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //         datasets: [{
            //             label: 'Dataset 1',
            //             borderColor: '#42A5F5',
            //             borderWidth: 2,
            //             fill: false,
            //             data: [
            //                 50,
            //                 25,
            //                 12,
            //                 48,
            //                 56,
            //                 76,
            //                 42
            //             ]
            //         }]
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
        
        await this.service.updateChartList(dashboard.id, this.projeto.id, dashboard.charts)
        
    }
    

}
