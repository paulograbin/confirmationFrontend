import {Injectable} from '@angular/core';
import {EventServiceService} from './event-service.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EventResolved} from '../model/eventModel';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventResolverService implements Resolve<EventResolved> {

    constructor(private eventService: EventServiceService) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<EventResolved> {
        const eventId = route.paramMap.get('id');
        // console.log(`Resolving event ${eventId}`);

        return this.eventService.getEvent(Number(eventId))
            .pipe(
                // tap(x => console.log(x)),
                map(event => ({ event })),
                catchError(error => {
                    console.error(`Resolving event failed`, error.error);
                    return of({event: null, error: error.error});
                })
            );
    }
}
