import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  getBikes() {
    const token = localStorage.getItem('access_token');
    return this.http.get('/server/users', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  getBike(id: number) {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/users/id', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  createBikeRegistration(bike) {
    const body = JSON.stringify(bike);

    return this.http.post('/server/users/', body, httpOptions);
  }

}
