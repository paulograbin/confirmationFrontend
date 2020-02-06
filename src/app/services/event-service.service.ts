import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventModel} from '../model/eventModel';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) {
  }

  getAllEvents() {
    return this.http.get<EventModel[]>('/server/events');
  }

  getEvent(id: number) {
    return this.http.get<EventModel>('/server/events/' + id);
  }

  getUserInvitations(id: number) {
    return this.http.get<EventModel[]>(`/server/events/invitations/${id}`);
  }

  confirmPresence(eventId: number, userId: number) {
    return this.http.post(`/server/event/${eventId}/confirm/${userId}`, null);
  }

  declinePresence(eventId: number, userId: number) {
    return this.http.post(`/server/event/${eventId}/decline/${userId}`, null);
  }

}
