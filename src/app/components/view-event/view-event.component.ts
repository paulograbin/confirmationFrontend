import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventModel} from '../../model/eventModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../model/userModel';
import {EventServiceService} from '../../services/event-service.service';
import {ViewEventResponse} from '../../model/viewEventResponse';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

    response: ViewEventResponse;

    event: EventModel;
    loggedUser: UserInterface;
    eventForm: FormGroup;

    errorMessage = '';
    successMessage = '';
    invalidCreationRequest = false;
    eventCreated = false;
    lockButtons = false;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventService: EventServiceService,
                private formBuilder: FormBuilder,
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
        this.eventForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
            address: ['', Validators.required],
            published: ['', Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required]
        });

        this.route.data.subscribe(
            data => {
                const resolvedData = data;

                this.loggedUser = resolvedData.loggedUser;
                this.response = resolvedData.response;

                if (this.response.successful) {
                    console.log('user can see event');

                    this.event = this.response.eventDetails;
                    // console.log('event', this.event);
                    this.displayEvent(this.event);
                } else {
                    console.log('user can NOT see event');
                    // this.displayEvent(this.event);
                    this.openSnackBar(this.response.errorMessage);
                }
            },
            err => console.error(err),
            () => {
                console.log(`event ${this.event.id} loaded completely`);
            }
        );
    }

    displayEvent(event: EventModel) {
        this.eventForm.patchValue({
            title: this.event.title,
            description: this.event.description,
            address: this.event.address,
            date: this.event.date,
            time: this.event.time,
            published: this.event.published,
        });
    }

    saveEvent(): void {
        this.successMessage = '';
        this.errorMessage = '';

        if (this.eventForm.valid) {
            if (this.eventForm.dirty) {
                this.lockButtons = true;

                if (this.response.creating) {
                    this.requestEventCreationToBackend();
                } else {
                    this.requestEventUpdateToBackend();
                }
            } else {
                console.log('Nothing changed, just return');
                this.onSaveComplete();
            }
        } else {
            this.errorMessage = 'Verifique os dados informados';
        }
    }

    private requestEventUpdateToBackend() {
        console.log('Updating event');

        const eventToUpdate = {
            id: this.event.id,
            title: this.eventForm.get('title').value,
            description: this.eventForm.get('description').value,
            address: this.eventForm.get('address').value,
            date: this.eventForm.get('date').value.split('-').join('/'),
            time: this.eventForm.get('time').value,
            published: this.eventForm.get('published').value
        };

        console.log('update', eventToUpdate);
        this.eventService.updateEvent(eventToUpdate).subscribe(
            data => {
                this.event = data;
                console.log('event updated ', this.event);
                this.onSaveComplete();
            }, error => {
                console.log('Update event errored!');
                console.log('err', error);
            }, () => {
                // console.log('completed!!');
                this.lockButtons = false;
            }
        );
    }

    private requestEventCreationToBackend() {
        const eventToCreate = {
            title: this.eventForm.get('title').value,
            description: this.eventForm.get('description').value,
            address: this.eventForm.get('address').value,
            date: this.eventForm.get('date').value.split('-').join('/'),
            time: this.eventForm.get('time').value,
            published: this.eventForm.get('published').value
        };

        this.eventService.createEvent(eventToCreate)
            .subscribe(
                data => {
                    this.successMessage = 'Evento criado! Clique para vê-lo';
                    this.event = data;
                    this.eventCreated = true;
                    this.onSaveComplete();
                },
                error => {
                    console.log('err', error);

                    this.invalidCreationRequest = true;
                    this.errorMessage = error;
                    this.lockButtons = false;
                },
                () => {
                    this.lockButtons = false;
                }
            );
    }

    isValid(path?: string): boolean {
        return this.lockButtons;
    }

    deleteEvent(): void {
        if (this.event.id === 0) {
            // Don't delete it, it was never even saved
        } else {
            this.eventService.deleteEvent(this.event.id).subscribe(
                data => this.router.navigate(['createdEvents'])
            );
        }
    }

    private onSaveComplete() {
        // console.log('On Save Complete');
        this.eventForm.reset();
        this.router.navigate(['/']);
    }
}
