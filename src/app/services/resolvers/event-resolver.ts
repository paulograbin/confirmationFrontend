import {Injectable} from '@angular/core';
import {EventServiceService} from '../event-service.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ViewEventResponse} from '../../model/viewEventResponse';

@Injectable({
    providedIn: 'root'
})
export class EventResolver implements Resolve<ViewEventResponse> {

    constructor(private eventService: EventServiceService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ViewEventResponse> {
        const eventId = route.paramMap.get('id');
        // console.log(`Resolving event ${eventId}`);

        return this.eventService.getEvent2(Number(eventId));
        // .pipe(
        //     // tap(x => console.log(x)),
        //     map(event => ({ event })),
        //     catchError(error => {
        //         console.error(`Resolving event failed`, error.error);
        //         return of({event: null, error: error.error});
        //     })
        // );
    }
}
