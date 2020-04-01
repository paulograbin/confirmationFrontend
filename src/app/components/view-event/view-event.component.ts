import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventModel} from '../../model/eventModel';
import {DateFormatter} from '../../services/dateFormatter';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserInterface} from '../../model/userModel';
import {EventServiceService} from '../../services/event-service.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

    event: EventModel;
    loggedUser: UserInterface;
    eventForm: FormGroup;


    errorMessage: string;
    successMessage: string;
    invalidCreationRequest = false;
    eventCreated = false;

    events: string[] = [];

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        console.log('log', `${event.value}`);
        this.event.dateTime = event.value;
        this.events.push(`${type}: ${event.value}`);
    }

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventService: EventServiceService,
                private dateFormater: DateFormatter,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            address: [''],
            published: [''],
            date: ['', Validators.required],
            time: ['', Validators.required]
        });

        this.route.data.subscribe(
            data => {
                const resolvedData = data;
                this.event = resolvedData.resolvedEvent.event;
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

    saveEvent(): void {
        console.log('save');
        this.invalidCreationRequest = false;
        this.eventCreated = false;

        if (this.isValid()) {
            if (this.event.id === 0) {
                console.log('cerate');

                const eventToCreate = {
                    title: this.event.title,
                    description: this.event.description,
                    address: this.event.address,
                    dateTime: this.event.dateTime,
                };
                console.log('event to create', eventToCreate);

                this.eventService.createEvent(eventToCreate).subscribe(
                    data => {
                        console.log('CRIOU', data);
                        this.successMessage = 'Evento criado!';
                        this.eventCreated = true;
                    },
                    error => {
                        console.log('Create event errored!');
                        console.log('err', error);

                        this.invalidCreationRequest = true;
                        this.errorMessage = error;
                    },
                    () => {}
                );
            } else {
                this.event.dateTime = null;
                this.event.creationDate = null;
                console.log('update', this.event);
                this.eventService.updateEvent(this.event).subscribe();
            }
        } else {
            console.error('Validation failed');
        }

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

}
