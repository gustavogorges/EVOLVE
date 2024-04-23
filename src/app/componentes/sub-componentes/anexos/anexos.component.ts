import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { TaskFile } from 'src/model/file';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosComponent implements OnInit {

  constructor(private service:BackendEVOLVEService) { }

  ngOnInit(): void {
    this.setUrls(this.task.files);
  }


  @Input()
  task : Task = new Task;

  @Input()
  loggedUser : User = new User;

  urls : Array<any> = new Array();
  url : string = "";

  async onFileSelected(event : any) {

    const file:File = event.target.files[0];
 
    if (file) {
      console.log(file);

      this.task = await this.service.patchTaskFile(this.task.id,this.loggedUser.id,file);

      console.log(this.task);
      console.log(this.task.files);
      
    }
  }

  setUrls(files : Array<TaskFile>): void {
    console.log("teste");
    
    files.forEach((file) => {

    const byteCharacters = atob(file.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    file.url = window.URL.createObjectURL(blob);
    console.log(file.url);
    
    });
}

  downloadFile(index:number) {
    this.urls[index] = this.url;
    window.open(this.url);
  }

  a(file: any): void {
    console.log(file.url);
    
  }

}
