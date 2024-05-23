import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { File } from 'src/model/file';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosComponent implements OnInit {

  constructor(private service:BackendEVOLVEService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.task.files.forEach(file => {
      this.setUrl(file);
      console.log(file);
      
    });
  }


  @Input()
  task : Task = new Task;

  @Input()
  loggedUser : User = new User;

  async onFileSelected(event : any) {

    const file:File = event.target.files[0];
 
    if (file) {
      this.task = await this.service.patchTaskFile(this.task.id,this.loggedUser.id,file);
    }

  }

  verifyApprovament() :boolean {
    if(this.task.concluded == true || this.task.currentStatus.name == "Concluído"){
      return true
    }
   return false;
  }

  setUrl(taskFile : File): void {
    const byteCharacters = atob(taskFile.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);
    taskFile.url = this.sanitizer.bypassSecurityTrustUrl(url);


  }

  removeTaskFile(file:File): void {
    this.task.files = this.task.files.filter(f => f.id !== file.id);
    console.log(file);
    this.service.deleteTaskFile(this.task.id,file.id,this.loggedUser.id);
  }


}
