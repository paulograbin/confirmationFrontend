import { Component, OnInit } from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {ActivatedRoute} from '@angular/router';
import {EventModel} from '../../model/eventModel';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

    event: EventModel;

  constructor(private route: ActivatedRoute,
              private eventService: EventServiceService) { }

  ngOnInit() {
    this.getEventDetails(this.route.snapshot.params.id);
  }

  getEventDetails(id: number) {
    this.eventService.getEvent(id).subscribe(
      data => {
        console.log(data);
        this.eventa = data;
      },
      err => console.error(err),
      () => console.log(`user ${id} laded`)
    );
  }

}
