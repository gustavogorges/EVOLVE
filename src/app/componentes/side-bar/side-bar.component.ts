import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { ColorService } from 'src/service/colorService';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {



  constructor(    private cookieService: CookiesService, private router: Router,  
    private colorService: ColorService, private elementRef: ElementRef
    ) { }
  
@Output() sideBar = new EventEmitter<boolean>();
loggedUser !: User
config = false

  async ngOnInit(): Promise<void> {
    
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    document.body.addEventListener('click', this.onDocumentClick);
    
  }

  closeSideBar(){
    this.sideBar.emit(false)
  }

  @ViewChild('sidebar') sidebarConfig !: ElementRef
  onDocumentClick = (event: MouseEvent) => {
    console.log(this.elementRef.nativeElement.contains(this.sidebarConfig));
    
    if (!this.elementRef.nativeElement.contains(event.target) && !this.elementRef.nativeElement.contains(this.sidebarConfig)) {
        this.sideBar.emit(false)
    }
  };

  goTelaTarefa( project : Project){
      this.router.navigate(['/tela-tarefa/'+project.id]);
      this.closeSideBar()

  }
  enterTeam = false
   openEnterTeam(){
    this.enterTeam = true;
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
    this.router.navigateByUrl('/tela-projeto/'+team.id);
  }
  goCreateTeam(){
    window.location.href = 'equipe/0'
    this.sideBar.emit(false)

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
  
    this.router.navigate(['/']);



  }
  goProjetos(){
    this.router.navigate(["/tela-projeto"])
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.onDocumentClick);
  }

}
