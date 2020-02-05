import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {EventModel} from '../../model/eventModel';
import {UserModel} from '../../model/userModel';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

    events: EventModel[];
    loggedUser: UserModel;

    constructor(private eventService: EventServiceService,
                private userService: UserService) {
    }

    dayName = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    monName = ['janeiro', 'fevereiro', 'março', 'abril', 'Maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];


    ngOnInit() {
        // console.log(this.dayName[date.getDay()] + ', dia ' + date.getDate() + ' de ' + this.monName[date.getMonth()]);
        this.userService.fetchDetailsAboutLoggedUser().subscribe(
            data => {
                console.log('logged user', data);
                this.loggedUser = data;
            },
            error => console.error(error),
            () => this.fetchUserInvitations(this.loggedUser.id)
        );


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

    private fetchUserInvitations(id) {
        this.eventService.getUserInvitations(id).subscribe(
            data => {
                console.log(data);

                this.events = data;
            },
            err => console.error(err),
            () => console.log('events loaded')
        );
    }

    private confirmPresenceInEvent() {
        this.eventService.confirmPresence(7, 1).subscribe();

        this.ngOnInit();
    }
}
