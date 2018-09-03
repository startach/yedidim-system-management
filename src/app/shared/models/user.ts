import {UserRoles} from'./userRoles'

export interface User{
    id:number,
    fname:string,
    lname:string,
    conanNum:string,
    mokdanNum:string,
    phoneNumber:number,
    permissions:UserRoles

}