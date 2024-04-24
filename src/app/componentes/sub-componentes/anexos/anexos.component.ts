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
      this.task = await this.service.patchTaskFile(this.task.id,this.loggedUser.id,file);
      const taskFile : TaskFile = this.task.files[this.task.files.length - 1];
      this.setUrl(taskFile);
    }
  }

  setUrl(taskFile : TaskFile): void {
    const byteCharacters = atob(taskFile.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    this.url = window.URL.createObjectURL(blob);
    console.log(this.url);
    
  }

  removeTaskFile(file:TaskFile): void {
    this.task.files = this.task.files.filter(f => f.id !== file.id);
    console.log(file);
    this.service.deleteTaskFile(this.task.id,file.id,this.loggedUser.id);
  }

  downloadFile(index:number) {
    this.urls[index] = this.url;
    window.open(this.url);
  }

}
