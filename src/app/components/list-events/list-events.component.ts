import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {UserService} from '../../services/user.service';
import {ParticipationModel} from '../../model/participationModel';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '../../model/userModel';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

    participations: ParticipationModel[];
    loggedUser: UserInterface;

    confirmationMessage = '';
    confirmed = false;

    constructor(private eventService: EventServiceService,
                private userService: UserService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                console.log(data);

                this.participations = data.participations;
                this.loggedUser = data.loggedUser;
            },
            err => console.error(err)
        );

        this.fetchEvents();
    }

    private fetchEvents() {
        // console.log('fetch events', this.loggedUser);

        console.log('Not MC');
        this.fetchUserInvitations(this.loggedUser.id);
    }

    private fetchUserInvitations(id) {
        this.eventService.getUserInvitations(id).subscribe(
            data => {
                this.participations = data;
                console.log(this.participations);
            },
            err => console.error(err),
            () => console.log('events loaded')
        );
    }

    confirmPresenceInEvent(eventId: number) {
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

    declinePresenceInEvent(eventId: number) {
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
