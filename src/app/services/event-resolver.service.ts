import {Injectable} from '@angular/core';
import {EventServiceService} from './event-service.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EventResolved} from '../model/eventModel';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventResolverService implements Resolve<EventResolved> {

    constructor(private eventService: EventServiceService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<EventResolved> {
        const eventId = route.paramMap.get('id');
        console.log(`Resolving event ${eventId}`);

        return this.eventService.getEvent(Number(eventId))
            .pipe(
                map(event => ({eventModel: event})),
                catchError(error => {
                    return of({eventModel: null, error: 'carai'});
                })
            );
    }
}
