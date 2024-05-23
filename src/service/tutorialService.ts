import { Injectable, OnInit } from '@angular/core';
import { JoyrideService, StepActionType } from 'ngx-joyride';
import { BackendEVOLVEService } from './backend-evolve.service';
import { JoyrideStepInfo } from 'ngx-joyride/lib/models/joyride-step-info.class';
import { SideBarComponent } from 'src/app/componentes/side-bar/side-bar.component';
import { NavegacaoComponent } from 'src/app/componentes/navegacao/navegacao.component';
import { CookiesService } from './cookies-service.service';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root',
})
export class TourService implements OnInit{
  constructor(private joyrideService: JoyrideService,
    private service : BackendEVOLVEService, private cookies_service : CookiesService
  ) {}

  private sideBarComponent!: NavegacaoComponent;

  registerSideBarComponent(component: NavegacaoComponent) {
    this.sideBarComponent = component;
  }

  loggedUser : User = new User ;
  teamId !: number ;

  async ngOnInit() {
    
  }

  async startTour() {
    this.loggedUser = await this.cookies_service.getLoggedUser();
    this.teamId = this.loggedUser?.teamRoles[0]?.teamId
    this.joyrideService
      .startTour({
        steps: [
          'step1@',
          'step2@equipe/0',
          'step3@equipe/0',
          `step4@tela-projeto/${this.teamId}`,
          `step5@criar-projeto/${this.teamId}`
        ], // Add all your steps here
        themeColor: '#34568B',
      })
      //.subscribe(
      //  (step: JoyrideStepInfo) => {
      //    this.onStepChange(step);
      //  });
  }

  //async onStepChange(step: JoyrideStepInfo) {

  //  if (step.name === 'step3' && step.actionType == StepActionType.NEXT) {
      
  //    console.log(this.teamId);
  //  }
  //  // Add more conditions for other steps if needed
  //}

  //private handleStep3Next() {
  //  this.sideBarComponent.openSideBar();
  //}
}
