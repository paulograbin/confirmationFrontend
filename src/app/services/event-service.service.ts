import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventInterface, EventModel} from '../model/eventModel';
import {ParticipationModel} from '../model/participationModel';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {error, log} from 'util';

@Injectable({
    providedIn: 'root'
})
export class EventServiceService {

    constructor(private http: HttpClient) {
    }

    updateEvent(event) {
        return this.http.put<EventInterface>(`/server/events/${event.id}`, event)
            .pipe(
                tap(data => console.log('Event Service: Event updated in the Backend ', data))
            );
    }

    createEvent(event) {
        return this.http.post<EventInterface>('/server/events', event)
            .pipe(
                tap(data => console.log('Event Service: Event created in the Backend ', data)),
                catchError(this.handleError)
            );
    }

    deleteEvent(id: number) {
        return this.http.delete(`/server/events/${id}`);
    }

    getAllEvents(): Observable<EventModel[]> {
        return this.http.get<EventModel[]>('/server/events');
    }

    getEvent(id: number): Observable<EventInterface> {
        if (id === 0) {
            return of(this.createNullEvent());
        }

        return this.http.get<EventInterface>('/server/events/' + id)
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
        return this.http.get<ParticipationModel[]>(`/server/events/invitations/${id}`);
    }

    confirmPresence(eventId: number, userId: number) {
        return this.http.post(`/server/event/${eventId}/confirm/${userId}`, null);
    }

    declinePresence(eventId: number, userId: number) {
        return this.http.post(`/server/event/${eventId}/decline/${userId}`, null);
    }

    getEventsCreatedByUser(userId: number) {
        return this.http.get<EventModel[]>(`/server/events/createdBy/${userId}`);
    }
}
