import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { formToJSON } from 'axios';
import { UserChat } from 'src/model/userChat';
import { Chat } from 'src/model/chat';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})
export class TelaPerfilComponent implements OnInit {
  constructor(
    private cookieService: CookiesService,
    private service: BackendEVOLVEService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute ,
    private sanitizer: DomSanitizer
  ) {}

  @Input()
  user!: User;
  loggedUser!: User;
  teamUsers: Array<any> = new Array;
  teamShowing!: Team;

  data: any;
  userData !:User|null
  logged = false
  imagemBlob: any;
  preImage: any;
  formData: any;

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe( async params  => {
      // Obtém o parâmetro do projeto da rota
      const projectId = params.get('userId');
      const id  = Number(projectId)
      this.user = await this.service.getOne('user', id);
      this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
      if(this.loggedUser.id!=this.user.id){
        this.logged=false
      }else{
        this.logged=true;
      }
      await this.teste()

      this.changeTeam(this.user?.teamRoles[0].team);

    });
    

  }
  async teste() {
    
    let users: any = [];
    console.log(this.user.teamRoles);
  
    this.user.teamRoles.forEach((team) => {
      team.team?.participants?.forEach(async participant => 
        {
          console.log("entroy aqui");
          
          if(participant.userId != this.user.id ) {
            console.log("teste111");
          if(participant.user.socialLogin == true){
            console.log(participant.user);

            participant.user = await this.service.getOne("user", participant.user.id)
            console.log(participant.user);
            
          }
            this.teamUsers.push(participant);
          }
        }
        
      
          // participant.userId != this.user.id && !users.includes(participant)
      );
    });
    console.log(this.teamUsers);

  }
  config = false
  openConfig(){
      if(this.disabledInfo==false){
        this.disabledInfo= true
        
  this.edit_confirm = "editar perfil"
  this.config_cancel = "Configurações"
      }  else{
        this.config=true

      }
   // this.closeSideBar()
    
  }
  closeConfig(){
    this.config=false
  }
  getUserStyles(user: any): any {
    let styles: any = {};

    if (user.image != null) {
      styles['background'] = user.image.data;
    }
    styles['background-color'] = user.imageColor;

    return styles;
  }
  changeTeam(team: Team) {

    this.teamShowing = team;
  }
  sendEmail(){
    const destinatario = this.user.email;
    const assunto = '';
    const corpo = '';
  
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destinatario)}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  
    window.open(gmailLink, '_blank');
  }
  async goToChat(){
    let foundChat:UserChat = this.loggedUser.chats.find(chat => chat.users.find(user => user.id == this.user.id))!
    this.cookieService.set(this.cookieService.chatListTypeField, "users")
    if(foundChat  != (null||undefined)){
      this.cookieService.set("lastChatId", foundChat.id)
    } else {
      let userchat: any = new UserChat
      userchat.users = [{"id": this.loggedUser.id},{"id":this.user.id}]
      let chat: Chat = await this.service.postUserChat(userchat)
      this.cookieService.set("lastChatId", chat.id)
    }
    this.router.navigate(['/tela-chat']);

  }
  disabledInfo = true
  email !:string

  name !:string
  edit_confirm = "editar perfil"
  config_cancel = "Configurações"
  editInfo(){
    if(this.disabledInfo==false){
      this.disabledInfo= true
      
      this.edit_confirm = "editar perfil"
      this.config_cancel="Configurações"  
      if(this.email){
        this.putEmail(); 

      }
      if(this.name){
        this.putName();
      }
      
    }else{  
      this.disabledInfo=false
      this.edit_confirm = "confirmar"
      this.config_cancel="Cancelar"
     
    
    }


    
  }
  putName(){
    this.loggedUser.name =this.name;

      this.service.patchUserName(this.loggedUser.id, this.loggedUser.name)
      this.disabledInfo=true


  
  }
  putEmail(){
    this.loggedUser.email =this.email;
    if (this.validarEmail(this.email)) {
      this.service.patchUserEmail(this.loggedUser.id, this.loggedUser.email)
      this.disabledInfo=true


  } else {
    alert("email inválido")
    this.email=this.loggedUser.email
    }
  }
  
  validarEmail(email: string) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(email);
}
async setImage(event:any){
  if(event.target.files && event.target.files[0]){
    if(event.target.files[0].type === "image/jpeg" 
    || event.target.files[0].type === "image/webp" 
    || event.target.files[0].type === "image/png"){
      this.imagemBlob = event.target.files[0]
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      this.formData = formData;
      const blob = new Blob([event.target.files[0]], { type: event.target.files[0].type });

      const imageUrl = URL.createObjectURL(blob);
      this.preImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      
      await this.service.patchImageUser(this.user.id, this.formData)   
      this.user = await this.service.getOne("user",this.user.id)   
    }
  }
}
async goToUser(member : User){
  this.router.navigate(['/tela-perfil/'+member.id]);
  this.user = await this.service.getOne("user",member.id)   

}

}
