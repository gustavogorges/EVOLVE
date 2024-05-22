import { Component, Input, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {

  @Input()
  task : Task = new Task;

  @Input()
  loggedUser : User = new User;

  constructor(private service : BackendEVOLVEService) { }

  ngOnInit(): void {
    this.content = this.task.notes;
  }

  saveContent() {
    this.task.notes = this.content;
    this.service.setTaskNotes(this.task.id,this.task.notes);
  }

  public Editor = ClassicEditor;
  public content: string = '';  // This will hold the document content

  public editorConfig = {
    height: '90vh',  // Adjust the height as needed
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
      'undo', 'redo'
    ],
  };

}
