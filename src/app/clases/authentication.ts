import { CookieService } from "ngx-cookie-service";

export class Authentication{
    token: string
    constructor(token: string){
        this.token = token
    }
    setNuevoToken(cookieService: CookieService): void{
        cookieService.deleteAll()
        cookieService.set("token", this.token)
    }
}