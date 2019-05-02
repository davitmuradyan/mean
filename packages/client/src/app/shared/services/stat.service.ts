import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(private http: HttpClient) {}

  fetch(courseId = ''): Observable<any> {
    return this.http.get<any>(`${baseUrl}/dataset?courseId=${courseId}`);
  }

  create(dataset, courseId = null): Observable<any> {
    return this.http.post(`${baseUrl}/dataset`, {dataset, courseId});
  }

  remove(id): Observable<any> {
    return this.http.delete(`${baseUrl}/dataset/${id}`);
  }

  update(id, dataset): Observable<any> {
    return this.http.put(`${baseUrl}/dataset/${id}`, {dataset: dataset});
  }
}
