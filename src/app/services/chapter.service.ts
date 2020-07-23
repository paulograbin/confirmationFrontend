import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Chapter} from '../model/chapterModel';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) {
  }

  backendUrl = environment.localApiAddress;
  chapterServiceUrl = this.backendUrl + '/chapter';

  fetchAllChapters(): Observable<Chapter[]> {
    console.log('get all chapters from server');
    return this.http.get<Chapter[]>(`${this.chapterServiceUrl}`);
  }
}
