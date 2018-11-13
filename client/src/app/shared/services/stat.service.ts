import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/dataset`);
  }

  create(dataset): Observable<any> {
    return this.http.post(`http://localhost:3000/dataset`, {dataset});
  }

  remove(id): Observable<any> {
    return this.http.delete(`http://localhost:3000/dataset/${id}`);
  }

  update(id, dataset): Observable<any> {
    return this.http.put(`http://localhost:3000/dataset/${id}`, {dataset: dataset});
  }
}
