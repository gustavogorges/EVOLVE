import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, filter } from 'rxjs';
import { Comment } from 'src/model/comment';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-comments-project',
  templateUrl: './comments-project.component.html',
  styleUrls: ['./comments-project.component.scss']
})
export class CommentsProjectComponent implements OnInit {

  loggedUser : User = new User;

  comment : Comment = new Comment;

  comments : Array<Comment> = new Array;

  booleanAddComment : boolean = false;

  projectObservable !: Observable<Project>;

  @Input()
  project !: Project;

  constructor(
    private service:BackendEVOLVEService,
    private cookies_service : CookiesService
  ) { }

  async ngOnInit(): Promise<void> {
    // this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user});

  }

  verifyCommentOwner(comment : Comment) : boolean {
    if(comment.user.id == this.loggedUser.id) {
      return true;
    } else {
      return false;
    }
  }

  async deleteComment(comment : Comment) {
    this.comments = await this.service.deleteCommentProject(this.project.id,comment.id, 1);
  }

  addCommentInput() : void {
    this.booleanAddComment = true;
  }

  verifyImage(user: User){
    // if(this.user.image){
    //   return false
    // } else if(this.user.imageColor){
    //   return true
    // }
    // return true
    if(user.image != null){
      if(user.image.data != null){
        return false
      }
    }
    return true
  }

  cancelComment(){
    this.booleanAddComment = false
  }

  async addCommentValue() : Promise<void> {
    // Function to get hours and functions
    console.log(this.comment.value);
    
    if(this.comment.value != ''){
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
      // find a way of getting this values
      newComment.timeHour = hours + ":" + minutes;
      newComment.timeDayAndMonth = day + "/" +"0"+month;

      let postComment:any = newComment
      postComment.user = {"id":1}
      console.log(postComment);
      
      await this.service.patchNewCommentProject(this.project.id, postComment, 1)
      let listComments = await this.service.getAllCommentsOfProject(this.project.id)
      this.project.comments = this.sortCommentsByTime(listComments)

      this.booleanAddComment = false;
    }
  }

  sortCommentsByTime(list : any[]): any[] {
    return list.sort((a, b) => {
      const dateA = new Date(`${a.timeDayAndMonth} ${a.timeHour}`);
      const dateB = new Date(`${b.timeDayAndMonth} ${b.timeHour}`);
      if (dateA > dateB) return -1; 
      if (dateA < dateB) return 1;
      const timeA = new Date(`2000-01-01 ${a.timeHour}`);
      const timeB = new Date(`2000-01-01 ${b.timeHour}`);
      return timeA.getTime() - timeB.getTime();
    });
  }
  

}
