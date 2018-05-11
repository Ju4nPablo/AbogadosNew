import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notification:any=['a'];
  status:boolean=false;
  constructor() { }

  ngOnInit() {
    if(this.notification.length>0){
  
    }

  }

}
