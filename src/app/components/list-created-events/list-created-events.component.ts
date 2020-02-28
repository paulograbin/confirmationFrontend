import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {UserService} from '../../services/user.service';
import {UserInterface, UserModel} from '../../model/userModel';
import {EventModel} from '../../model/eventModel';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-list-created-events',
    templateUrl: './list-created-events.component.html',
    styleUrls: ['./list-created-events.component.css']
})
export class ListCreatedEventsComponent implements OnInit {

    loggedUser: UserInterface;
    events: EventModel[];

    constructor(private userService: UserService,
                private eventService: EventServiceService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                const paramName = 'loggedUser';
                const resolvedData = data[paramName];

                this.loggedUser = resolvedData;
            },
            err => console.error(err)
        );

        console.log(this.loggedUser);

        this.fetchEventsCreatedByUser(Number(this.loggedUser.id));
    }

    private fetchEventsCreatedByUser(id: number) {
        this.eventService.getEventsCreatedByUser(id).subscribe(
            data => {
                this.events = data;
                console.log(this.events);
            },
            err => console.error(err),
            () => {

            }
        );
    }
}
