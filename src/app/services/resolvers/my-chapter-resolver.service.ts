import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Chapter} from '../../model/chapterModel';
import {ChapterService} from '../chapter.service';

@Injectable({
    providedIn: 'root'
})
export class MyChapterResolverService implements Resolve<Chapter> {

    constructor(private chapterService: ChapterService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chapter> {
        return this.chapterService.getMyChapter();
    }
}
