import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {UserModel} from '../../model/userModel';
import {UserService} from '../../services/user.service';
import {DateFormatter} from '../../services/dateFormatter';
import {ParticipationModel} from '../../model/participationModel';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

    participations: ParticipationModel[];
    loggedUser: UserModel;

    confirmationMessage = '';
    confirmed = false;

    constructor(private eventService: EventServiceService,
                private userService: UserService,
                private route: ActivatedRoute,
                private dateFormatter: DateFormatter) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                this.loggedUser = data.loggedUser;
            },
            err => console.error(err)
        );

        this.fetchEvents();
}

    private fetchEvents() {
        // console.log('fetch events', this.loggedUser);

        if (this.loggedUser.master) {
            console.log('MC');
            this.fetchEventsCreatedByUser(this.loggedUser.id);
        } else {
            console.log('Not MC');
            this.fetchUserInvitations(this.loggedUser.id);
        }
    }

    private fetchEventsCreatedByUser(id) {
        // this.eventService.getEventsCreatedByUser(id).subscribe(
        //     data => {
        //         this.participations = data;
        //     }
        // );
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
