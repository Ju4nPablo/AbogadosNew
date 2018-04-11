import { Component, OnInit } from '@angular/core';

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
      this.openNav();
    }

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "350px";
 //   document.getElementById("main").style.marginLeft = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    this.status=false;
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  //  document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";

  }
  expand() {
    document.getElementById("mySidenav").style.width = "100%";
    //  document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    this.status=true;
  }
}
