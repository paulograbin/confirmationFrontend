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

    private confirmPresenceInEvent(eventId: number) {
        this.eventService.confirmPresence(eventId, Number(this.loggedUser.id))
            .subscribe(
                data => {
                    this.confirmationMessage = `Presença confirmada com sucesso`;
                    this.confirmed = true;
                },
                error => {
                    this.confirmationMessage = `Ocorreu algum problema ao registrar sua presença`;
                    this.confirmed = true;
                },
                () => {
                    setTimeout(function() {
                        this.confirmed = false;
                    }.bind(this), 3000);

                    this.participations = null;
                    this.fetchEvents();
                }
            );

    }

    private declinePresenceInEvent(eventId: number) {
        this.eventService.declinePresence(eventId, Number(this.loggedUser.id))
            .subscribe(
                data => {
                    this.confirmationMessage = `Presença declinada com sucesso`;
                    this.confirmed = true;
                },
                error => {
                    this.confirmationMessage = `Ocorreu algum problema ao rejeitar sua presença`;
                    this.confirmed = true;
                },
                () => {
                    setTimeout(function() {
                        this.confirmed = false;
                    }.bind(this), 1500);

                    this.participations = null;
                    this.fetchEvents();
                }
            );

    }
}
