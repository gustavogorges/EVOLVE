import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { hasPermission, hasPermissionProject } from 'src/app/shared/check-permissions';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { UserProject } from 'src/model/userProject';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { ColorService } from 'src/service/colorService';
import { CookiesService } from 'src/service/cookies-service.service';
import { SideBarService } from 'src/service/sideBarService';
import { TourService } from 'src/service/tutorialService';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {



  constructor(    private cookieService: CookiesService, private router: Router,  
                   
    private colorService: ColorService, private elementRef: ElementRef, private a : CookieService,
    private tutorialService:TourService, private sideBarService:SideBarService, private backEndService :BackendEVOLVEService

    ) { }
  
@Output() sideBar = new EventEmitter<boolean>();
loggedUser !: User
config = false
projects:Project[]=[]

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    document.body.addEventListener('click', this.onDocumentClick);
    this.projects = await this.backEndService.getProjectsByUserId(this.loggedUser.id)
  }

  closeSideBar(){
    this.sideBar.emit(false)
  }

  @ViewChild('sidebar') sidebarConfig !: ElementRef
  onDocumentClick = (event: MouseEvent) => {
    
    if (!this.elementRef.nativeElement.contains(event.target) && !this.elementRef.nativeElement.contains(this.sidebarConfig)) {
        this.sideBar.emit(false)
    }
  }
  hasPermission(team: Team){
   return hasPermission(this.loggedUser.id, team, 'CREATE_PROJECT' );
  }

  hasPermissionProject(project :any):boolean{
    let result:boolean = this.projects.map(e => e.id).includes(project.id);
    return result
  }

  goTelaTarefa( project : Project){
      this.router.navigate(['/tela-tarefa/'+project.id]);
      this.closeSideBar()

  }
  enterTeam = false
   openEnterTeam(){
    this.enterTeam = !this.enterTeam;
   }

  openConfig(){
    this.config=true
 
  }

  closeConfig(){
    this.config=false
  }

  goCreateProject(team:Team){
    this.router.navigateByUrl('/criar-projeto/'+team.id);
  }

  goTelaProject(project: Project) {
    this.router.navigateByUrl('/view-project/'+project.id);
  }

  goProjectsTeam(team:Team){
    window.location.href = '/equipe/'+team.id
  }
  goCreateTeam(){
    window.location.href = 'equipe/0'
    this.sideBar.emit(false)

  }

  startTour(){
    this.tutorialService.startTour();
  }

  goTelaInicial(){
    this.router.navigateByUrl('/tela-inicial');

  }
  sliderValue = 16 
  logOut(){
    this.closeSideBar()
    this.colorService.setPrimaryColor("#185e77")
    this.colorService.setSecondaryColor("#4C956C")
    this.colorService.setPrimaryDarkColor("#67BFE0")
    this.colorService.setSecondaryDarkColor("#86C19F")
    document.documentElement.style.setProperty('--font-size-base', ''+this.sliderValue+'px');
    document.documentElement.style.setProperty('--font-size-sm', ''+(this.sliderValue-2)+'px');
    document.documentElement.style.setProperty('--font-size-lg', ''+(this.sliderValue+2)+'px');
    document.documentElement.style.setProperty('--font-size-xl', ''+(this.sliderValue+4)+'px');
    document.documentElement.style.setProperty('--font-size-2xl', ''+(this.sliderValue+8)+'px');
    document.documentElement.style.setProperty('--font-size-3xl', ''+(this.sliderValue+14)+'px');

    this.cookieService.deleteAll()
    setTimeout(async () =>{
      this.a.deleteAll()
     }, 50)

    this.router.navigate(['/login']);

  }
  goProjetos(){
    this.router.navigate(["/tela-projeto"])
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.onDocumentClick);
  }

}
