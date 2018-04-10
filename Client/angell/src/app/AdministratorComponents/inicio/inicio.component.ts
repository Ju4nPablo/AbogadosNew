import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']

})
export class InicioComponent implements OnInit {
  events: any[];
  headerConfig: any;
  header: any;
  constructor( ) { }

  ngOnInit() {

    this.headerConfig = {
      left: 'prevYear,prev,today,next,nextYear ',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.events = [
      {
        "title": "All Day Event",
        "start": "2018-04-01"
      },
      {
        "title": "Long Event",
        "start": "2018-04-07",
        "end": "2018-04-10"
      },
      {
        "title": "Repeating Event",
        "start": "2018-04-09T16:00:00"
      },
      {
        "title": "Repeating Event",
        "start": "2018-04-16T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2018-04-11",
        "end": "2018-04-13"
      }
    ];
  }
  }


