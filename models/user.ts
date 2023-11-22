export class Admin{
    mail:string;
    superAdmin:boolean

    constructor(InNombre:string,superAdmin:boolean){ 
        this.mail=InNombre ;this.superAdmin=superAdmin;
    }
}