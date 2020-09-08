import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventModel} from '../../model/eventModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    eventForm: FormGroup;

    // TODO impedir usuario de navegar pelos eventos pela URL

    errorMessage = '';
    successMessage = '';
    invalidCreationRequest = false;
    eventCreated = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventService: EventServiceService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            address: ['', Validators.required],
            published: ['', Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required]
        });

        this.route.data.subscribe(
            data => {
                const resolvedData = data;

                const error = resolvedData.resolvedEvent.error;

                this.event = resolvedData.resolvedEvent.event;
                this.displayEvent(resolvedData.resolvedEvent.event);
                // this.errorMessage = resolvedData.resolvedEvent.error;

                this.loggedUser = resolvedData.loggedUser;

                // if (this.event.creatorId === this.loggedUser.id) {
                //     console.log('MC vendo seu evento');
                // } else {
                //     console.log('É só um qualquer');
                // }
            },
            err => console.error(err),
            () => {
                console.log(`event ${this.event.id} loaded completely`);
            }
        );
    }

    displayEvent(event: EventModel) {
        console.log('Displaying', event);

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

                if (this.event.id === 0) {
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
            }
        );
    }

    private requestEventCreationToBackend() {
        console.log('cerate');

        const eventToCreate = {
            title: this.eventForm.get('title').value,
            description: this.eventForm.get('description').value,
            address: this.eventForm.get('address').value,
            date: this.eventForm.get('date').value.split('-').join('/'),
            time: this.eventForm.get('time').value,
            published: this.eventForm.get('published').value
        };
        console.log('event to create', eventToCreate);

        this.eventService.createEvent(eventToCreate).subscribe(
            data => {
                console.log('Event creation returned successful', data);
                this.successMessage = 'Evento criado! Clique para vê-lo';
                this.event = data;
                this.eventCreated = true;
                this.onSaveComplete();
            },
            error => {
                console.log('Create event errored!');
                console.log('err', error);

                this.invalidCreationRequest = true;
                this.errorMessage = error;
            },
            () => {
            }
        );
    }

    isValid(path?: string): boolean {
        // console.log(path);
        // console.log(true);
        return true;
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
        console.log('On Save Complete');
        this.eventForm.reset();
        this.router.navigate(['/']);
    }
}
