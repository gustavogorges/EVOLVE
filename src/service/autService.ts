import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/model/user";
import { CookiesService } from "./cookies-service.service";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http:HttpClient, private cookies :CookiesService){}
    proceedLogin(usercred: any){
        return this.http.post("localhost:8087/auth/login", usercred)
    }
    isLoggedIn(){
        return this.cookies.getJWTtoken()!=null;
    }
}