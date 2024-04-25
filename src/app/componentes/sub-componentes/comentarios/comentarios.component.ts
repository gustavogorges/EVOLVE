import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Comment } from 'src/model/comment';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {

  loggedUser : User = new User;

  comment : Comment = new Comment;

  comments : Array<Comment> = new Array;

  booleanAddComment : boolean = false;

  @Input()
  task : Task = new Task;

  constructor(
    private service:BackendEVOLVEService,
    private cookies_service : CookiesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user});
    this.comments = this.task.comments;
    console.log(this.comments);
    
  }

  verifyCommentOwner(comment : Comment) : boolean {
    if(comment.user.id == this.loggedUser.id) {
      return true;
    } else {
      return false;
    }
  }

  async deleteComment(comment : Comment) {
    this.comments = await this.service.deleteComment(this.task.id,comment.id,this.loggedUser.id);
  }

  addCommentInput() : void {
    this.booleanAddComment = true;
  }

  async addCommentValue() : Promise<void> {
    // Function to get hours and functions
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Function to get day and month
    const date2 = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    let newComment : Comment = new Comment;
    newComment.value = this.comment.value;
    newComment.user = this.loggedUser;
    newComment.task = this.task;
    // find a way of getting this values
    newComment.timeHour = hours + ":" + minutes;
    newComment.timeDayAndMonth = "0"+day + "/" +"0"+month;

    let postComment:any = newComment
    postComment.user = {"id":newComment.user.id}


    this.service.patchNewComment(postComment.task.id,postComment,this.loggedUser.id);
    
    const taskUpdated : Task = await this.service.getOne("task",postComment.task.id);
    
    this.task = taskUpdated;

    this.comments = this.task.comments;

    this.booleanAddComment = false;
  }

}
