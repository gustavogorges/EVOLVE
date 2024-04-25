import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tela-reports',
  templateUrl: './tela-reports.component.html',
  styleUrls: ['./tela-reports.component.scss']
})
export class TelaReportsComponent implements OnInit{
  task !:Task
  loggedUser: User = new User;

  constructor(     private cookieService: CookiesService, private service : BackendEVOLVEService
    ) { }

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    this.task = this.loggedUser.createdTasks[0]
    this.task = await this.service.getOne("task", this.task.id); 

    console.log(this.task);
    

  }

  name = 'Angular';
  @ViewChild('content', { 'static': true }) content!:ElementRef;
 
  //  generarPDF() {
 
  //    const div = document.getElementById('content');
  //    const options = {
  //      background: 'white',
  //      scale: 1
  //    };
  //    if(div!=null){
  //     html2canvas(div, options).then((canvas) => {
 
  //       var img = canvas.toDataURL("image/PNG");
  //       let doc = new jsPDF('l', 'mm', 'a4' , false);
  
  //       // Add image Canvas to PDF
  //       const bufferX = 15;
  //       const bufferY = 15;
  //       const imgProps = (<any>doc).getImageProperties(img);
  //       const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       console.log(pdfHeight);
        
  //       doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  
  //       return doc;
  //     }).then((doc) => {
  //       doc.save('postres.pdf');  
  //     });
  //    }
    
  //  }
  generatePdf(): void {
    const historicContent: Content [] = [];

    this.task.historic.forEach((item, index) => {
      historicContent.push(
        { text: `Histórico da tarefa: ${this.task.name}`, style: 'header' },
        { text: `Data: ${item.dateTime}`, margin: [0, 10, 0, 0] }, // Ajuste as margens conforme necessário
        { text: `Descrição: ${item.description}` }
      );

      // Adiciona quebra de página após cada item, exceto o último
      if (index < this.task.historic.length - 1) {
        historicContent.push({ text: '', pageBreak: 'after' });
      }
    });

    const docDefinition: TDocumentDefinitions = {
      content: historicContent,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20] // top, right, bottom, left
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}



  

