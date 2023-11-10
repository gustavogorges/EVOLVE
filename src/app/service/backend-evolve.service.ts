  import { Injectable } from '@angular/core';
  import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BackendEVOLVEService {
  URL : string = "http://10.4.96.2:8087/"

  constructor() { }

  async getAllSomething(caminho : string){
    let reponse = await axios.get(this.URL+caminho)
    return reponse.data; 
  }
  async getOne(caminho : string, id:number){
    let reponse = await axios.get(this.URL+caminho + "/"+id)
    return reponse.data; 
  }
}
