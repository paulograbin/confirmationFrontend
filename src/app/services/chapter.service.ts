import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Chapter} from '../model/chapterModel';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChapterService {

    constructor(private http: HttpClient) {
    }

    backendUrl = environment.localApiAddress;
    chapterServiceUrl = this.backendUrl + '/chapter';

    fetchAllChapters(): Observable<Chapter[]> {
        // console.log('get all chapters from server');
        return this.http.get<Chapter[]>(`${this.chapterServiceUrl}`);
    }

    getChapter(id: number): Observable<Chapter> {
        return this.http.get<Chapter>(`${this.chapterServiceUrl}/${id}`);
    }

    updateChapter(chapterToUpdate) {
        return this.http.put<Chapter>(`${this.chapterServiceUrl}/${chapterToUpdate.id}`, chapterToUpdate)
            .pipe(
                tap(data => console.log('Chapter updated in the backend ', data))
            );
    }

    deleteChapter(chapterId: number) {
        return this.http.delete<Chapter>(`${this.chapterServiceUrl}/${chapterId}`)
            .pipe(
                tap(data => console.log('Chapter deleted in the backend'))
            );
    }

}
