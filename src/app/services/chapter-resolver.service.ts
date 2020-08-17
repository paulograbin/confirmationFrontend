import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Chapter} from '../model/chapterModel';
import {ChapterService} from './chapter.service';

@Injectable({
    providedIn: 'root'
})
export class ChapterResolverService implements Resolve<Chapter> {

    constructor(private chapterService: ChapterService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Chapter> {
        const chapterId = route.paramMap.get('id');
        console.log(`Resolving chapter ${chapterId}`);

        return this.chapterService.getChapter(Number(chapterId));
        // .pipe(
        //     // tap(x => console.log(x)),
        //     map(event => ({ event })),
        //     catchError(error => {
        //       console.error(`Resolving event failed`, error.error);
        //       return of({event: null, error: error.error});
        //     })
        // );
    }
}
