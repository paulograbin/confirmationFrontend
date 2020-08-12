import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../model/userModel';
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

    loading = true;

    constructor(private userService: UserService,
                private eventService: EventServiceService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                this.loggedUser = data.loggedUser;
            },
            err => console.error(err)
        );

        console.log(`Fetching events from chapter ${this.loggedUser.chapter.id}`);
        this.fetchEventsFromChapter();
    }

    fetchEventsFromChapter() {
        this.eventService.getUpcomingEventsFromChapter()
            .subscribe(
                data => {
                    this.events = data;
                    this.loading = false;
                },
                err => console.error(err),
                () => {
                    console.log(`${this.events.length} events loadded`);
                }
            );
    }

}
