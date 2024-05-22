import { SafeUrl } from "@angular/platform-browser"

export class File {
    id!:number
    name:string=""
    type:string = ""
    data:string = ""
    url:SafeUrl =""
}