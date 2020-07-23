import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventInterface, EventModel} from '../model/eventModel';
import {ParticipationModel} from '../model/participationModel';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventServiceService {

    constructor(private http: HttpClient) {
    }

    backendUrl = environment.localApiAddress;
    eventServiceUrl = this.backendUrl + '/events';

    updateEvent(event) {
        return this.http.put<EventInterface>(`${this.eventServiceUrl}/${event.id}`, event)
            .pipe(
                tap(data => console.log('Event Service: Event updated in the Backend ', data))
            );
    }

    createEvent(event): Observable<EventInterface> {
        return this.http.post<EventInterface>(`${this.eventServiceUrl}`, event)
            .pipe(
                tap(data => console.log('Event Service: Event created in the Backend ', data)),
                catchError(this.handleError)
            );
    }

    deleteEvent(id: number) {
        return this.http.delete(`${this.eventServiceUrl}/${id}`);
    }

    getAllEvents(): Observable<EventInterface[]> {
        return this.http.get<EventInterface[]>(`${this.eventServiceUrl}`);
    }

    getEvent(id: number): Observable<EventInterface> {
        if (id === 0) {
            return of(this.createNullEvent());
        }

        return this.http.get<EventInterface>(`${this.eventServiceUrl}/${id}`)
            .pipe(
                // tap(data => console.log('getEvent: ' + JSON.stringify(data))),
                // tap(data => console.log('getEvent: ' + data)),
                // catchError(this.handleError)
            );
    }

    private createNullEvent(): EventInterface {
        console.log('Return null event');
        return {
            id: 0,
            title: null,
            address: null,
            chapter: null,
            creatorId: 0,
            published: false,
            description: null,
            creationDate: null,
            date: null,
            time: null,
            participants: null,
        };
    }


    private handleError(err) {
        console.log('HANDLER ERROR!!!', err);

        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;

        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.message}`;
        } else {
            errorMessage = `Erro ${err.status}: ${err.error.message}`;
            console.log('else', errorMessage);
        }

        console.error('error', errorMessage);
        return throwError(errorMessage);
    }

    getUserInvitations(id: number) {
        return this.http.get<ParticipationModel[]>(`${this.eventServiceUrl}/invitations/${id}`);
    }

    confirmPresence(eventId: number, userId: number) {
        return this.http.post(`${this.eventServiceUrl}/${eventId}/confirm/${userId}`, null);
    }

    declinePresence(eventId: number, userId: number) {
        return this.http.post(`${this.eventServiceUrl}/${eventId}/decline/${userId}`, null);
    }

    getEventsCreatedByUser(userId: number): Observable<EventInterface[]> {
        return this.http.get<EventModel[]>(`${this.eventServiceUrl}/createdBy/${userId}`);
    }
}
