// side-bar.service.ts
import { Injectable } from '@angular/core';
import { SideBarComponent } from 'src/app/componentes/side-bar/side-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
    private sideBarComponent!: SideBarComponent;

  registerSideBarComponent(component: SideBarComponent) {
    this.sideBarComponent = component;
  }
  // Add your shared logic here
}