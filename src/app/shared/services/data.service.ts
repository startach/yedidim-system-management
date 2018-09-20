import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { volunteer } from '../models/volunteer';

@Injectable()
export class DataService {

  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: any) {
    this.userSource.next(user)
  }

}