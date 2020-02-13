import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventInterface, EventModel} from '../model/eventModel';
import {ParticipationModel} from '../model/participationModel';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

    updateEvent(event: EventModel) {
      return this.http.put<EventInterface>(`/server/events/${event.id}`, event)
          .pipe(
              tap(data => console.log('updated event ', data))
          );
    }

  createEvent(event: EventModel) {
        return this.http.post<EventInterface>('/server/events', event)
            .pipe(
                tap(data => console.log('created event ', data))
            );
    }

  deleteEvent(id: number) {
    return this.http.delete(`/server/events/${id}`);
  }

  constructor(private http: HttpClient) {
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
            catchError(this.handleError)
        );
  }

  private createNullEvent(): EventInterface {
    console.log('Return null event');
    return {
      id: 0,
      title: null,
      creatorId: 0,
      description: null,
      creationDate: null,
      dateTime: null,
      participants: null,
      translatedDateTime: null
    };
  }


  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
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
