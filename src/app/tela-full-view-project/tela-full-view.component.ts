import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { UserProject } from 'src/model/userProject';
import { Task } from 'src/model/task';
@Component({
    selector: 'app-tela-full-view',
    templateUrl: './tela-full-view.component.html',
    styleUrls: ['./tela-full-view.component.scss'],
})
export class TelaFullViewComponent implements OnInit {

    projeto !: Project
    basicData: any
    basicOptions !: any
    options: any
    data: any
    status: Status = new Status();
    charts: any[] = []
    newDashVisibleBol: Boolean = false
    dashboards: any[] = []
    newChartBool: boolean = false
    viewOptionsBol: boolean = true
    viewEditBol: Boolean = false
    openMemberView: number | undefined
    unlockAllMembersView = false;
    statusNames: any[] = []
    statusValues: any[] = []
    chartstoDash: Array<DashBoardCharts> = new Array
    boolEditStatus: boolean = false;
    booleanAddStatus: boolean = false;
    closeAllOptions: boolean = false
    dashboardEdit !: Dashboard

    editProject: boolean = false
    miniPageView: string = 'Dashboards'
    confirmationActionModalBol: boolean = false
    response: any
    quest: any
    searchTerm: any = ''
    nameEdit: boolean = false
    nameEdited: string = ''
    descEdited: string = ''
    preImage: SafeUrl | undefined = '';
    imagemBlob!: Blob
    formData : any = null
    openModalAddMembers: boolean = false
    loggedUser: User = new User;
    userProject !: UserProject;
    hasPermission : boolean = false;
    openSmMoreViewBoolean = this.resizeWindow()
    constructor(private service: BackendEVOLVEService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private cookies_service: CookiesService) { }

    openSmMoreView(){
        this.openSmMoreViewBoolean = !this.openSmMoreViewBoolean
    }

