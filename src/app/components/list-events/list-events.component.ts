import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../services/event-service.service';
import {UserService} from '../../services/user.service';
import {ParticipationModel} from '../../model/participationModel';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '../../model/userModel';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

    participations: ParticipationModel[];
    loggedUser: UserInterface;

    loading = true;

    confirmationMessage = '';
    confirmed = false;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private eventService: EventServiceService,
                private userService: UserService,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar) {
    }

    openSnackBar(mensagem: string) {
        this.snackBar.open(mensagem, 'Fechar', {
            duration: 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                this.loggedUser = data.loggedUser;
                this.fetchUserInvitations();
            },
            err => console.error(err)
        );
    }

    private fetchUserInvitations() {
        this.eventService.getInvitationsForCurrentUser()
            .subscribe(
                data => {
                    this.participations = data;
                    this.loading = false;
                },
                err => console.error(err),
                () => console.log(`${this.participations.length} events loaded`)
            );
    }

    confirmPresenceInEvent(indice: number, eventId: number) {
        this.eventService.confirmPresence(eventId)
            .subscribe(
                data => {
                    this.openSnackBar(`Presença confirmada com sucesso`);
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
                }
            );

        this.participations[indice].status = 'CONFIRMADO';
    }

    declinePresenceInEvent(indice: number, eventId: number) {
        this.eventService.declinePresence(eventId)
            .subscribe(
                data => {
                    this.openSnackBar(`Presença declinada com sucesso`);
                    this.confirmationMessage = `Presença declinada com sucesso`;
                    this.confirmed = true;
                },
                error => {
                    this.confirmationMessage = `Ocorreu algum problema ao recusar sua presença`;
                    this.confirmed = true;
                },
                () => {
                    setTimeout(function() {
                        this.confirmed = false;
                    }.bind(this), 1500);

                    console.log('refetch');
                    this.fetchUserInvitations();
                }
            );

        this.participations[indice].status = 'RECUSADO';
    }
}
