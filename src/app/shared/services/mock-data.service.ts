import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from '../../shared/models/user';


const Users:Array<User> = [
  {id:1,fname:"The great pini",lname:'re',conanNum:'f',mokdanNum:'fd',phoneNumber:14545645,permissions:{id:1,value:'cfgfg'}},
  {id:1,fname:"Pini's wife ;(",lname:'re',conanNum:'f',mokdanNum:'fd',phoneNumber:45456456,permissions:{id:1,value:'cfgfg'}},
  {id:2,fname:"ID ;)",lname:'re',conanNum:'f',mokdanNum:'fd',phoneNumber:15615165,permissions:{id:1,value:'cfgfg'}},
  {id:1,fname:"Meni",lname:'re',conanNum:'f',mokdanNum:'fd',phoneNumber:156564565,permissions:{id:1,value:'cfgfg'}},
  {id:1,fname:"miri",lname:'vdfgfd',conanNum:'f',mokdanNum:'fd',phoneNumber:489489789,permissions:{id:1,value:'cfgfg'}} ];


@Injectable({
    providedIn: 'root'
})
  
export class MockDataService {

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(Users);
  }
  
}
