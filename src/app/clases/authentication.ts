import { TOKEN_KEY } from "../utils/constants"

export class Authentication{
    token: string
    constructor(token: string){
        this.token = token
    }
    setNuevoToken(): void{
        localStorage.removeItem(TOKEN_KEY)
        localStorage.setItem(TOKEN_KEY, this.token)
    }
}