import { Injectable } from '@angular/core';
import { LogarithmicScale } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  setPrimaryColor(color: string): void {
    console.log(color);
    
    
    document.documentElement.style.setProperty('--main-color', color);
  }
  setSecondaryColor(color: string): void {
    console.log(color);
    
    document.documentElement.style.setProperty('--secondary-color', color);
  }
  setPrimaryDarkColor(color: string): void {
    console.log(color);
    
    
    document.documentElement.style.setProperty('--main-dark-color', color);
  }
  setSecondaryDarkColor(color: string): void {
    console.log(color);
    
    document.documentElement.style.setProperty('--secondary-dark-color', color);
  }
}