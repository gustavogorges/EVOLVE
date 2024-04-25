import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tela-reports',
  templateUrl: './tela-reports.component.html',
  styleUrls: ['./tela-reports.component.scss']
})
export class TelaReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  name = 'Angular';

  @ViewChild('content', { 'static': true }) content!:ElementRef;
 
   generarPDF() {
 
     const div = document.getElementById('content');
     const options = {
       background: 'white',
       scale: 3
     };
     if(div!=null){
      html2canvas(div, options).then((canvas) => {
 
        var img = canvas.toDataURL("image/PNG");
        var doc = new jsPDF('l', 'mm', 'a4' );
  
        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        console.log(pdfHeight);
        
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  
        return doc;
      }).then((doc) => {
        doc.save('postres.pdf');  
      });
     }
    
   }

}
