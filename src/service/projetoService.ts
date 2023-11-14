import { Injectable } from "@angular/core";
import { ProjetoComponent } from "src/app/componentes/projeto/projeto.component";

@Injectable({
    providedIn:'root',
})

export class projetoService {

    revela: boolean = false
  
    getRevela(): any {
      return this.revela;
    }
  
    setRevela(valor: boolean): void {
      this.revela = valor;
    }
}