import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(private af: AngularFireDatabase) {
   this.items = this.af.list('/phones').valueChanges();
   
  }
  title = 'ידידים - מערכת ניהול';
}
