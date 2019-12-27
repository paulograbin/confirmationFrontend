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
    return this.http.get('/server/events');
  }

  getEvent(id: number) {
    return this.http.get<EventModel>('/server/events/' + id);
  }

}
