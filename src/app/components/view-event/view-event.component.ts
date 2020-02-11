import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventModel} from '../../model/eventModel';
import {DateFormatter} from '../../services/dateFormatter';
import {NgForm} from '@angular/forms';
import {UserInterface} from '../../model/userModel';
import {EventServiceService} from '../../services/event-service.service';

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

    event: EventModel;
    loggedUser: UserInterface;
    eventForm: NgForm;

    constructor(private route: ActivatedRoute,
                private eventService: EventServiceService,
                private dateFormater: DateFormatter) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                this.event = data.event.eventModel;
                console.log(this.event);
                this.loggedUser = data.loggedUser;

                if (this.event.id === 0) {
                    console.log('Opa, vamos criar um novo evento');
                }

                if (this.event.creatorId === this.loggedUser.id) {
                    console.log("MC vendo seu evento");
                } else {
                    console.log("É só um qualquer");
                }

            },
            err => console.error(err),
            () => {
                console.log(`event ${this.event.id} loaded completely`);
            }
        );
    }

    deleteEvent(): void {
        if (this.event.id === 0) {
            // Don't delete it, it was never even saved
        } else {
            this.eventService.deleteEvent(this.event.id).subscribe();
        }
    }
}