    async ngOnInit() {
        
        this.loggedUser = await this.cookies_service.getLoggedUser();
        this.route.paramMap.subscribe(async params => {
            const projectId = params.get('projectId');
            const id = Number(projectId)
            this.projeto = await this.service.getOne('project', id);
            this.dashboards = await this.service.getDashboards(this.projeto.id);
            this.userProject = this.projeto.members.find(element => element.user.id == this.loggedUser.id) as UserProject;
            
            if(this.userProject.role.name != "PROJECT_VIEWER" &&
                this.userProject.role.name != "PROJECT_COLABORATOR"
            ) {
                
                this.hasPermission = true;
            }

            setTimeout(() => {
                this.translateStatus()
            });
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

    viewOptions() {
        this.viewOptionsBol = !this.viewOptionsBol
        this.viewEditBol = false

    }



    tarefaSelecionada : Task = new Task();
    booleanTask : boolean = false;

    setTaskOfModal(task : Task) {
        this.tarefaSelecionada = task;
        this.booleanTask = true;
    }

    closeTask(test : boolean) {
        this.booleanTask = false;
    }

    async setImageProject(event:any){
        if(event.target.files && event.target.files[0]){
          if(event.target.files[0].type === "image/jpeg" 
          || event.target.files[0].type === "image/webp" 
          || event.target.files[0].type === "image/png"){
            this.imagemBlob = event.target.files[0]
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            this.formData = formData;
            const blob = new Blob([event.target.files[0]], { type: event.target.files[0].type });
    
            const imageUrl = URL.createObjectURL(blob);
            this.preImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
          }
        }
    }

    translateStatus() {
        const lang = localStorage.getItem('lang');
        if (lang === 'ch') {
            this.projeto.statusList.forEach((status) => {
                if (status.name === 'pendente' || status.name === 'pendiente' || status.name === 'pending') {
                    status.name = '待定';
                } else if (status.name === 'em progresso' || status.name === 'en progreso' || status.name === 'in progress') {
                    status.name = '进展中';
                } else if (status.name === 'concluido' || status.name === 'completado' || status.name === 'completed') {
                    status.name = '已完成';
                } else if (status.name === 'não atribuido' || status.name === 'no asignado' || status.name === 'unassigned') {
                    status.name = '未分配';
                }
            });
        } else if (lang === 'pt') {
            this.projeto.statusList.forEach((status) => {
                if (status.name === '待定' || status.name === 'pendiente' || status.name === 'pending') {
                    status.name = 'pendente';
                } else if (status.name === '进展中' || status.name === 'en progreso' || status.name === 'in progress') {
                    status.name = 'em progresso';
                } else if (status.name === '已完成' || status.name === 'completado' || status.name === 'completed') {
                    status.name = 'concluido';
                } else if (status.name === '未分配' || status.name === 'no asignado' || status.name === 'unassigned') {
                    status.name = 'não atribuido';
                }
            });
        } else if (lang === 'es') {
            this.projeto.statusList.forEach((status) => {
                if (status.name === '待定' || status.name === 'pendente' || status.name === 'pending') {
                    status.name = 'pendiente';
                } else if (status.name === '进展中' || status.name === 'em progresso' || status.name === 'in progress') {
                    status.name = 'en progreso';
                } else if (status.name === '已完成' || status.name === 'concluido' || status.name === 'completed') {
                    status.name = 'completado';
                } else if (status.name === '未分配' || status.name === 'não atribuido' || status.name === 'unassigned') {
                    status.name = 'no asignado';
                }
            });
        } else if (lang === 'en') {
            this.projeto.statusList.forEach((status) => {
                if (status.name === '待定' || status.name === 'pendente' || status.name === 'pendiente') {
                    status.name = 'pending';
                } else if (status.name === '进展中' || status.name === 'em progresso' || status.name === 'en progreso') {
                    status.name = 'in progress';
                } else if (status.name === '已完成' || status.name === 'concluido' || status.name === 'completado') {
                    status.name = 'completed';
                } else if (status.name === '未分配' || status.name === 'não atribuido' || status.name === 'no asignado') {
                    status.name = 'unassigned';
                }
            });
        }
    }

    setModalOpenAddMembers() {
        this.openModalAddMembers = !this.openModalAddMembers
    }

    setModalOpenAddMembersFalse() {
        this.openModalAddMembers = false
    }



    editProjectFun() {
        this.nameEdited = this.projeto.name
        this.descEdited = this.projeto.description
        this.nameEdit = !this.nameEdit
    }

    async saveProject(){
        setTimeout( async () => {
            if(this.descEdited != this.projeto.description){              
                this.projeto = 
                await this.service.patchProjectDescription(this.projeto.id, this.descEdited)
            }
        }, 50)
        setTimeout( async () => {
            if(this.nameEdited != this.projeto.name ){
                
                this.projeto = await this.service.patchProjectName(this.projeto.id, this.nameEdited)
            }
        }, 100)
        setTimeout( async () => {
            if(this.formData){                       
                await this.service.patchProjectImage(this.projeto.id, this.formData)
                // this.formData = null
            }
        }, 150)
        setTimeout( async () => {
            this.nameEdit = false
        }, 200)
    }

    filteredNames() {
        this.moveCreatorToTop(this.projeto.members)
        return this.projeto?.members?.filter(element => element?.user?.email?.toLowerCase()?.startsWith(this.searchTerm.toLowerCase()) || element?.user?.name?.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
    }

    moveCreatorToTop(members: any[]): any[] {
        const translations:any = {
            en: 'Creator',
            es: 'Creador',
            ch: '创建者',
            pt: 'Criador'
        };
    
        // Obtém a linguagem do LocalStorage
        const lang = localStorage.getItem('lang') || 'pt'; // Por padrão, use 'pt' se não houver linguagem definida
    
        const creatorRole = translations[lang];
    
        const creatorIndex = members.findIndex(member => member.user.currentRole === creatorRole);
    
        if (creatorIndex !== -1) {
            const creatorMember = members.splice(creatorIndex, 1)[0];
            
            members.unshift(creatorMember);
        }
    
        return members;
    }

    setResponse(event: any) {
        this.response = event
        this.confirmationActionModalBol = false
    }

    setMiniPageView(value: string) {
        this.miniPageView = value
    }

    viewEdit() {
        this.viewEditBol = !this.viewEditBol
        this.newChartBool = false
        this.newDashVisibleBol = false
    }

    async chartToTrash(dashboard: any, chart: any) {
        await this.service.deleteChart(dashboard.id, chart.id, this.projeto.id)
        dashboard.charts.splice(dashboard.charts.indexOf(chart), 1)
    }

    setdashboardEdit(event: any) {
        this.dashboardEdit = event
    }

    getResponse() {
        return this.response
    }

    setQuest(event: any) {
        this.quest = event
        this.response = undefined
        this.confirmationActionModalBol = true
    }


    verifyStatusDefault(status: Status) {
        if (
            status.name === 'não atribuido' || status.name === 'no asignado' || status.name === 'unassigned' || status.name === '未分配' ||
            status.name === 'concluido' || status.name === 'completado' || status.name === 'completed' || status.name === '已完成' ||
            status.name === 'pendente' || status.name === 'pendiente' || status.name === 'pending' || status.name === '待定' ||
            status.name === 'em progresso' || status.name === 'en progreso' || status.name === 'in progress' || status.name === '进展中'
        ) {
            return true;
        }else{
            return false
        }
    }

    @HostListener('window:resize', ['$event'])
    resizeWindow(){
        if(window.innerWidth > 1024){
            this.openSmMoreViewBoolean = true
            return true
        }
        this.openSmMoreViewBoolean = false
        return false
    }

    editStatus(status: Status) {
        this.status = status
        this.boolEditStatus = true
        this.booleanAddStatus = false
    }

    async enableStatus(status: Status) {
        status.enabled = !status.enabled
        this.projeto = await this.service.updateStatusList(this.projeto.id, this.loggedUser.id, this.projeto.statusList)
    }

    organizeStatus() {
        const statusPadroes = ['não atribuido', 'concluido', 'pendente', 'em progresso'];
        let statusPadraoPrioritario: any[] = [];
        let outrosStatus: any[] = [];
    
        this.projeto?.statusList?.forEach(status => {
            if (statusPadroes.includes(status.name)) {
                statusPadraoPrioritario.push(status);
            } else {
                outrosStatus.push(status);
            }
        });

        return statusPadraoPrioritario.concat(outrosStatus);
    }


    goToPerfilMember(member: User) {
        this.router.navigateByUrl('/tela-perfil/' + member.id);
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
                            this.getValuesChart(chart);

                            let updatedMatchingChart = { ...matchingChart, id: chart.id, data: { labels: this.getLabelsChart(chart), datasets: [{ label: chart.label, data: this.getValuesChart(chart), }] } };

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
            this.projeto.statusList.splice(this.projeto.statusList.indexOf(status), 1)
            await this.service.updateStatusList(this.projeto.id, this.loggedUser.id, this.projeto.statusList)
        //   this.projeto = await this.service.deleteStatus(this.projeto.id, status.id)
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
        if (this.status.name != '') {
            if (this.status.backgroundColor === '') {
                this.status.backgroundColor = "#ff0000"
            }
            this.status.backgroundColor.toUpperCase();

            if (!this.isContrastSufficient('#000000', this.status.backgroundColor)) {
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
        this.projeto.statusList.push(status)
        return await this.service.updateStatusList(this.projeto.id, this.loggedUser.id, this.projeto.statusList)
    }

    async editStatusPut() {
        this.boolEditStatus = false
        this.booleanAddStatus = false
        this.status = new Status
        await this.service.updateStatusList(this.projeto.id, this.loggedUser.id, this.projeto.statusList)
    }


    getLabelsChart(chart: DashBoardCharts) {
        let valueNames: string[][] = []
        if (chart.labels != null) {
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

    getValuesChart(chart: DashBoardCharts) {

        let valueLabels: number[][] = []
        if (chart.labels != null) {
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


    openMember(index: number) {
        if (this.openMemberView != undefined) {
            if (this.openMemberView === index) {
                this.closeMember()
            } else {
                this.openMemberView = index
            }
        }
        else {
            this.openMemberView = index
        }
    }

    blockMember() {
        if (!this.unlockAllMembersView) {
            return 4;
        } else {
            return 999999999;
        }
    }

    unlockMembersView() {
        this.unlockAllMembersView = !this.unlockAllMembersView
    }

    closeMember() {
        this.openMemberView = undefined
    }

    ngOnDestroy() {
        localStorage.removeItem("project-view")
    }

    newDashVisible() {
        this.newDashVisibleBol = !this.newDashVisibleBol
        this.newChartBool = false
        this.viewEditBol = false
    }

    newChartVisible() {
        this.newChartBool = !this.newChartBool
        this.newDashVisibleBol = false
        this.viewEditBol = false
    }


    @ViewChild('dashElement') dashElement!: ElementRef;
    @ViewChild('statusClose') statusClose!: ElementRef
    @ViewChild('addMember') addMember!: ElementRef
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



    async deleteDashboard(dashboard: Dashboard) {
        await this.service.deleteDashboard(this.projeto.id, dashboard.id, this.loggedUser.id)
        this.dashboards.splice(this.dashboards.indexOf(dashboard), 1)
    }


    createNewDashBoard(dash: any) {
        this.dashboards.push(dash)
        this.newDashVisibleBol = false
        this.dashboards = this.dashboards.reverse()
    }

    getIdStatusCharts(): number {
        let numForReturn: number = 0
        this.projeto.charts.forEach(element => {
            if (element.label === "Status das tarefas") {
                numForReturn = element.id
            }
        });
        return numForReturn
    }

    setViewEditBol(event: any) {
        this.viewEditBol = event
    }

    chartsInitialize() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.charts.push(
            {
                id: 1,
                type: 'bar',
                data: {
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

                options: {
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
                data: {
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

                options: {
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
                data: {
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

                options: {
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

    async drop(event: CdkDragDrop<string[]>, dashboard: any) {
        if (dashboard.charts.length >= 2) {
            this.newDashVisibleBol = false
            moveItemInArray(dashboard.charts, event.previousIndex, event.currentIndex);
        }

        dashboard.charts.forEach((element: any, index: number) => {
            element.chartIndex = dashboard.charts.indexOf(element)
        });

        await this.service.updateChartList(dashboard.id, this.projeto.id, dashboard.charts)

    }


}
