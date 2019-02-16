import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl } from '../constants/index';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<any> {
    return this.http.get<any>(`${serverUrl}/dataset`);
  }

  create(dataset): Observable<any> {
    return this.http.post(`${serverUrl}/dataset`, {dataset});
  }

  remove(id): Observable<any> {
    return this.http.delete(`${serverUrl}/dataset/${id}`);
  }

  update(id, dataset): Observable<any> {
    return this.http.put(`${serverUrl}/dataset/${id}`, {dataset: dataset});
  }
}
