import { Component, OnInit } from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

  public events;

  constructor(private eventService: EventServiceService) { }

  ngOnInit() {
    this.fetchAndDisplayEvents();
  }

  private fetchAndDisplayEvents() {
    this.eventService.getAllEvents().subscribe(
      data => {
        console.log(data);

        this.events = data;
      },
      err => console.error(err),
      () => console.log('events loaded')
    );

  }
}
